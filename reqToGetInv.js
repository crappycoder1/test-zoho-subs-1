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
var apiData = require('./apiData.json');

function getSpecificUrl(idfic_id, scope) {
    var tsturl = apiData.invoices.baseUrl;

    url = tsturl + '' + idfic_id + '?oauthscope=' + scope;
    url = url.replace(/\r?\n|\r/g, '');
    return url;
}
//console.log(apiData.subscriptions.details);
// var x = getSpecificUrl('123456789', codeScope.scope.invoices.read);
// console.log(x);

async function readInv(id, scope) {
    console.log("New invoice retrieval request starting ")
    var suburl = getSpecificUrl(id, scope);
    try {
        let res = await axios.get(suburl, { headers: header })
        console.log(`status code : ${res.status}`);
        console.log(res.data);
    } catch (err) { console.error(err); }
}
async function readAllInv(scope) {
    console.log("New invoice retrieval request for all Invoices starting ")
    var suburl = 'https://subscriptions.zoho.in/api/v1/invoices?filter_by=Status.All';
    try {
        let res = await axios.get(suburl, { headers: header })
        console.log(`status code : ${res.status}`);
        console.log(`The message is: ${res.data.message} `)
        res.data.invoices.forEach(element => {
            console.log(element.invoice_id);
        });
    } catch (err) { console.error(err); }
}
async function readInvCustId(custId) {

    var suburl = 'https://subscriptions.zoho.in/api/v1/invoices?filter_by=Status.All&customer_id=' + custId;
    try {
        let res = await axios.get(suburl, { headers: header })
        console.log(`New invoice retrieval request for specific Invoices of customer id ${custId} starting `)
        console.log(`status code : ${res.status}`);
        if (res.data.invoices.length != 0) { //console.log(`The invoice id is: ${res.data.invoices[0].invoice_id} `)
            console.log(res.data.invoices)
        } else {
            console.log(`Invoice doesn't exist`)
        }
        /*res.data.invoices.forEach(element => {
            console.log(element.invoice_id);
        });*/
    } catch (err) { console.error(err); }
}
async function readInvSubId(subId) {

    var suburl = 'https://subscriptions.zoho.in/api/v1/invoices?filter_by=Status.All&subscription_id=' + subId;
    try {
        let res = await axios.get(suburl, { headers: header })
        console.log(`New invoice retrieval request for specific Invoices of subscription id ${subId} starting `)
        console.log(`status code : ${res.status}`);
        if (res.data.invoices.length != 0) { //console.log(`The invoice id is: ${res.data.invoices[0].invoice_id} `)
            console.log(res.data.invoices)
        } else {
            console.log(`Invoice doesn't exist`)
        }
        /*res.data.invoices.forEach(element => {
            console.log(element.invoice_id);
        });*/
    } catch (err) { console.error(err); }
}
async function readInvSubIdLatest(subId) {

    var suburl = 'https://subscriptions.zoho.in/api/v1/invoices?filter_by=Status.All&subscription_id=' + subId;
    try {
        let res = await axios.get(suburl, { headers: header })
        console.log(`New invoice retrieval request for latest Invoices of Subscription id ${subId} starting `)
        console.log(`status code : ${res.status}`);
        if (res.data.invoices.length != 0) { //console.log(`The invoice id is: ${res.data.invoices[0].invoice_id} `)
            length = res.data.invoices.length;
            console.log(res.data.invoices[length - 1])
        } else {
            console.log(`Invoice doesn't exist`)
        }
        /*res.data.invoices.forEach(element => {
            console.log(element.invoice_id);
        });*/
    } catch (err) { console.error(err); }
}
exports.readInv = readInv;
exports.readAllInv = readAllInv;
exports.readInvCustId = readInvCustId;
exports.readInvSubId = readInvSubId;
exports.readInvSubIdLatest = readInvSubIdLatest;
//readAllInv(codeScope.scope.invoices.read);
//readInv('217455000000007605', codeScope.scope.invoices.read);