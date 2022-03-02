import {log, logger} from "../../lib/logger";
import redis from "../../lib/redis";
import {send} from "../../lib/mail";
import {nanoid} from "nanoid";

const FC_URL = process.env.FC_URL;

const verifyCaptchaSolution = async (captchaId, captchaSolution) => {
  const verifyResponse = await fetch(`${FC_URL}/api/v1/verify/${captchaId}/${captchaSolution}`);
  return verifyResponse.ok;
}

const saveKeyRequest = async (email, apiKey) => {
  const redisKey = `fc:keyRequest:${apiKey}`;
  await redis.set(redisKey, email);
  await redis.expire(redisKey, 15 * 60);
}

const sendActivationLink = (email, apiKey) => {
  const link = `https://www.foocaptcha.net/activate?apiKey=${apiKey}`;
  const text = `Hi, thanks for using foocaptcha! To activate your API key ${apiKey} visit this link: ${link}`;
  send(text, 'foocatpcha API key', email);
}

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      const body = JSON.parse(req.body);
      const isVerified = await verifyCaptchaSolution(body.id, body.solution);
      if (isVerified) {
        const email = body.email;
        const apiKey = nanoid(20);
        logger.info('Generated API key', {apiKey, email});
        await saveKeyRequest(email, apiKey);
        sendActivationLink(email, apiKey);
        return res.status(200).end();
      } else {
        return res.status(400).json({ message: 'invalid-captcha' });
      }
    default:
      return res.status(405).end();
  }
}

export default log(handler);
