import express from "express";
import usersRouter from "./users/users.js";

const port = 8000;
const app = express();

app.all(/.*/, (req, res, next) => {
  console.log("ALL HERE");
  next();
});

app.get("/hi", (req, res) => {
  res.end();
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
