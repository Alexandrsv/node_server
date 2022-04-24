import { Logger } from "tslog";

export interface ILogger {
  logger: unknown;
  log(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
}
