const request = require('request');

const getWeather = (lat,lng,callback) => {
    
    request({
        url: `https://api.darksky.net/forecast/b3a9153cba8509dd4ee11e384bf037f7/${lat},${lng}`,
        json: true
    },(error,response,body)=> {
        if(error) {
            callback('Sorry. An error occured while connecting to the server.' );
        } else if (body.code  == 400) {
            callback('latitude and longitude is invalid')
        } else {
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
     });
}
module.exports.getWeather = getWeather;