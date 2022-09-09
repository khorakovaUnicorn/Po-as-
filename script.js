const conditionsElement = document.getElementById('conditions');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feels_like');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const uvIndexElement = document.getElementById('uvindex');

var updateTime
var updateMinute
var result;
updateWeather();

function timeFromUpdate() {
    let actualTime = new Date();
    let actualMinute = actualTime.getMinutes()
    if (actualMinute >= updateMinute) {
        result = actualMinute - updateMinute;
    } else {
        result = 60 + (actualMinute - updateMinute);
    }
    document.getElementById('updateTime').innerHTML = "Updated " + result + " minutes ago.";
}

setInterval(timeFromUpdate, 1000);

setInterval(updateWeather, 300000);

function updateWeather() {
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Plze%C5%88?unitGroup=metric&key=9YJ3MPA6WTWD8J7F98KZXMBTU&contentType=json')
        .then((response) => response.json())
        .then((data) => {
            displayData(data);
            updateTime = new Date();
            updateMinute = updateTime.getMinutes();
            timeFromUpdate();
        });
}

function displayData(data) {
    conditionsElement.innerText = data.currentConditions.conditions;
    temperatureElement.innerText = data.currentConditions.temp + "°C";
    feelsLikeElement.innerText = data.currentConditions.feelslike + "°C";
    humidityElement.innerText = data.currentConditions.humidity + "%";
    pressureElement.innerText = data.currentConditions.pressure + "hPa";
    uvIndexElement.innerText = data.currentConditions.uvindex;
}

// function updateTime() {
//     let now = new Date();
//     let updateTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
//     document.getElementById('updateTime').innerHTML = 'Update time ' + updateTime;
// }


