// const weatherInfo = {}
// const weatherCard1;
// const weatherCard2;
// const weatherCard3;
// const weatherCard4;

const degree = document.getElementById('temperature');
const apparent = document.getElementById('apparent');

const percipProb = document.getElementById('percipProb');
// const percipType = document.getElementById('percip-icon');

const humid = document.getElementById('humid');
const vis = document.getElementById('visibility');
const windSpeed = document.getElementById('windSpeed');

const metricConven = 'imperial';
const lat = 40.7;
const long = -74;

// async function getWeather(){
//     const response = await fetch(
//         `https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${metricConven}&apikey=r02b5dPj9KQ4f1zJXRjErMBgJtUmlQpL`);
//     const data = await response.json();
//     const dataObj = data.data.timelines[0].intervals[0].values;

//     vis.textContent = dataObj.visibility;
//     windSpeed.textContent = dataObj.windSpeed;
//     percipProb.textContent = dataObj.precipitationProbability;
//     humid.textContent = dataObj.humidity;
//     degree.textContent = Math.floor(dataObj.temperature);
//     apparent.textContent = Math.floor(dataObj.temperatureApparent);

//     // cache each value in intervals[0].value to the weatherInfo object
//     //&fields=${'temperature'}&fields=${'precipitationType'}&fields=${'precipitationProbability'}
// }
// getWeather();
mil_Time();
setInterval(mil_Time, 1000);

function mil_Time()
{
    const dateIRL = new Date();

    let clockHour = document.getElementById('clk-hour');
    let clockMin = document.getElementById('clk-min');
    let AM_PM = document.getElementById('meridiem');
    // let sec = document.getElementById('sec');
    
    Hour = dateIRL.getHours();
    Min = dateIRL.getMinutes();

    clockMin.textContent = Min;
    (Min < 10) ? clockMin.textContent = "0" + Min : Min;
    
    clockHour.textContent = Hour;
    (Hour > 12) ? clockHour.textContent = Hour - 12 : Hour;
    (Hour > 12) ? AM_PM.textContent = 'PM' : AM_PM.textContent = 'AM';
}

// async function getPhoto(){
//     const response = await fetch(/**Unsplash Authentication key */);
//     const data = await response.json();
//     const photosOf = ;
// }
// getPhoto();

// document.addEventListener("DOMContentLoaded", async() => {

//     let weather = [];

//     try {
//         weather = await getWeather();
//     } catch (error) {
//         console.log("Load Error occured");
//         console.log(error);
//     }

//     console.log(weather);
// });