import { LoggerService } from "../logger/logger.service";
import { Response, Router } from "express";
import { IControllerRoute } from "./route.interface";

export abstract class BaseController {
  private readonly _router: Router;

  protected constructor(private logger: LoggerService) {
    this.logger = logger;
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  public send<T>(res: Response, code: number, data: T): Response {
    return res.status(code).json(data);
  }

  public ok<T>(res: Response, data: T): Response {
    return this.send<T>(res, 200, data);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(
        `Binding route ${route.method.toUpperCase()} ${route.path}`
      );
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
