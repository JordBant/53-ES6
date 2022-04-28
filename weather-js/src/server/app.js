const axios = require('axios')
const path = require('path')
const fs = require('fs');

const express = require('express')
const app = express()

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

require('dotenv').config()
const PORT = 5500;
const weatherKEY = process.env.tmIO_KEY;
const geocodeKEY = process.env.geoKEY;
const photoKEY = process.env.photoKEY;

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

//------------------//---------Routes---------//------------------//

app.post('/input', (req, res) =>{
    const search = req.body.input

    const geocode = async () => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=us&limit=8&types=postcode%2Cregion%2Clocality%2Cplace&language=en&access_token=${geocodeKEY}`);
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
        // console.log('Places Sent');
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
            console.log('error') 
        } 
        res.json(weatherAPI)
        console.log('Weather Sent');
    }
    getWeather()
})

app.post('/photo', (req, res) => {
    const photo = { urlPhoto:'' }
    const { state } = req.body;

    const getPhoto = async() => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/random?query=${state}&client_id=${photoKEY}`);
            photo.urlPhoto = response.data.urls.regular;
        } catch (error) {
            console.log(error);
        }
        res.json(photo);
        // console.log(photo.urlPhoto);
    }
    getPhoto();
})


app.post('/code', (req, res) => {
    const { currCondition: unaltered } = req.body;
    const condition = unaltered.replace(/\s+/g, '').toLowerCase();

    const resObj = {
        iconPath:''
    };

    const getIconFile = async () => {
        try {
            const myCurrPath = 'conditions_icon/'
            const files = await fs.promises.readdir(myCurrPath);
            const svgFile = files.find(file => file.split('.',1).toString().toLowerCase() === condition)
            resObj.iconPath = path.join(myCurrPath, svgFile)

            console.log('File Path:  ', resObj.iconPath)
            console.log('Current Condition: ', condition);
       
          } catch (error){
              console.log(error);
          }
          console.log('Path to read file at: ', resObj.iconPath)
        //   res.json(resObj);
    }
    getIconFile();
})



app.listen(PORT, console.log('Listening on port ' + PORT));