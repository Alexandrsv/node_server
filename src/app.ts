import express, { Express } from "express";
import { userRouter } from "./users/users";
import { Server } from "http";

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    console.log("app");
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    console.log("app init");
    this.useRoutes();
    this.server = this.app.listen(this.port, () => {
      console.log(`server started on port ${this.port}`);
    });
  }
}
