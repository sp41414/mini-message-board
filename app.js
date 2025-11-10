const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Successfully ran server on port ${PORT}`);
});
