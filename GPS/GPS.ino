#include <SoftwareSerial.h>

// Define GPS pins
#define RXD2 D1  // GPIO5 for RX
#define TXD2 D2  // GPIO4 for TX

#define GPS_BAUD 9600

// Create a SoftwareSerial object for GPS
SoftwareSerial gpsSerial(RXD2, TXD2);

void setup() {
  Serial.begin(9600);       // For debug output
  gpsSerial.begin(GPS_BAUD);  // Start GPS communication
  
  Serial.println("GPS Serial started at 9600 baud rate");
  Serial.println("Ensure the GPS module is placed in an open area for proper signal reception.");
}

void loop() {
  // Check if data is available from the GPS module
  while (gpsSerial.available() > 0) {
    char gpsData = gpsSerial.read(); // Read data from GPS
    Serial.print(gpsData);          // Print the raw GPS data to Serial Monitor
  }
  delay(1000);
  Serial.println("-------------------------------");
}
