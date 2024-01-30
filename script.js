const apiKey = 'bcc3c072cf2cd465eff2727163845106';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherBox =document.querySelector('.weather');

const weatherIcon = document.querySelector('.weather-icon');

const searchContent = searchBox.value;
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404)
    {
        
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }

    else{
        
        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'images/clouds.png';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'images/clear.png';
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'images/rain.png';
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'images/mist.png';
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png';
        }
        weatherBox.style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        weatherBox.classList.add('weather-transition');
    }
}

searchBox.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter')
    {
        checkWeather(searchBox.value);
    }
});

searchButton.addEventListener('click',() =>{
    checkWeather(searchBox.value);
});

