import express, { Express } from "express";
import { Server } from "http";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import "reflect-metadata";
import { IUserController } from "./users/users.controller.interface";
import { IConfigService } from "./config/config.service.interface";
import { IExceptionFilter } from "./errors/exception.filter.interface";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: IUserController,
    @inject(TYPES.ExceptionFilter)
    private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) configService: IConfigService,
  ) {
    console.log("app");
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  useRoutes(): void {
    this.app.use("/users", this.userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    console.log("app init");
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`server started on port ${this.port}`);
    });
  }
}
