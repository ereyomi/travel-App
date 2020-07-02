const path = require('path')
const express = require('express')

//use fetch for external api
const fetch = require( 'node-fetch' )
//const Promise = require("promises")
//dot env
const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env.API_KEY)
//OR process.env['your key']

const app = express()

/* Dependences */
const bodyParser = require( 'body-parser' )

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require( 'cors' )
app.use( cors() );


app.use(express.static('dist'))
//console.log(__dirname)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
});

// designates what port the app will listen to for incoming requests

app.listen( process.env.PORT || 8081, () => {
    console.log('app listening on port 8081!')
} )

/* global keys */
const weatherApiKey = process.env.WEATHER_BIT_API_KEY 
const pixabayApiKey = process.env.PIXABAY_API_KEY
const geonamesUsername = process.env.GEONAMES_USERNAME

const getCoordinate = ( location, geoname = '' ) => {

    geoname ? geoname : ( geoname = geonamesUsername )
    const coordinateApi = `http://api.geonames.org/searchJSON?q=${ location }&maxRows=1&username=${ geoname }`;
    return new Promise( async ( resolve, reject ) => {
        
        
        
        try {
            const fetchData = await fetch( coordinateApi )
            const data = await fetchData.json()
            resolve( data )
        } catch (error) {
            reject ( error )
        }
    })
}
const getWeather = async ({ date, oneDay, diff, lat, lng }) => {
    return new Promise( async ( resolve, reject ) => {
       

        const Api = `https://api.weatherbit.io/v2.0/history/daily?lat=${ lat }&lon=${ lng }&`
        
         let url = '';
        if (diff < 0) {
            url = `${Api}start_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}&end_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
        } else if (diff > oneDay * 15) {
            url = `${Api}start_date=2019-${date.getMonth()+1}-${date.getDate()}&end_date=2019-${date.getMonth()+1}-${date.getDate()+1}`
        } else {
            url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${ lat }&lon=${ lng }`
        } 
        try
        {
            const ddd = await fetch( `${ url }&key=${ weatherApiKey }` );
            const res = await ddd.json();

           
            resolve( res )
        } catch ( error )
        {
            reject("No forecast for this city", error)
        }

    }) 
    
}

const getPix = async ( req, res ) => {

    const { location, countryName } = req.body


    new Promise( async ( resolve, reject ) => {

        const city = location.replace(/\s/g, '+')
        const country = countryName.replace( /\s/g, '+' )
        
        // fetch data from the Pixabay API passing in the destination city
        const pixabayApiWithKey = `https://pixabay.com/api/?key=${pixabayApiKey}`
        const pixabayCityApi = `${pixabayApiWithKey}&q=${city}&image_type=photo`
        const pixabayCountryApi = `${pixabayApiWithKey}&q=${country}&image_type=photo`
    
        try
        {
            
            const fetchData = await fetch(pixabayCityApi);
            let data = await fetchData.json();

            if (data.totalHits > 0) {
                 resolve ( data )
            } else {
                
            // Fetch data passing in the destination country if city doesn't return a result
            
                let response = await fetch(pixabayCountryApi);
                try {
                    let data = await response.json();
                    if (data.totalHits > 0) {
                        resolve ( data )
                    } else {
                        resolve ( {"use_placeholder": true} )
                    }
                } catch(error) {
                reject (error)
                }
            }  
        } catch(error) {
            reject (error);
        }
    })
    .then(data => res.send(data))
}

const getCountryDetails = async ( { countryCode } ) => {
    
    //const restcountriesApiByName = `https://restcountries.eu/rest/v2/name/${country}`

    return new Promise( async ( resolve, reject ) => {

        const restcountriesApiByCountryCode = `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    
        try {
            const fetchData = await fetch( restcountriesApiByCountryCode )
            const data = await fetchData.json()
            resolve (data)
        } catch (error) {
            reject (error)
        }
    })
}

const getData = ( req, res ) => {

    const { location, departureDate } = req.body
    //get offset in order to show correct value despite of timezone
    const now = new Date()
    const timeOffset = now.getTimezoneOffset() * 60000
    

     const date = new Date(departureDate)
    const getDepartDateTime = date.getTime()
    const dateNow = new Date().setHours(0,0,0,0)
    const oneDay = 60 * 60 * 1000 * 24
    const diff = getDepartDateTime - dateNow + timeOffset
     const days = diff/1000/60/60/24
    
    let dataToSend = {
        location,
        departureDate,
        timeOffset,
        date,
        diff,
        oneDay,
        days
    }
    getCoordinate( location )
            .then( data => {
                dataToSend = {
                    ...dataToSend,
                    ...data.geonames[ 0 ]
                } 
               return getWeather( dataToSend )
            } )
            .then( data => {
                if (days < 16 && days > 0) {
                    dataToSend = {
                        ...dataToSend,
                        ...data.data[days]
                    }
                } else {
                    dataToSend = {
                        ...dataToSend,
                        ...data.data[0]
                    }
                }
                
                return getCountryDetails( dataToSend )  
                    
            } )
             .then( countryDetails => {
                    const { flag, currencies, population } = countryDetails
                    dataToSend = {
                        ...dataToSend,
                        country: {
                            currencies,
                            population,
                            flag,
                        }
                    } 
                 res.send(dataToSend)
                
             } )
            
             .catch(error => res.send(error)) 
           
            
}

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('../../', 'dist/index.html'))
    //res.sendFile(path.resolve('../../', 'src/client/views/index.html'))
})

app.post( '/api/getData', getData )

app.post( '/api/getImage', getPix )






//module.exports = app

exports.getCoordinate = getCoordinate