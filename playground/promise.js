// var somePromise = new Promise((resolve,reject)=> {
//    setTimeout(()=>{
//     // resolve('hey it worked');
//     reject('Unable to fetch data from the internet');
//    },3000);
// });

// somePromise.then((message)=>{
//     console.log('Success: ',message);
// },(errorMessage)=>{
//     console.log('Error: ',errorMessage);a
// })

const asyncAdd = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=> {
            if(typeof a === 'number' && typeof b ==='number') {
                resolve(a+b);
            } else {
                reject("Error: Unable to add two non numbers");
            }
        },1500);
    })
}

asyncAdd(3,8).then((result)=>{
    console.log('the sum is ',result);
    return asyncAdd(result,'9');
},(errorMessage)=>{
    console.log(errorMessage);
}).then((res)=>{
    console.log('Should be 20 ',res);
},(errMessage)=>{
    console.log('Error: ',errMessage);
});

