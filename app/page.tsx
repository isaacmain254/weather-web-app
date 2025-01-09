import Image from "next/image";
import { getWeather } from "@/services/getWeatherData";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
// components
import TopBar from "@/components/TopBar";
import WeatherCard from "@/components/WeatherCard";
import HumidityProgressBar from "@/components/HumidityProgressBar";
// types
import { SearchParams, WeatherData } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // get city and units value from the searchParams
  const searchParam = (await searchParams).city as string;
  const unitsParam = (await searchParams).units as string;

  // The default or initial city name when there is no search is 'Nairobi'
  const cityName = searchParam ? searchParam : "Nairobi";
  const temperatureUnit = unitsParam ? unitsParam : "metric";

  // Fetch the  weather data from the server
  const weatherData: WeatherData = await getWeather(cityName, temperatureUnit);
  const icon_base_url = "https://openweathermap.org/img/wn";
  // Check if the temperature unit is metric or imperial
  const degreesOrFahrenheit = weatherData.units === "metric" ? "C" : "F";
  const windUnits = temperatureUnit === "metric" ? "m/s" : "mph";

  // Check if there is an error in fetching the weather data
  if (weatherData.error) {
    return (
      <div className="w-full min-h-screen flex items-center  justify-center ">
        <div>
          <p>
            <span>Error:</span>
            <span className="text-content2">{weatherData.error}</span>
          </p>
          {/* TODO: Why Link does not reload a server page?? but <a></a> does */}
          <a href="/" className="link link-primary">
            Clear search and reload
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-12 w-full lg:w-8/12 mx-auto md:mt-5 border border-gray-800 rounded">
      <aside className="col-span-12 md:col-span-2 flex flex-col items-center justify-between text-center h-full  lg:px-3 py-6 border-r border-gray-700">
        <div className="pb-4 md:pb-0">
          <Image
            src={`${icon_base_url}/${weatherData.current.icon}.png`}
            alt="Weather Icon"
            width={160}
            height={160}
          />
          <p className="font-semibold text-lg">
            {weatherData.current.temperature} <sup>o</sup>
            {degreesOrFahrenheit}
          </p>
          <p className="font-semibold text-lg">
            {capitalizeFirstLetter(weatherData.current.description)}
          </p>
        </div>
        <div>
          <p>{weatherData.current.date}</p>
          <p>{weatherData.location.name}</p>
        </div>
      </aside>
      <main className="col-span-12 md:col-span-10 p-2 md:p-7">
        {/* top bar */}
        <TopBar initialCity={cityName} initialUnits={temperatureUnit} />
        {/* 3 day forecast */}
        <div className="w-full flex flex-col md:flex-row gap-5 my-8">
          {weatherData.forecast.map((forecast) => (
            <WeatherCard
              key={forecast.date}
              title={forecast.date}
              isImage={true}
              content={`${icon_base_url}/${forecast.icon}.png`}
              footerContent={`${forecast.min_temperature} - ${forecast.max_temperature} °${degreesOrFahrenheit}`}
            />
          ))}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-5">
          <WeatherCard
            title="Wind status"
            content={`${weatherData.current.wind_speed.toString()} ${windUnits}`}
            footerContent={`${weatherData.current.wind_deg} ${weatherData.current.wind_direction}`}
          />
          <WeatherCard
            title="Humidity"
            content={`${weatherData.current.humidity} %`}
            footerContent={
              <HumidityProgressBar value={weatherData.current.humidity} />
            }
          />
        </div>
      </main>
    </section>
  );
}
