const request = require('request');

const geocodeAddress = (address,callback) => {

    const uri = encodeURIComponent(address);
    
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${uri}`,
        json: true
    },(error,response,body)=>{
        if(error) {
            callback('Unable to connect to the google servers');
        } else if (body.status == 'ZERO_RESULTS') {
            callback('Unable to find that address')
        } else if (body.status === 'OK') {
            const location = body.results[0].geometry.location;
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: location.lat,
                longitude: location.lng 
            });
        }
    
    });

}

module.exports = {
    geocodeAddress
}
