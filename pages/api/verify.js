const FC_URL = process.env.FC_URL;

export default async (req, res) => {
  try {
    const { guess, id } = req.query;
    const response = await fetch(`${FC_URL}/api/v1/verify/${id}/${guess}`);
    if (response.ok) {
      res.end();
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch(e) {
    res.status(500).json({ message: e.message });
  }
}
