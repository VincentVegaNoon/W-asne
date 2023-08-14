const header = document.querySelector("header");
const daySection = document.querySelectorAll(".day");
const input = document.querySelector("input");
const apiKey = "9cdbba22380927c06d85179a7490438e";
const btn = document.querySelector("button");
const infoSection = document.querySelector(".info");
infoSection.style.display = "none";

btn.addEventListener("click", async () => {
  const city = input.value;
  if (city === "") {
    return;
  }
  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    data = await response.json();
    if ((data.cod = "404")) {
      infoSection.style.display = "none";
    }
    input.value = "";
  } catch (error) {
    console.error(error);
  }
  createSeletedCity(data);
});

const createSeletedCity = (data) => {
  const h1 = document.querySelector(".temp.condition h1");
  const temperature = document.querySelector(".temp p");
  const weatherCondition = document.querySelector(".weather.condition h1");
  const windCondition = document.querySelector(".wind.condition h1");
  h1.textContent = data.name;
  temperature.textContent = `${data.main.temp} °C`;
  weatherCondition.textContent = data.weather[0].main;
  windCondition.textContent = "Wind";
  document.querySelector(
    ".weather p"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>`;
  document.querySelector(".wind p").textContent = `${data.wind.speed}Km/h`;
  infoSection.style.display = "block";
};
