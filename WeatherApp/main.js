const header = document.querySelector("header");
const daySection = document.querySelectorAll(".day");
const input = document.querySelector("input");
// const apiKey = "9cdbba22380927c06d85179a7490438e";
const btn = document.querySelector("button");
const infoSection = document.querySelector(".info");
const ul = document.querySelector(".menu__box");
infoSection.style.display = "none";
const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
const fragment = document.createDocumentFragment();
const hamburgerMenu = document.querySelector(".menu__box");
btn.addEventListener("click", apiCall);

function apiCall() {
  const city = input.value;
  fetchWeatherData(city);
  addToHistory(city);
}

function fetchWeatherData(city) {
  const apiKey = "9cdbba22380927c06d85179a7490438e";
  if (city === "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        infoSection.style.display = "none";
      }
      input.value = "";
      createSelectedCity(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

const createSelectedCity = (data) => {
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

const addToHistory = (city) => {
  if (city.length < 1) {
    return;
  }
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.classList.add("menu__item");
  a.href = "#";
  a.textContent = city.toUpperCase();
  ul.prepend(li);
  li.appendChild(a);
  if ([...document.querySelectorAll("li")].length > 5) {
    ul.removeChild(ul.lastChild);
  }
  const link = document.querySelectorAll("a");
  linklistener(link);
  historyTab(city);
};

function historyTab(city) {
  storedHistory.unshift(city.toUpperCase());
  if (storedHistory.length > 5) {
    storedHistory.pop();
  }
  localStorage.setItem("history", JSON.stringify(storedHistory));
}

document.addEventListener("DOMContentLoaded", function () {
  if (storedHistory.length > 0) {
    storedHistory.forEach((city) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList.add("menu__item");
      a.href = "#";
      a.textContent = city.toUpperCase();
      fragment.appendChild(li);
      li.appendChild(a);
    });
    ul.appendChild(fragment);
    const link = document.querySelectorAll("a");
    linklistener(link);
  }
});

function linklistener(link) {
  link.forEach((elem) => {
    elem.addEventListener("click", function () {
      const city = elem.textContent;
      fetchWeatherData(city);
      hamburgerMenu.style.display = "none";
    });
  });
}

document
  .querySelector(".hamburger-menu button")
  .addEventListener("click", function () {
    if (hamburgerMenu.style.display === "block") {
      hamburgerMenu.style.display = "none";
    } else {
      hamburgerMenu.style.display = "block";
    }
  });
input.addEventListener("click", function () {
  hamburgerMenu.style.display = "none";
});
