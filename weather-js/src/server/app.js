const axios = require('axios')
const path = require('path')

const express = require('express')
const app = express()

const myCurrPath = path.join(__dirname, '../public')
app.use(express.static(myCurrPath))
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

require('dotenv').config()
const PORT = 5500;
const weatherKEY = process.env.tmIO_KEY;
const geocodeKEY = process.env.geoKEY;

//placeholder values 
const weatherAppParams = {
    lat: 43,
    long: 74,
    unit: 'imperial'
}

const weatherAPI = { 
    weatherInfo: [] 
}

const placesAPI = { 
    placeData: [] 
}

app.post('/input', (req, res) =>{
    const search = req.body.input

    const geocode = async () => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=us&limit=8&types=postcode%2Clocality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}`);
            const locations = response.data.features;

            placesAPI.placeData = locations.map(location => {
                return {
                    matchedPlace: location.place_name,
                    coord: location.center
                }
            })

        } catch (error) {
            console.error(error);
        }
        res.json(placesAPI)
        console.error('Places Sent');
    }
    geocode();
})

app.post('/weather', (req, res) => {
    const coords = req.body.geolocation
    weatherAppParams.unit = req.body.unit

    weatherAppParams.lat = coords[0]
    weatherAppParams.long = coords[1]
    const {lat, long, unit} = weatherAppParams

    const getWeather = async () => {
        try {
            const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=1h&units=${unit}&apikey=${weatherKEY}`)
            const intervalArr = response.data.data.timelines[0].intervals

            for(let i = 0; i < 9; i++){
                weatherAPI.weatherInfo[i] = intervalArr[i].values
            }

        } catch (error) { 
            console.log(error) 
        } 
        res.json(weatherAPI)
        console.error('Weather Sent');
    }
    getWeather()
})

app.listen(PORT, console.log('Listening on port ' + PORT));