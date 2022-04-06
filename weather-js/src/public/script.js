//----------------------------()--------------------------------
const supers = document.getElementById('supers');
const searchBar = document.getElementById('search'); 
const loc_List = document.getElementById('locations-dropdown')

const oldChildren = loc_List.children;
//----------------------------Clock--------------------------------
const dateIRL = new Date();
const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const month = ['01', '02', "03", "04", "05","06", "07", "08", "09", "10", "11", "12"];

//----------------------------Data For UI--------------------------------

const apiComm = { 
    suggestArr: [], 
    placesArr: [],

    /*
        Array to hold weather information 
        in a nine hour time span
    */
    nineHourSpan: []
}

const displayFields = {
    chosenPlace: '',
    lat: 40.7,
    long: -74,
    measureConven: 'imperial',
    locality: 'Middleton',
    state: 'New York',
}

//------------------------Elements----------------------------
const degree = document.getElementById('temperature');
const apparent = document.getElementById('apparent');

const percipProb = document.getElementById('percipProb');
// const percipType = document.getElementById('percip-icon');

const humid = document.getElementById('humid');
const vis = document.getElementById('visibility');
const windSpeed = document.getElementById('windSpeed');
//------------------------------------------------------------

// Third API to be consumed after data from US-Cities JSON managed
// async function getPhoto(){
//         const response = await fetch(/**Unsplash URI &Authentication key */);
//         const data = await response.json();
//         const photosOf = ;
//     }

    // async function getLocation(){
    //     displayFields.userInput = searchBar.value;
    //     const res = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${displayFields.locality},${displayFields.state}&key=MYKEY`);
    //     const data = await res.json();
    //     const coordinates = data.results[0].geometry.location; 
    //     const locationInfo = data.results[0].address_components;
        
    //     // error handling
    //     // if(data.status !== "OK"){
            
    //         // }
    //     displayFields.lat = coordinates.lat;
    //     displayFields.long = coordinates.lng;
        
    //     locationInfo.forEach(component => {
    //         if(component.types.includes("locality") || component.types.includes("sublocality")){
    //             displayFields.locality = locationInfo.long_name;
    //         }
    //         if(component.types.includes("administrative_level_1")){
    //             displayFields.state = locationInfo.long_name;
    //         }
    //         if(component.types.includes("postal_code")){
    //             displayFields.zip = locationInfo.long_name;
    //         }
    //     });
    //     console.log(coordinates);
    // }

// async function getWeather(place){
    
//     toggleUnits();
//     try {
//         const response = await fetch('/weather', {

//             method: 'POST',
//             headers: {"Content-Type" : "application/json"},
//             body: JSON.stringify(place)

//         })
//         const weather = await response.json();
//     } catch (error) {
//         console.log(error)
//     }
    // const dataObj = data.data.timelines[0].intervals[0].values;
        
    // vis.textContent = dataObj.visibility;
    // windSpeed.textContent = dataObj.windSpeed;
    // percipProb.textContent = dataObj.precipitationProbability;
    // humid.textContent = dataObj.humidity;
    
    // degree.textContent = Math.floor(dataObj.temperature);
    // apparent.textContent = Math.floor(dataObj.temperatureApparent);

    // console.log(dataObj);
//     }
// getWeather(displayFields.chosenPlace)


const updateHTML = (paramArr) => {
    while ((searchBar.value === '' && oldChildren.length > 0) || (paramArr.length === 0 && oldChildren.length > 0)){
        for (let i = 0; i < oldChildren.length; i++) {
            loc_List.removeChild(loc_List.firstChild);
        }
    }

    for(let i = 0; i <= paramArr.length; i++){
        const locationLi = document.createElement('li');
        locationLi.setAttribute('class' , 'location');
        locationLi.textContent = paramArr[i];
        loc_List.appendChild(locationLi);

        if (loc_List.children.length > 0) {
            loc_List.replaceChild(locationLi, loc_List.children[i]);
        }
        
        //Get Weather on click location
        locationLi.addEventListener('click', 
        () => {
            displayFields.chosenPlace = locationLi.textContent

            const { placesArr } = apiComm
            const { chosenPlace: choice } = displayFields
            const temp = placesArr.find(place => place.matchedPlace === choice)

            displayFields.lat = temp.coord[1]
            displayFields.long = temp.coord[0]
            console.log('Coords: ' + displayFields.lat +' '+ displayFields.long)

            getWeather();
        })
    }  
}

const getWeather = async () => {
    const coordinates = {
        geolocation:[

            displayFields.lat,
            displayFields.long

        ]}

    try {
        const response = await fetch('/weather', {
    
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(coordinates)
    
        })
        const data = await response.json()
        console.log('Client:', data)

    } catch (error) {
        console.log(error)
    }
}

const toggleUnits = () => {
    const Fahr = document.getElementById('Fahr');
    const Cels = document.getElementById('Cels');
    
    if (Fahr.classList.contains('selected') || Cels.classList.contains('selected')){
        Fahr.classList.toggle('selected');
        Fahr.classList.toggle('unselected');
        Cels.classList.toggle('selected');
        Cels.classList.toggle('unselected');
    }  
    return displayFields.measureConven = (Fahr.classList.contains('selected')) ? 'imperial' : 'metric';
}   

const clockTime = () => {
    const Hour = (dateIRL.getHours() > 12) ? dateIRL.getHours() - 12 : dateIRL.getHours();
    const Min = dateIRL.getMinutes();
    
    const nowDate = document.getElementById('date');
    const clock = document.getElementById('clk-time');
    
    const minuteForm = (Min < 10) ? `0${Min}`: `${Min}`;
    const meridiem = (dateIRL.getHours() < 12) ? `AM` : `PM`;
    
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

// searchBar.addEventListener('input', search);
// supers.addEventListener('click', getWeather);

clockTime();
setInterval(clockTime, 1000);

searchBar.addEventListener('input', async () => {
    const data = { 
        input: searchBar.value 
    }    
    try {
        const response = await fetch('/input', {

            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)

        })
        const loc_Obj = await response.json();
        apiComm.placesArr = loc_Obj.placeData;
        apiComm.suggestArr = loc_Obj.placeData.map(location => location.matchedPlace);
        
        const {suggestArr: suggest, placesArr: locInfo } = apiComm;
        updateHTML(suggest)   
    }
    catch(error) { 
        return error 
    }
    //Server response should be an array of the cities that are generated in the autocomplete
})