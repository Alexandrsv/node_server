import express from "express";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Да что ты?");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
