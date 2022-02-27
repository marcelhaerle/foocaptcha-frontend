import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino();

const httpLogger = pinoHttp({
  logger,
  useLevel: 'info'
});

export const log = (handler) => (req, res) => {
  httpLogger(req, res);
  return handler(req, res);
}
