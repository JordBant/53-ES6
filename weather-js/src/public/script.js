//----------------------------()--------------------------------
const supers = document.getElementById('supers');
const searchBar = document.getElementById('search'); 
const loc_List = document.getElementById('locations-dropdown')
const city = document.getElementById('location')

const intervals = document.querySelectorAll('#info-at')

const oldChildren = loc_List.children;
//----------------------------Clock--------------------------------
const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const month = ['01', '02', "03", "04", "05","06", "07", "08", "09", "10", "11", "12"];

//----------------------------Data For UI--------------------------------

const apiComm = { 
    suggestArr: [], 
    placesArr: [],
    nineHour_Info: [],
    lat: 40.7,
    long: -74,
    convention: 'imperial'
}

const displayFields = {
    chosenPlace: '',
    currentTemp: '',
    currentApparent: '',
    locality: 'New York',
    state: 'New York',
    currentCondition: 'temperature',
}

//------------------------Weather Attributes----------------------------
const degree = document.getElementById('temperature');
const apparent = document.getElementById('apparent');

const percipProbEl = document.getElementById('percipProb');

const humid = document.getElementById('humid');
const vis = document.getElementById('visibility');
const windSpeedEl = document.getElementById('windSpeed');
//------------------------------------------------------------

// Third API to be consumed after data from US-Cities JSON managed
// async function getPhoto(){
//         const response = await fetch(/**Unsplash URI &Authentication key */);
//         const data = await response.json();
//         const photosOf = ;
//     }

/*
    Convert node list to array and rearrange the node 
    list if the value of arr[0] is not the intended array 
*/

const displayHTML = () => {
    const elementArr = [...intervals];
    const { nineHour_Info: nineHour } =  apiComm    

    //find out how to make the object's property be ...
    // ... dynamically interchangable with other properties
    const displayArr = nineHour.map(object => object.temperature) 

    degree.textContent = `${Math.floor(displayFields.currentTemp)}\u00B0`
    apparent.textContent = `${Math.floor(displayFields.currentApparent)}\u00B0`
    city.textContent = `${displayFields.locality}, ${displayFields.state}`

    const { humidity, visibility, precipitationProbability:percipProb, windSpeed } = nineHour[0] 

    vis.textContent = `${humidity}%`
    humid.textContent = `${visibility}mi`
    percipProbEl.textContent = `${percipProb}%`
    windSpeedEl.textContent = `${windSpeed}mph`

    elementArr.forEach((element, index) => {
        const wholeNum = Math.floor(displayArr[index])
        element.textContent = `${wholeNum}\u00B0` // + interpolated variable conatining appended unit
    });

    console.log('Particular condition:', displayArr)
    console.log('Object Array:', nineHour)
    console.log('Element Arr:', elementArr)    

    /**
     * Display temperatures
     * 
     * Display weather conditions respective to whats denoted by the card number in 
     * the weatherConditions Object Arr
     * 
     * Map the nineHour object array to the array of data in in the 9Hour arch
     */
}

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
            
            //Split string to select just locality and state
            const locNameArr = choice.split(',')
            displayFields.locality = locNameArr[0]
            displayFields.state = locNameArr[1]

            const temp = placesArr.find(place => place.matchedPlace === choice)

            apiComm.lat = temp.coord[1]
            apiComm.long = temp.coord[0]
            console.log('Coords: ' + apiComm.lat +' '+ apiComm.long)

            getWeather();
        })
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
    apiComm.convention = (Fahr.classList.contains('selected')) ? 'imperial' : 'metric';
    getWeather()
}  

