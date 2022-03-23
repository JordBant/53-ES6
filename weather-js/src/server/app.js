const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

require('dotenv').config()
const PORT = (process.env.PORT) ? process.env.PORT : 5500;
const weatherKEY = process.env.tmIO_KEY
const geocodeKEY = process.env.geoKEY

//placeholder values 
const lat = 43
const long = 74

//to be fetched upon input into search
const userInputPlace = 'Bronx'

app.get('/place', (req, res) =>{
    const geocode = async () => {
        try {
            const response = await axios.get(`
            https://api.mapbox.com/geocoding/v5/mapbox.places/${userInputPlace}.json?country=us&limit=9&types=locality%2Cplace%2Cneighborhood%2Cdistrict&language=en&access_token=${geocodeKEY}
            `);
            const placeInfo = response.features;
            res.json(placeInfo)
        } catch (error) { console.error(error); }
    }
    geocode()
})

// app.use(express.static(path.join(__dirname, '../public')))
app.listen(PORT, console.log('Listening on port ' + PORT))