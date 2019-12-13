var exports = module.exports = {};
var access_token = '1000.8f40e35583232dde282d02a85d40424a.d20e04c42df86f53c407bf7885ec0fa2';
var auth = "Zoho-oauthtoken " + access_token;
var orgId = "60003093314";
const axios = require('axios');
var header = {
    "X-com-zoho-subscriptions-organizationid": orgId,
    "Authorization": auth,
    "Content-Type": "application/json"
}
var codeScope = require('./codescope.js');
var apiData = require('./apiData.json');

function getUrl(scope) {


    var tsturl = apiData.subscriptions.baseUrl;

    url = tsturl + 'oauthscope=' + scope;
    url = url.replace(/\r?\n|\r/g, '');
    return url;
}
// console.log(apiData.subscriptions.details);
// var x = getUrl(codeScope.scope.subscriptions.create);
// console.log(x);

async function createSub(scope, data) {
    console.log("New Subscription creation request starting ")
    var suburl = getUrl(scope);
    try {
        let res = await axios.post(suburl, data, { headers: header })
        console.log(`status code : ${res.status}`);
        console.log(`data is : ${res.data}`);
    } catch (err) { console.error(err) }
}



createSub(codeScope.scope.subscriptions.create);