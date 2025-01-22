export interface IWeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherMain {
  temp: number; // 온도
  fells_like: number; // 채감온도
  temp_min: number; // 최저온도
  temp_max: number; // 최고온도
  pressure: number; // 대기압
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWeatherWind {
  speed: number;
  deg: number;
  gust: number;
}
export interface IWeatherRain {
  rain: {
    "1h": number;
  };
}
export interface IWeatherClouds {
  all: number;
}

export interface IWeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeatherDetail[];
  base: string;
  main: IWeatherMain;
  visibility: number;
  wind: IWeatherWind;
  rain: IWeatherRain;
  clouds: IWeatherClouds;
  dt: number;
  sys: IWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
