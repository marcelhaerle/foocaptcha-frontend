import {log} from "../../lib/logger";

const FC_URL = process.env.FC_URL;
const API_KEY = process.env.API_KEY;

const headers = {
  'Authorization': `Bearer ${API_KEY}`
};

const handler = async (req, res) => {
  try {
    const response = await fetch(`${FC_URL}/api/v1/chars`, {headers});
    if (response.ok) {
      const json = await response.json();
      res.json({
        id: json.id,
        src: `${FC_URL}/api/v1/captcha/${json.id}`
      });
    } else {
      res.status(response.status).json({message: response.statusText});
    }
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}

export default log(handler);
