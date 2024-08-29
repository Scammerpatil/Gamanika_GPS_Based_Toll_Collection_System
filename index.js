const axios = require("axios");

const options = {
  method: "POST",
  url: "https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo",
  headers: {
    "x-rapidapi-key": "f082f13198msh414f8028ce9f6e1p13c9b1jsn31ebe896d5a5",
    "x-rapidapi-host":
      "rto-vehicle-information-verification-india.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  data: {
    reg_no: "MH18BC4490",
    consent: "Y",
    consent_text:
      "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
  },
};

const response = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

response();
