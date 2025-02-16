import data from "./data.json";

export const getGameOfThronesCharacters = (): Promise<typeof data> => {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver(data);
    }, 3000);
  });
};
