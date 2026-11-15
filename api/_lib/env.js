export function getServerEnv(name, fallback) {
  const matchingEntry = Object.entries(process.env)
    .find(([key]) => key.toLowerCase() === name.toLowerCase());
  const value = process.env[name] || matchingEntry?.[1];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
