import data from "./data.json";

export const getGameOfThronesCharacters = (): Promise<typeof data> => {
  const randomDelay = Math.floor(Math.random() * 3001); // Generates a random number between 0 and 3000 (inclusive)
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver(data);
    }, randomDelay);
  });
};
