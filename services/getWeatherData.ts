"use server";
// Fetch the weather data from the API
export const getWeather = async (city: string, units: string) => {
  const response = await fetch(
    `${process.env.API_URL}/weather?city=${city}&units=${units}`
  );
  const data = await response.json();
  return data;
};
