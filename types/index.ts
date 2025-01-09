export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export interface WeatherData {
  current: {
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
    date: string;
  };
  forecast: {
    date: string;
    min_temperature: number;
    max_temperature: number;
    icon: string;
  }[];
  location: {
    name: string;
    country: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  units: string;
}

export interface TopBarProps {
  initialCity: string;
  initialUnits: string;
}