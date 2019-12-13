var exports = module.exports = {};
var access_token = '1000.b4dcb217681eed4479e947ad863f0609.01d8c8aa03976400efb083d6c8f08659';
var auth = "Zoho-oauthtoken " + access_token;
var orgId = "60003093314";
const axios = require('axios');
var header = {
    "X-com-zoho-subscriptions-organizationid": orgId,
    "Authorization": auth,
    "Content-Type": "application/json"
}
var codeScope = require('./codescope.js');
const apiData = require('./apiData.json');
const subscriptions = require('./subscriptions.json')
    // console.log(apiData.subscriptions.details);
    // var x = getUrl(codeScope.scope.subscriptions.create);
    // console.log(x);

async function changeQty(subId, newQty) {
    const data = subscriptions.subscriptions;
    const needed = data.filter(e => e.subscription_id == subId);
    console.log(needed);
    if (needed.length) {
        let data = {
            "plan": {
                "plan_code": needed.plan_code,
                "quantity": newQty
            }
        }
        console.log("Update Quantity request starting for User with subscription id" + subId)
        var suburl = 'https://subscriptions.zoho.in/api/v1/subscriptions/' + subId;
        try {
            let res = await axios.put(suburl, data, { headers: header })
            console.log(`status code : ${res.status}`);
            console.log(`plan qty is : ${res.data.subscription.plan.quantity}`);
        } catch (err) { console.error(err) }
    } else
        console.log('error subscription does not exist')
}
//changeQty('217455000000007520', '19');
// const data = subscriptions.subscriptions;
// const needed = data.filter(element => element.customer_name == 'Miss Veena Malik');
// console.log(needed);