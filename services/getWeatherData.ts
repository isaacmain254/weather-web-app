"use server";
// Fetch the weather data from the API
export const getWeather = async (city: string, units: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/weather?city=${city}&units=${units}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
