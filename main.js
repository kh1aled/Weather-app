const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const inputSearch = document.querySelector('.search-box input')
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const image = document.querySelector('.weather-box img')
const temperature = document.querySelector('.weather-box .temperature')
const describtion = document.querySelector('.weather-box .describtion')
const humidity = document.querySelector('.weather-details .humidity span')
const wind = document.querySelector('.weather-details .wind span')
const error = document.querySelector(".not-found")
search.addEventListener("click", ()=>{
    const apiKey = 'f06b55f226f42b37b43792e761dc39ff';
    const city = inputSearch.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{
        if(data.cod == '404'){
            container.style.height ="400px";
            weatherBox.classList.remove("active")
            weatherDetails.classList.remove("active")
            error.classList.add("active")
            return;
        }else{
            error.classList.remove("active")
            weatherBox.classList.add("active")
            weatherDetails.classList.add("active")
            container.style.height ="550px"
        }
   console.log("weather", data)
   switch(data.weather[0].main){
    case 'Clear':
        image.src = 'images/clear.png'
    break;
    case 'Rain':
        image.src = 'images/rain.png'
        break;
    case 'Snow':
        image.src = 'images/snow.png'
        break;
    case 'Clouds':
        image.src = 'images/cloudy.png'
        break;
    case 'Mist':
        image.src = 'images/mist.png'
        break;
    case 'Haze':
        image.src = 'images/mist.png'
        break;
    default:
        image.src = 'images/cloudy.png'
}
temperature.innerHTML = `${parseInt(data.main.temp)} <span>ºC</span>`
describtion.innerHTML = `${data.weather[0].description}`
humidity.innerHTML = `${data.main.humidity}%`
wind.innerHTML = `${data.wind.speed}Km/h`
    })
    .catch(error=>{
        console.error("error",error)
    })
})