import express from "express";
import usersRouter from "./users/users.js";

const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log("Время запроса: ", new Date().toLocaleString());
  next();
});

app.all(/.*/, (req, res, next) => {
  console.log("ALL REGEXP");
  next();
});

app.get("/hi", (req, res) => {
  throw new Error("Ошибка в запросе");
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.log("Ошибка в запросе: ", { err });
  res.status(500).send(`${err}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
