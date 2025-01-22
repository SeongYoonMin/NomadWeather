const API_KEY = `d2a0630315d52d53ba67286016aec6a8`;

/**
 * openweathermap api를 사용하여 현재 날씨 정보를 가져옵니다.
 * units의 기본값은 Kelvin이며, metric을 사용하면 섭씨로, Imperial을 사용하면 화씨로 변환됩니다.
 * @param lat // 위도
 * @param lon // 경도
 * @returns IWeather | null
 */
export const useWeatherCurrent = async (
  lat: number,
  lon: number,
  units: "default" | "metric" | "imperial" = "metric"
) => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );
  if (data.ok) {
    return await data.json();
  } else {
    return null;
  }
};
