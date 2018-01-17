const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//callback function
geocode.geocodeAddress(address,(error,results)=>{
    if(error) {
        console.log(error)
    } else {
        console.log(`The current address is ${results.address}`);
        weather.getWeather(results.latitude,results.longitude,(errorMessage, result)=> {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`it's currently ${result.temperature} and feels like ${result.apparentTemperature}`)
            }
        });
    }
});

console.log('please wait...');
