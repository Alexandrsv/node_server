import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    next(new HttpError(401, "ошибка авторизации", "login"));
  }

  register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    this.ok(res, { message: "пользователь создан" });
  }
}
