import client from "prom-client";

const Registry = client.Registry;
export const register = new Registry();

client.collectDefaultMetrics({register});

