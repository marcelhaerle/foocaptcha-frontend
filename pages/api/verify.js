import {log, logger} from "../../lib/logger";

const FC_URL = process.env.FC_URL;

const handler = async (req, res) => {
  try {
    const {guess, id} = req.query;
    const response = await fetch(`${FC_URL}/api/v1/verify/${id}/${guess}`);
    if (response.ok) {
      res.end();
    } else {
      res.status(response.status).json({message: response.statusText});
    }
  } catch (e) {
    logger.error(e);
    res.status(500).json({message: e.message});
  }
}

export default log(handler);
