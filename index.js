const express = require("express");
const PORT = process.env.PORT || 5050;
const app = express();

app.get("/", (req, res) => {
  res.send("Model Uganda Website Will be uploaded here soon");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}....`);
});
