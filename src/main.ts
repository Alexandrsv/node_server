import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import "reflect-metadata";
import { IUserController } from "./users/users.controller.interface";
import { UsersService } from "./users/users.service";
import { IUsersService } from "./users/users.service.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
  bind<IUsersService>(TYPES.UsersService).to(UsersService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
});

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
