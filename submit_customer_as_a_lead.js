let grantCode = '1000.65a52f3183b5ea58d7a7ec6c8f8e4310.3ef12e704ff55bacd817475b802cc590';
let user_identifier = 'jaydev@smartsense.co.in';
let data = require('./sampleleaddata.json')
    // data = JSON.parse(data);
var crmclient = require('zcrmsdk');
var input = {};
// let d = {
//     "data": []
// };
// d.data[0] = data.data[1];
// input.module = 'leads';
// input.body = d;
crmclient.initialize();
//console.log(input.body)
// FUNCTION TO GENERATE AUTH TOKEN FOR THE FIRST TIME BELOW
// crmclient.generateAuthTokens(user_identifier, grantCode).then(function(auth_response) {
//     console.log("access token :" + auth_response.access_token);
//     console.log("refresh token :" + auth_response.refresh_token);
//     console.log("expires in :" + auth_response.expires_in);
// });

// FUNCTION TO GET VALUES OF ACCESS AND REFRESH TOKEN BELOW
// crmclient.getTokenFromDatabase().then((res) => { console.log(res[0]) });

// FUNC TO GET ACCESS TOKEN FROM REFRESH TOKEN
// crmclient.getTokenFromDatabase().then((res) => {
//     console.log(`refresh token is ${res[0].refreshtoken}`)
//     ref = res[0].refreshtoken;
//     crmclient.generateAuthTokenfromRefreshToken(user_identifier, ref).then(function(auth_response) {
//         console.log("access token :" + auth_response.access_token);
//         console.log("refresh token :" + auth_response.refresh_token);
//         console.log("expires in :" + auth_response.expires_in);
//     });
// });


// FUNCTION TO PUSH SOME DATA INTO LEADS
// crmclient.API.MODULES.post(input).then(function(response) {
//     if (response.statusCode !== 201) {
//         console.log(response.body);
//         console.log("status code is " + response.statusCode);
//     }

//     response = JSON.parse(response.body);
//     response = response.data;
//     console.log(response);
// });

// FUNCTION TO CONVERT A LEAD.
input.id = '3756897000001142002';
input.body = JSON.parse("{\"data\": [{\"overwrite\": true} ] }");
crmclient.API.ACTIONS.convert(input).then(function(response) {
    console.log(response.body);
    console.log("status code is " + response.statusCode);
    // response = JSON.parse(response.body);
    // response = response.data;
    // console.log(response);
});