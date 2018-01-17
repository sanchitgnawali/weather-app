var request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve,reject)=>{
        const uri = encodeURIComponent(address);
        
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${uri}`,
            json: true
        },(error,response,body)=>{
            if(error) {
                reject('Unable to connect to the google servers');
            } else if (body.status == 'ZERO_RESULTS') {
                reject('Unable to find that address')
            } else if (body.status === 'OK') {
                const location = body.results[0].geometry.location;
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: location.lat,
                    longitude: location.lng 
                });
            }
        
        });
    });
}

geocodeAddress('77063').then((result)=>{
    console.log('The address is :',JSON.stringify(result,undefined,2));
},(errorMessage)=> {
    console.log(errorMessage);
});

