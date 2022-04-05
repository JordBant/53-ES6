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
const lat = 43;
const long = 74;
const unit = 'imperial';

const forClient = { placeData: [] };

app.post('/input', (req, res) =>{
    const search = req.body.input
    console.log('server reads: ' + search)

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
        console.log(forClient)
    }
    geocode();
})

app.post('/weather', (req, res) => {
    const coordinates = req.body.geolocation
    const getWeather = async () => {
        try {
            const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${unit}&apikey=${weatherKEY}`)
            
        } catch (error) { console.error(error); }
    }
    getWeather()
})

app.listen(PORT, console.log('Listening on port ' + PORT));