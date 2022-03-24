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

// const placeOBJ = {

// }

//to be fetched upon input into search
const userInputPlace = 'Zion'

// app.get('/', (req, res) =>{
//     const geocode = async () => {
//         try {
//             const response = await axios.get(`
//             https://api.mapbox.com/geocoding/v5/mapbox.places/${userInputPlace}.json?country=us&limit=9&types=locality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}
//             `);
//             console.log(response.query)
//         } catch (error) { 
//             console.error(error); 
//         }
//     }
//     geocode()
// })

app.get('/', (req,res) =>{
        const geocode = async () => {
            try {
                const response = await axios.get(`
                https://api.mapbox.com/geocoding/v5/mapbox.places/${userInputPlace}.json?country=us&limit=9&proximity=ip&types=locality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}
                `)
                const location = response.features;
                res.json(location)
                console.log(location)
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