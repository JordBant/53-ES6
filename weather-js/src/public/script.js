//----------------------------Location Elements(.main)--------------------------------

const supers = document.getElementById('supers');
const searchBar = document.getElementById('search'); 

//----------------------------Clock--------------------------------
const dateIRL = new Date();
const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const month = ['01', '02', "03", "04", "05","06", "07", "08", "09", "10", "11", "12"];

const apiFields = {
    userInput:'',
    lat: 40.7,
    long: -74,
    measureConven: 'imperial',
    locality: 'Middleton',
    state: 'New York',
    zip: '10007'
}

const degree = document.getElementById('temperature');
const apparent = document.getElementById('apparent');

const percipProb = document.getElementById('percipProb');
// const percipType = document.getElementById('percip-icon');

const humid = document.getElementById('humid');
const vis = document.getElementById('visibility');
const windSpeed = document.getElementById('windSpeed');

// Third API to be consumed after data from US-Cities JSON managed
// async function getPhoto(){
//         const response = await fetch(/**Unsplash URI &Authentication key */);
//         const data = await response.json();
//         const photosOf = ;
//     }

    async function getLocation(){
        apiFields.userInput = searchBar.value;
        const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${apiFields.locality},${apiFields.state}&key=MYKEY`);
        const data = await res.json();
        const coordinates = data.results[0].geometry.location; 
        const locationInfo = data.results[0].address_components;
        
        // error handling
        // if(data.status !== "OK"){
            
            // }
        apiFields.lat = coordinates.lat;
        apiFields.long = coordinates.lng;
        
        locationInfo.forEach(component => {
            if(component.types.includes("locality") || component.types.includes("sublocality")){
                apiFields.locality = locationInfo.long_name;
            }
            if(component.types.includes("administrative_level_1")){
                apiFields.state = locationInfo.long_name;
            }
            if(component.types.includes("postal_code")){
                apiFields.zip = locationInfo.long_name;
            }
        });
        console.log(coordinates);
    }

async function getWeather(){
    toggleUnits();

    const response = await fetch(
        `https://api.tomorrow.io/v4/timelines?location=${apiFields.lat},${apiFields.long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${apiFields.measureConven}&apikey=MYKEY`);
        const data = await response.json();
        const dataObj = data.data.timelines[0].intervals[0].values;
        
        vis.textContent = dataObj.visibility;
        windSpeed.textContent = dataObj.windSpeed;
        percipProb.textContent = dataObj.precipitationProbability;
        humid.textContent = dataObj.humidity;
        
        degree.textContent = Math.floor(dataObj.temperature);
        apparent.textContent = Math.floor(dataObj.temperatureApparent);

        console.log(dataObj);
    }
    
    function toggleUnits(){
        const Fahr = document.getElementById('Fahr');
        const Cels = document.getElementById('Cels');
        
        if (Fahr.classList.contains('selected') || Cels.classList.contains('selected')){
            Fahr.classList.toggle('selected');
            Fahr.classList.toggle('unselected');
            Cels.classList.toggle('selected');
            Cels.classList.toggle('unselected');
        }  
        return apiFields.measureConven = (Fahr.classList.contains('selected')) ? 'imperial' : 'metric';
    }
    
    // Spott API limits 1000 API calls a month and I reached it
    // async function search(){
    //     // const searchList = document.getElementById('locations-dropdown');
    //     // if(searchList){

    //     // }
    //     const userInput = (searchBar.value !== '' && searchBar.value.includes(' ')) ? searchBar.value.replace(' ', '%20') : searchBar.value;
    //     const res = await fetch(`https://spott.p.rapidapi.com/places?type=CITY&skip=0&country=US&limit=10&q=${userInput}`, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "spott.p.rapidapi.com",
    //             "x-rapidapi-key": ""
    //         }
    //     })
    //     const places = await res.json();
    //     places.forEach(place => {
    //         let suggestion = document.createElement('li').textContent(`${place.name}, ${place.adminDivision1.name}`);
    //         suggestion.setAttribute('id', 'location');
    //         suggestion.setAttribute('class', 'location');
    //         searchList.append(suggestion);
    //         });
    //     }

    function clockTime()
    {
        const Hour = (dateIRL.getHours() > 12) ? dateIRL.getHours() - 12 : dateIRL.getHours();
        const Min = dateIRL.getMinutes();
        
        const nowDate = document.getElementById('date');
        const clock = document.getElementById('clk-time');
        
        let minuteForm = (Min < 10) ? `0${Min}`: `${Min}`;
        let meridiem = (dateIRL.getHours() < 12) ? `AM` : `PM`;
        
        const today = (dateIRL.getDate() < 10) ? `0${dateIRL.getDate()}` : `${dateIRL.getDate()}`;
        clock.textContent = `${Hour}:${minuteForm} ${meridiem}`;
        nowDate.textContent = `${week[dateIRL.getDay()]} - ${month[dateIRL.getMonth()]}/${today}`;
        
        const tl_currentHour = document.getElementById('current-hour-at');
        const tl_lastHour = document.getElementById('last-hour-at');
        
        // let sec = document.getElementById('sec');
        (dateIRL.getHours() >= 12) ? tl_currentHour.textContent = `| ${Hour}PM` : tl_currentHour.textContent = `| ${Hour}AM`;
        (dateIRL.getHours() + 8 > 23 || dateIRL.getHours() + 8 <= 12) ? tl_lastHour.textContent = `| ${Hour + 8}AM` : tl_lastHour.textContent = `| ${Hour + 8}PM`;
        
    // const intervalList = document.querySelectorAll('#interval');
    // let interval = dateIRL.getHours() + 1;
    // for(i = 0; i < 8; i++){
    //         const intervalMeridiem = (interval > 11) ? `PM` : `AM`;
    //         const civTime = (interval > 12) ? interval - 12 : interval;
    //         intervalList[i].firstChild.textContent = `${civTime}${intervalMeridiem}`; //${intervalMeridiem}
    //         interval += 1;
    //     }
    }
    


getWeather();
// getPhoto();
// search();
clockTime();
setInterval(clockTime, 1000);

getLocation();
// searchBar.addEventListener('input', search);
supers.addEventListener('click', getWeather);

//-----------------------------//


// async () => {
//     const response = await fetch(``); //My server side code
//     const weather = await response.json();
// }

// async () => {
//     const response = await fetch(``); //My server side code
//     const geocode = await response.json();
// }