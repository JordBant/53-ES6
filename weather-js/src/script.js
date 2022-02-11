// const weatherInfo = {}
// const weatherCard1;
// const weatherCard2;
// const weatherCard3;
// const weatherCard4;

// const degree = document.getElementById('temperature');

// async function getWeather()
// {
//     const response = await fetch(
//         `https://api.tomorrow.io/v4/timelines?location=${-73.98529171943665},${40.75872069597532}&fields=weatherCode&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=1h&units=imperial&apikey=r02b5dPj9KQ4f1zJXRjErMBgJtUmlQpL`);
//     const data = await response.json();
//     const dataObj = data.data.timelines[0].intervals[0].values;

//     degree.textContent = Math.floor(dataObj.temperature);

//     // cache each value in intervals[0].value to the weatherInfo object
//     //&fields=${'temperature'}&fields=${'precipitationType'}&fields=${'precipitationProbability'}
// }

// getWeather();

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