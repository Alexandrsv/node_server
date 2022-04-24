import express, { Express } from "express";
import { userRouter } from "./users/users";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    console.log("app");
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    console.log("app init");
    this.useRoutes();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`server started on port ${this.port}`);
    });
  }
}
