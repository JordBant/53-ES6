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

const forClient = { placeData: [] };

app.post('/input', (req, res) =>{
    const search = req.body.input

    const geocode = async () => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=us&limit=8&types=postcode%2Clocality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}`);
            const locations = response.data.features;

            forClient.placeData = locations.map(location => {
                return {
                    matchedPlace: location.place_name,
                    coord: location.center
                }
            });

        } catch (error) {
            console.error(error);
        }
        res.json(forClient)
        // console.log(forClient)
    }
    geocode();
})

app.post('/weather', (req, res) => {
    const coords = req.body.geolocation

    weatherAppParams.lat = coords[0]
    weatherAppParams.long = coords[1]
    const {lat, long} = weatherAppParams

    console.log(`Server Wants: ${lat} ${long}`)

    //Holds Tomorrow.io Request Object
    const tempObj = { weatherObject: '' }

    const getWeather = async () => {
        try {
            console.log(`Server Got: ${lat} ${long}`)

            const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${weatherAppParams.unit}&apikey=${weatherKEY}`)
            tempObj.weatherObj = response.data.data.timelines

            res.json('Hello')
            console.log(tempObj)

        } catch (error) { console.error(error) }
    }
    
    // const { weatherObject: weather } = tempObj

    getWeather()
})

app.listen(PORT, console.log('Listening on port ' + PORT));