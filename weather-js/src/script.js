// const weatherInfo = {}
// const weatherCard1;
// const weatherCard2;
// const weatherCard3;
// const weatherCard4;

const dateIRL = new Date();
const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const month = ['01', '02', "03", "04", "05","06", "07", "08", "09", "10", "11", "12"];

let metricConven = 'imperial';
const supers = document.getElementById('supers');
supers.addEventListener('click', toggleF_C(metricConven));

function toggleF_C(convention){
    const Fahr = document.getElementById('Fahr');
    const Cels = document.getElementById('Cels');
    
    if (Fahr.classList.contains('selected') || Cels.classList.contains('selected')){
        Fahr.classList.toggle('selected');
        Cels.classList.toggle('selected');
        Fahr.classList.toggle('unselected');
        Cels.classList.toggle('unselected');
    } else
    (Fahr.classList.contains('selected')) ? convention = 'imperial' : convention = 'metric';
    // activeDeg.classList.replace('selected', 'unselected');
    // inactiveDeg.classList.replace('selected')
    return convention;
}

// addEventListener('click', tempMeasurement);

// const degree = document.getElementById('temperature');
// const apparent = document.getElementById('apparent');

// const percipProb = document.getElementById('percipProb');
// // const percipType = document.getElementById('percip-icon');

// const humid = document.getElementById('humid');
// const vis = document.getElementById('visibility');
// const windSpeed = document.getElementById('windSpeed');

// const lat = 40.7;
// const long = -74;

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
// getPhoto();
clockTime();
setInterval(clockTime, 1000);
        
function clockTime()
{
    const Hour = (dateIRL.getHours() > 12) ? dateIRL.getHours() - 12 : dateIRL.getHours();
    const Min = dateIRL.getMinutes();

    const nowDate = document.getElementById('date');
    const clock = document.getElementById('clk-time');

    let minuteForm = (Min < 10) ? `0${Min}`: `${Min}`;
    let meridiem = (dateIRL.getHours() < 12) ? `AM` : `PM`;

    clock.textContent = `${Hour}:${minuteForm} ${meridiem}`;
    nowDate.textContent = `${week[dateIRL.getDay()]} - ${month[dateIRL.getMonth()]}/${dateIRL.getDate()}`;

    const tl_currentHour = document.getElementById('current-hour-at');
    const tl_lastHour = document.getElementById('last-hour-at');
    const intervalList = document.querySelectorAll('#interval');

    // let sec = document.getElementById('sec');

    (dateIRL.getHours() >= 12) ? tl_currentHour.textContent = `| ${Hour}PM` : tl_currentHour.textContent = `| ${Hour}AM`;
    (dateIRL.getHours() + 8 > 23 || dateIRL.getHours() + 8 <= 12) ? tl_lastHour.textContent = `| ${Hour + 8}AM` : tl_lastHour.textContent = `| ${Hour + 8}PM`;

    // let interval = dateIRL.getHours() + 1;
    // for(i = 0; i < 8; i++){
    //     const intervalMeridiem = (interval > 11) ? `PM` : `AM`;
    //     const civTime = (interval > 12) ? interval - 12 : interval;
    //     intervalList[i].firstChild.textContent = `${civTime}${intervalMeridiem}`; //${intervalMeridiem}
    //     interval += 1;
    // }
}

// async function getPhoto(){
//     const response = await fetch(/**Unsplash Authentication key */);
//     const data = await response.json();
//     const photosOf = ;
// }