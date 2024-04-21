const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// fetch restaurants data from api with a postcode
app.get("/", async (req, res) => {
  const postCode = req.query.postcode;

  const api = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postCode}`;

  try {
    const response = await axios.get(api);
    console.log(response);
  } catch (error) {
    console.log("Error", error);
  }
});

// start the application by listening on a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
