import { Response, Router } from "express";
import { ExpressReturnType, IControllerRoute } from "./route.interface";
import { ILogger } from "../logger/logger.interface";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../types";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  public send<T>(res: Response, code: number, data: T): ExpressReturnType {
    return res.status(code).json(data);
  }

  public ok<T>(res: Response, data: T): ExpressReturnType {
    return this.send<T>(res, 200, data);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`Binding route ${route.method.toUpperCase()} ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
