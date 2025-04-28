const prefix = "RSS_";
const parseEnv = () => {
  const result = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
  console.log(result);
};

parseEnv();
