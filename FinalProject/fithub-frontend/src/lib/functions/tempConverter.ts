export const celsiusConverter = (temp: number) => {
  return (temp - 32) * (5 / 9);
};

export const farConverter = (temp: number) => {
  return temp * (9 / 5) + 32;
};

export const kelvinToCelsius = (temp: number): number => {
  return temp - 273.15;
};
