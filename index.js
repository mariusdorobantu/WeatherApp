const appContainer = document.querySelector('.app--container');
const cityName = document.querySelector('.city--name');
const cityDegrees = document.querySelector('.city--degrees');
const adviceText = document.querySelector('.advice--text');
const inputTextArea = document.querySelector('input');
const searchBtn = document.querySelector('button');
const heroContainer = document.querySelector('.hero--container')

const freezingImg = document.querySelector('.freezing--img');
const coolImg = document.querySelector('.cool--img');
const warmImg = document.querySelector('.warm--img');
const heatedImg = document.querySelector('.heated--img');
const boilingImg = document.querySelector('.boiling--img');

const apiKey = '387948bb2b5a09cdda568e1571a458e9';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

function fetchWeather(city) {
    fetch(`${apiEndpoint}?appid=${apiKey}&q=${encodeURIComponent(city)}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            cityName.textContent = data.name;
            cityDegrees.textContent = `${Math.round(data.main.temp)}°C`;

            const temperature = data.main.temp;

            heroContainer.remove()
            freezingImg.classList.remove('visible');
            coolImg.classList.remove('visible');
            warmImg.classList.remove('visible');
            heatedImg.classList.remove('visible');
            boilingImg.classList.remove('visible');

            if (temperature < 0) {
                adviceText.textContent = `It's time to buy a jacket!`;
                freezingImg.classList.add('visible');
                // cityDegrees.style.color = '#00008B';
            } else if (temperature <= 5) {
                adviceText.textContent = `Don't forget your hat!`;
                coolImg.classList.add('visible');
            } else if (temperature <= 15) {
                adviceText.textContent = `Ok, now you can take off your hat`;
                warmImg.classList.add('visible');
            } else if (temperature <= 30) {
                adviceText.textContent = `Summer vibes`;
                heatedImg.classList.add('visible');
                heatedImg.computedStyleMap.marginLeft = '30px';
            } else {
                adviceText.textContent = `You better stay at home and drink plenty of water!`;
                boilingImg.classList.add('visible');
                boilingImg.style.height = '200px'
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            adviceText.textContent = 'Failed to fetch weather data. Please try again later.';
        });
}

searchBtn.addEventListener('click', event => {
    event.preventDefault();
    const inputTextAreaValue = inputTextArea.value;
    
    if (inputTextAreaValue) {
        fetchWeather(inputTextAreaValue);
        inputTextArea.value = '';
    } else {
        adviceText.innerHTML = `Please fill the input with a valid City/ Country`;
    }
});
