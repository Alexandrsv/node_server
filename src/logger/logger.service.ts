import { Logger } from "tslog";
import { ILogger } from "./logger.interface";

export class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    });
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }
}
