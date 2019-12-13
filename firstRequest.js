var exports = module.exports = {};
const getUrlforAR = require('./getUrlForAR.js');
const codeScope = require('./codescope.js');
var requiredScope = codeScope.scope.subscriptions.full;
const requiredCode = codeScope.code;
//console.log(requiredCode);
const Url = getUrlforAR.giveUrlForAR(requiredCode, requiredScope);
//console.log("The url is " + Url);
const axios = require('axios');

function postToGetToken(Url, callback) {

    console.log('The POST request to get auth, refresh token is being executed! ');
    axios.post(Url, {})
        .then((res) => {
            // console.log(`statusCode: ${res.status}`)
            //console.log(res.data);
            if (res.data.refresh_token && res.data.access_token)
                callback(null, res.data);
            else
                callback(res.data.error, null);
        })
        .catch((error) => {
            console.error(error);
        })
}

// exports.firstPostReq = function(outercb) {
//     var tokenObj = postToGetToken(Url, function(err, data) {
//         if (err) {
//             console.log('Some Error ' + err);
//             const tokenObj = {

//                 "refresh": '',
//                 "access": ''
//             };
//             // console.log(tokenObj);
//             outercb(data.error, tokenObj);
//         } else {
//             //console.log(data);
//             // console.log('Refresh token is ' + ref + 'Access token is ' + acc)
//             const tokenObj = {

//                 "refresh": data.access_token,
//                 "access": data.refresh_token
//             };
//             // console.log(tokenObj);
//             outercb(null, tokenObj);
//         }

//     });
//     // if (tokenObj.error === 0)
//     //console.log(tokenObj);
// }

function firstPostReq(outercb) {
    postToGetToken(Url, function(err, data) {
        if (err) {
            console.log('Some Error ' + err);
            const tokenObj = {

                "refresh": '',
                "access": ''
            };
            // console.log(tokenObj);
            outercb(data.error, tokenObj);
        } else {
            //console.log(data);
            // console.log('Refresh token is ' + ref + 'Access token is ' + acc)
            const tokenObj = {

                "refresh": data.access_token,
                "access": data.refresh_token
            };
            // console.log(tokenObj);
            outercb(null, tokenObj);
        }

    });
    // if (tokenObj.error === 0)
    //console.log(tokenObj);
}
firstPostReq(function(err, die) {
    if (err) { console.log(err) }
    console.log(die)
})