const clockTime = () => {

    //---------------------------Digital---------------------------//
    const dateIRL = new Date();

    const digitalClock = document.getElementById('digital');
    
    const Hour = (dateIRL.getHours() > 12) ? dateIRL.getHours() - 12 : dateIRL.getHours();
    const Min = dateIRL.getMinutes();
    const Sec = dateIRL.getSeconds(); 

    const meridiem = (dateIRL.getHours() < 12) ? `AM` : `PM`;
    const minuteForm = (Min < 10) ? `0${Min}`: `${Min}`;

    digitalClock.textContent = `${Hour}:${minuteForm} ${meridiem}`;

    //---------------------------Analog---------------------------//
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
    const secHand = document.querySelector('.sec-hand');

    const secondsDegrees = ((Sec / 60) * 360) + 90;
    secHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    const minDegrees = ((Min / 60) * 360) + ((Sec/60)*6) + 90;
    minHand.style.transform = `rotate(${minDegrees}deg)`;
    
    const hourDegrees = ((Hour / 12) * 360) + ((Min/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    console.log(`${Hour}:${Min}`)

    //------------------------------Date------------------------------//
    const todayDate = (dateIRL.getDate() < 10) ? `0${dateIRL.getDate()}` : `${dateIRL.getDate()}`;
    const nowDay = document.getElementById('day');
    const nowDate = document.getElementById('date');

    nowDay.textContent =`${week[dateIRL.getDay()]} -`
    nowDate.textContent = ` ${month[dateIRL.getMonth()]}/${todayDate}`;
    
    const tl_currentHour = document.getElementById('current-hour-at');
    const tl_lastHour = document.getElementById('last-hour-at');
    
    (dateIRL.getHours() >= 12) ? tl_currentHour.textContent = `${Hour}PM` : tl_currentHour.textContent = `${Hour}AM`;
    (dateIRL.getHours() + 8 > 23 || dateIRL.getHours() + 8 <= 12) ? tl_lastHour.textContent = `${Hour + 8}AM` : tl_lastHour.textContent = `${Hour + 8}PM`;

// const intervalList = document.querySelectorAll('#interval');
// let interval = dateIRL.getHours() + 1;
// for(i = 0; i < 8; i++){
//         const intervalMeridiem = (interval > 11) ? `PM` : `AM`;
//         const civTime = (interval > 12) ? interval - 12 : interval;
//         intervalList[i].firstChild.textContent = `${civTime}${intervalMeridiem}`; //${intervalMeridiem}
//         interval += 1;
//     }
}

const assessTimeOfDay = (sunrise, sunset, currHour) => {
    switch (true) {
        case sunrise <= currHour && currHour < 12:
            return 'morning';
            break;

        case 12 <= currHour && currHour < 16:
            return 'afternoon';
            break;

        case 16 <= currHour && currHour < sunset:
            return 'evening';
            break;

        case sunset <= currHour && currHour < sunrise:
            return 'night';
            break;

        default:
            return 'afternoon';
            break;
    }
}

                        //---------------------------//
//==||==||==||==||==||==|| Server-Side Communication ||==||==||==||==||==||==//
                        //---------------------------//

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
        
        const { suggestArr: suggest } = apiComm;
        updateHTML(suggest)   
    }
    catch(error) { 
        return error 
    }
    //Server response should be an array of the cities that are generated in the autocomplete
})

const getWeather = async () => {

    const URLparams = {
        unit: apiComm.convention,
        geolocation:[

            apiComm.lat,
            apiComm.long

        ]}

    try {
        const response = await fetch('/weather', {
    
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(URLparams)
    
        })
        const data = await response.json()

        apiComm.nineHour_Info = data.weatherInfo
        displayFields.currentTemp = data.weatherInfo[0].temperature
        displayFields.currentApparent = data.weatherInfo[0].temperatureApparent

        // toggleUnits()

    } catch (error) {
        console.log(error)
    }
    displayHTML()
    getPhoto()
}



const getPhoto = async () => {

    const photoParams = {
        state: displayFields.state,
    }

    try {
        const response = await fetch('/photo', {
    
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(photoParams)
            // SameSite: Lax
    
        })
        const { urlPhoto } = await response.json()
        document.body.style.backgroundImage = `url(${urlPhoto})`;
        console.log(urlPhoto)

    } catch (error) {
        console.log(error)
    }
}

// const dynamicPictures = () => {
//     const pictureParams = {
//         /*
//             Time of day
//             Weather condition
//             locality, state
//         */
//     }
// }

getWeather()
supers.addEventListener('click', toggleUnits);

setInterval(clockTime, 1000);
clockTime();