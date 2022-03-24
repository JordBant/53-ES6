const express = require('express')
const app = express()
const axios = require('axios')
// const path = require('path')

require('dotenv').config()
const PORT = 3000;
// const weatherKEY = process.env.tmIO_KEY
const geocodeKEY = process.env.geoKEY

//placeholder values 
const lat = 43
const long = 74
const unit = 'imperial'

const placeOBJ = {
    autocomplete:[],
    chosenPlace: '',



/*------------------------------------------------
Coordinates are only to be rewritten & retrieved 
when "chosenPlace" is parameterized to 

    lat: 70,
    long: 40
--------------------------------------------------*/
}

const processUIData = () =>{
    autocomplete.find(choice => choice )
}

app.get('/place', (req,res) =>{
        const geocode = async () => {
            try {
                const response = await axios.get(`
                https://api.mapbox.com/geocoding/v5/mapbox.places/Zion.json?country=us&limit=9&types=postcode%2Clocality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}
                `)
                const locations = response.data.features;
                const placeNames = locations.map(location => location.place_name);
    
                // res.json(placeNames)
                // console.log(locations)
            } catch (error) { console.error(error); }
        }
        geocode()
    })

// app.get('/', (req,res) =>{
//     const getWeather = async () => {
//         try {
//             const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${unit}&apikey=${weatherKEY}`)
//             const weather = response.data.data;
//             res.json(weather)
//             console.log(weather)
//         } catch (error) { console.error(error); }
//     }
//     getWeather()
// })

// app.use(express.static(path.join(__dirname, '../public')))
app.listen(PORT, console.log('Listening on port ' + PORT))