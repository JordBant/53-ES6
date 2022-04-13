//----------------------------()--------------------------------
const supers = document.getElementById('supers');
const searchBar = document.getElementById('search'); 
const loc_List = document.getElementById('locations-dropdown')
const city = document.getElementById('location')

const intervals = document.querySelectorAll('#info-at')

const oldChildren = loc_List.children;
//----------------------------Clock--------------------------------
const dateIRL = new Date();
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

const ArrangeNodeList = ([...nodeList], [index, numberOf]) => {
    //nodeList will be an array of spreaded elements 
    const nodeArr = [...nodeList]
    
    //change the nodeArr[0] from an array of size 1 to whatever the value of that index is
    const firstPosition = nodeArr.splice(index, numberOf)
    const indexInfo = firstPosition[0]
    nodeArr.unshift(indexInfo)

    return nodeArr
}

const displayHTML = () => {
    const elementArr = ArrangeNodeList(intervals, [7, 1])
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
    console.log('Element Arr:', elementArr)    
    console.log('Object Array:', nineHour)

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
            const cityNameArr = choice.split(',')
            displayFields.locality = cityNameArr[0]
            displayFields.state = cityNameArr[1]

            const temp = placesArr.find(place => place.matchedPlace === choice)

            displayFields.lat = temp.coord[1]
            displayFields.long = temp.coord[0]
            console.log('Coords: ' + displayFields.lat +' '+ displayFields.long)

            getWeather();
        })
    }  
}

// const toggleUnits = () => {
//     const Fahr = document.getElementById('Fahr');
//     const Cels = document.getElementById('Cels');
    
//     if (Fahr.classList.contains('selected') || Cels.classList.contains('selected')){
//         Fahr.classList.toggle('selected');
//         Fahr.classList.toggle('unselected');
//         Cels.classList.toggle('selected');
//         Cels.classList.toggle('unselected');
//     }  
//     return apiComm.convention = (Fahr.classList.contains('selected')) ? 'imperial' : 'metric';
// }   

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

clockTime();
setInterval(clockTime, 1000);

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
        
        const {suggestArr: suggest, placesArr: locInfo } = apiComm;
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
    // getWeather()
}  

getWeather()
// supers.addEventListener('click', toggleUnits);

//The user should 