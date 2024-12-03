#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <ESP8266WiFi.h>
#include <EEPROM.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>

#define gpsRxPin D1
#define gpsTxPin D2
SoftwareSerial neo6m(gpsTxPin, gpsRxPin);

TinyGPSPlus gps;
//MH18BC4490-105116115

const char *ssid = "vivek45";
const char *password = "123456789";

const char *serverUrl = "http://  172.20.10.11:3000//api/trackVehicle/";
//const char *serverUrl = "https://bvrxmbwq-5000.inc1.devtunnels.ms/api/trackVehicle/";
String carNumber = "";

unsigned long lastSendTime = 0;
ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  neo6m.begin(9600);
  EEPROM.begin(512);

  carNumber = readCarNumber();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, handleRoot);
  server.on("/setCarNumber", HTTP_POST, handleSetCarNumber);
  server.begin();
}

void loop() {
  server.handleClient();
  smartdelay_gps(1000);
  if (millis() - lastSendTime >= 3000) {
    if (gps.location.isValid()) {
      String latitude = String(gps.location.lat(), 6);
      String longitude = String(gps.location.lng(), 6);
      sendGpsDataToBackend(latitude, longitude);
    }
    lastSendTime = millis();
  }
}

void handleRoot() {
  String html = "<!DOCTYPE html><html><head><title>Set Car Number</title>";
  html += "<style>body { font-family: Arial; margin: 0; padding: 20px; } h1 { color: #333; } form { margin-top: 20px; } input[type='text'] { padding: 8px; width: 300px; } input[type='submit'] { padding: 8px 16px; background: #4CAF50; color: white; border: none; cursor: pointer; }</style></head><body>";
  html += "<h1>Enter Car Number</h1>";
  html += "<form action='/setCarNumber' method='POST'>";
  html += "Car Number: <input type='text' name='carNumber' required><br><br>";
  html += "<input type='submit' value='Submit'>";
  html += "</form>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleSetCarNumber() {
  Serial.println(server.arg("carNumber"));
  if (server.hasArg("carNumber")) {
    carNumber = server.arg("carNumber");
    storeCarNumber(carNumber);
    server.send(200, "text/html", "Car number saved successfully!<br><a href='/'>Go back</a>");
  } else {
    server.send(400, "text/html", "No car number provided<br><a href='/'>Go back</a>");
  }
}

void storeCarNumber(String carNumber) {
  for (int i = 0; i < carNumber.length(); i++) {
    EEPROM.write(i, carNumber[i]);
  }
  EEPROM.write(carNumber.length(), '\0');
  EEPROM.commit();
}

String readCarNumber() {
  String carNumber = "";
  for (int i = 0; i < 32; i++) {
    char c = EEPROM.read(i);
    if (c == '\0') break;
    carNumber += c;
  }
  return carNumber;
}

void sendGpsDataToBackend(String latitude, String longitude) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    String url = String(serverUrl) + carNumber;
    http.begin(client, url);
    String payload = "{\"lat\":\"" + latitude + "\",\"lng\":\"" + longitude + "\"}";
    Serial.println(url);
    Serial.println(payload);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(payload);

    if (httpCode > 0) {
      Serial.print("POST request sent. Response code: ");
      String response = http.getString();
      Serial.println("Server Response: " + response);
    } else {
      Serial.print("Error sending POST request: ");
      Serial.println(http.errorToString(httpCode).c_str());
      Serial.println(httpCode); 
    }
    http.end();
  }
}

static void smartdelay_gps(unsigned long ms) {
  unsigned long start = millis();
  do {
    while (neo6m.available()) {
      gps.encode(neo6m.read());
    }
  } while (millis() - start < ms);
}
