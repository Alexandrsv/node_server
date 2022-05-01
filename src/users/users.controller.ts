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
import { UsersService } from "./users.service";
import { ValidateMiddleware } from "../common/validate.middleware";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UsersService) private usersService: UsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      { path: "/login", method: "post", func: this.login, middlewares: [] },
    ]);
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.validateUser(req.body);
    if (!result) {
      return next(new HttpError(400, "Authentication failed"));
    }
    this.ok(res, {});
  }

  async register(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(req.body);
    if (!result) {
      next(new HttpError(422, "пользователь с таким именем уже существует", "register"));
    } else {
      this.ok(res, { email: result?.email, id: result?.id });
    }
  }
}
