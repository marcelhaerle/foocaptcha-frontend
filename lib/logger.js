import pino from "pino";
import pinoHttp from "pino-http";

const logger = pinoHttp({
  logger: pino(),
  useLevel: 'info'
});

export const log = (handler) => (req, res) => {
  logger(req, res);
  return handler(req, res);
}
