async function getWeather()
{
    const response = await fetch(
        `https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=imperial&apikey=r02b5dPj9KQ4f1zJXRjErMBgJtUmlQpL`);
    const data = await response.json();

    console.log(data.data.timelines);
}

getWeather();

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