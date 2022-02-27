import {register} from "../../lib/metrics";

export default async function handle(req, res) {
  const metrics = await register.metrics();
  res.setHeader("Content-Type", register.contentType);
  res.send(metrics);
}
