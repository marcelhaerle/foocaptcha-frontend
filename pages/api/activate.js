import {log, logger} from "../../lib/logger";
import mongoPromise from "../../lib/mongo";
import redisClient from "../../lib/redis";

const handler = async (req, res) => {
  const client = await mongoPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  const apiKey = req.query['apiKey'] || null;
  let email = null;

  try {
    email = await redisClient.get(`fc:keyRequest:${apiKey}`);

    if (email !== null) {
      // The 'subscriptions' collection uses the account email for the id!
      const query = {_id: email};
      const set = {apiKey: apiKey, verified: true, limitPerTenSeconds: 10};
      await db.collection('subscriptions').updateOne(query, {$set: set}, {upsert: true});
      res.json({
        apiKey,
        email
      });
    } else {
      res.status(400).end();
    }
  } catch (e) {
    logger.error(e);
    res.status(500).end();
  }
}

export default log(handler);
