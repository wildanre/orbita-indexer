export const timeFormatter = (timestamp: number) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toISOString().substring(11, 19);
};
