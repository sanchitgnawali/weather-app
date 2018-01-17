const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
    a: {
        alias: 'address',
        describe: 'valid adress',
        demand: true,
        string: true
    }
})
.help()
.alias('help','h')
.argv;

const address = argv.a;

const uri = encodeURIComponent(address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${uri}`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('no such address was found');
    }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/b3a9153cba8509dd4ee11e384bf037f7/${lat},${lng}`;
    
        console.log(response.data.results[0].formatted_address);

        return axios.get(weatherUrl);
    
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`The current temperature is ${temperature} and feels like ${apparentTemperature}`)
})
.catch((error)=>{
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to the servers.')
    } else {
        console.log(error.message);
    }
}); 