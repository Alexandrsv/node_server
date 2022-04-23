import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./users/users.js";

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

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Ошибка в запросе: ", { err });
  res.status(500).send(`${err.message}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
