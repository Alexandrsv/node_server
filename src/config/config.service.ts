import { IConfigService } from "./config.service.interface";
import dotenv, { DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = dotenv.config({});
    if (result.error) {
      logger.error("[ConfigService] Не удалось загрузить конфигурацию из .env");
    } else {
      this.logger.log("[ConfigService] Конфигурация .env загружена");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
