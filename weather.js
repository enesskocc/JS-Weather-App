const search = document.querySelector(".search");
const card = document.querySelector(".card");
const reset = document.querySelector(".reset");
let description = document.querySelector(".description");

async function getWeatherInfo() {
  const input = document.querySelector("#input").value;
  console.log(input);
  try {
    const key = "933cfcd9e1db007b3d24bf60192f7fb5";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`
    );
    if (
      card.innerHTML.toLocaleLowerCase().includes(input.toLocaleLowerCase())
    ) {
      description.innerHTML = `You already know the weather for city. Please search for another city 😉`;
      setTimeout(() => {
        description.innerHTML = "";
      }, 5000);
      document.querySelector("#input").value = "";
    } else {
      const data = await res.json();
      schowonscreen(data);
      console.log(data);
    }

    
  } catch (error) {
    console.log(error);
  }
}

search.onclick = () => {
  getWeatherInfo();
};

// https://openweathermap.org/weather-conditions --> hava duurmu ikonlarinini bu siteden halletik

const schowonscreen = (data) => {
  document.querySelector(".card").innerHTML += `<div class='cardInfo'>
      <h2 class="city-name">
              <span>${data.name}</span>
              <sup>${data.sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(
            data.main.temp
          )}<sup>°</sup>C</div>
          <figure>
          <img class="city-icon" src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png">
          <figcaption>${data.weather[0].description}</figcaption>
      </figure>
          </div>`;

  input.value = "";
};

reset.onclick = () => {
  resetWindow();
};

const resetWindow = () => {
  location.reload();
};

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getWeatherInfo();
  }
});
