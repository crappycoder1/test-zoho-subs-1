var exports = module.exports = {};
const getUrlforAcc = require('./getUrlForAcc.js');
const codeScope = require('./codescope.js');
var respose;
//var requiredScope = '';
const requiredCode = codeScope.refresh_token;
//console.log(requiredCode);
const Url = getUrlforAcc.giveUrlForAcc(requiredCode);
//console.log("The url is " + Url);
const axios = require('axios');

function postToGetToken(Url, callback) {

    console.log('The POST request to get only the access token is being executed! ');
    axios.post(Url, {})
        .then((res) => {
            // console.log(`statusCode: ${res.status}`)
            //console.log(res.data);
            if (res.data.access_token)
                callback(null, res.data);
            else
                callback(res.data.error, null);
        })
        .catch((error) => {
            console.error(error);
        })
}
//postToGetToken(Url);
var gdata;

function refPostReq() {

    postToGetToken(Url,
        function(err, data) {
            if (err) {
                console.log(err);
                const tokenObj = {
                    "access": ''
                };
                console.log(tokenObj);
                //outercb(data.error, tokenObj);
            } else {
                gdata = data;
                console.log(gdata);
            }

        }
    );
    // if (tokenObj.error === 0)
    //console.log(tokenObj);
}
//refPostReq();