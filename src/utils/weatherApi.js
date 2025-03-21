import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  console.log("Raw weather data:", data); // Add this line

  const result = {};
  if (!data || !data.name || !data.main || !data.weather || !data.sys) {
    console.error("Missing required weather data properties:", data);
    return null;
  }

  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  console.log("Processed weather data:", result); // Add this line
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
