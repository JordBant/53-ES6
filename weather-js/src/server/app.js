const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

require('dotenv').config()
const PORT = (process.env.PORT) ? process.env.PORT : 3000;
const weatherKEY = process.env.tmIO_KEY
const geocodeKEY = process.env.geoKEY

//placeholder values 
const lat = 43
const long = 74

const getWeather = async () => {
    try {
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=imperial&apikey=${weatherKEY}`)
        const weather = response.data;
        console.log(weather.timelines)
    } catch (error) { console.error(error); }
}
getWeather()
// axios.get()
// `https://maps.googleapis.com/maps/api/geocode/json?address=${apiFields.locality},${apiFields.state}&key=MYKEY`);
// `https://api.tomorrow.io/v4/timelines?location=${apiFields.lat},${apiFields.long}&fields=weatherCode&fields=temperatureApparent&fields=windSpeed&fields=temperature&fields=precipitationType&fields=precipitationProbability&fields=visibility&fields=humidity&timesteps=current&units=${apiFields.measureConven}&apikey=MYKEY`);
// app.use(express.static(path.join(__dirname, '../public')))
app.listen(PORT, console.log('Listening on port ' + PORT))