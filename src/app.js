const express = require("express");

const app = express();
const port = 3000;

// start the application by listening on a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
