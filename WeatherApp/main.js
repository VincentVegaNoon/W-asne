const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const header = document.querySelector("header");
const daySection = document.querySelectorAll(".day");
const weatherApi =
  "https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&hourly=temperature_2m,rain,is_day&daily=weathercode,temperature_2m_max,apparent_temperature_max&current_weather=true&timezone=auto";
const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const timeFunc = (number = 0) => {
  const now = new Date();
  let day = days[now.getDay() + number];
  return day;
};
async function fetchWeatherInfo() {
  try {
    const response = await fetch(weatherApi);
    const data = await response.json();
    console.log(data.current_weather);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

fetchWeatherInfo().then((data) => {
  weather(data);
  if (data.current_weather.is_day === 0) {
    const newStyle = `
    .wrapper::before {background: linear-gradient(#10296e7a, #050c6e77);}`;
    const styleElement = document.createElement("style");
    styleElement.appendChild(document.createTextNode(newStyle));
    document.head.appendChild(styleElement);
    header.style.color = "white";
  } else if (data.current_weather === 1) {
    styleElement.remove();
    header.style.color = "black";
  }
  let h1String = data.timezone.replace(/.*\//, "");
  h1.textContent = `${h1String}`;
  h2.textContent = `${data.current_weather.temperature}${data.hourly_units.temperature_2m}`;
  h3.textContent = `${weatherCodes[data.current_weather.weathercode]}`;
  for (let i = 1; i <= daySection.length; i++) {
    daySection[i - 1].childNodes[1].textContent = timeFunc(i);
    daySection[
      i - 1
    ].childNodes[3].children[0].textContent = `${data.daily.temperature_2m_max[i]} ${data.daily_units.temperature_2m_max}`;
    daySection[i - 1].childNodes[3].children[1].textContent =
      weatherCodes[data.daily.weathercode[i]];
  }
});

function weather(data) {
  console.log(data.hourly_units.temperature_2m);
  console.log(data);
}

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers: Slight intensity",
  86: "Snow showers: Heavy intensity",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};
