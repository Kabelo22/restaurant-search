const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// get name of cuisine only from array of cuisines
function getCuisines(cuisines) {
  const cuisineNames = cuisines.map((cuisine) => {
    return cuisine.name;
  });

  return cuisineNames;
}

// construct address string
function getAddress(address) {
  return `${address.firstLine}, ${address.city}, ${address.postalCode}`;
}

// fetch restaurants data from api with a postcode
app.get("/", async (req, res) => {
  const postCode = req.query.postcode;

  const api = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postCode}`;

  try {
    const response = await axios.get(api);
    const restaurantsResults = response.data.restaurants;

    // get the first 10 restaurants by using slice method
    const slicedRestaurants = restaurantsResults.slice(0, 10);

    // loop through slicedRestaurants and only get
    // required restaurants data points
    const restaurants = slicedRestaurants.map((restaurant) => {
      return {
        name: restaurant.name,
        cuisines: getCuisines(restaurant.cuisines),
        rating: restaurant.rating.starRating,
        address: getAddress(restaurant.address),
      };
    });

    //return the restuarants to the ejs view
    res.render("index", { restaurants });
  } catch (error) {
    console.log("Error:", error.message);
    res.render("index", { restaurants: [] });
  }
});

// start the application by listening on a port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
