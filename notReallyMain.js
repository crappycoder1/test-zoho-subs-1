var request = require('request');
var rpn = require('request-promise-native');
var anExporter = function() {};
// FUNCTION TO GET CUSTOMER details USING COMPANY ID 
anExporter.getCustomerByCompanyId = async function(cid) {
    // let acc = await getTokenFromDatabase();
    // console.log(acc.accesstoken);
    try {
        var options = {
            method: 'GET',
            qs: {
                'custom_field_1788180000000071402_start': cid,
                'custom_field_1788180000000071402_end': cid
            },
            url: `https://subscriptions.zoho.com/api/v1/customers`,
            //console.log(url);
            headers: {
                'X-com-zoho-subscriptions-organizationid': 691418205,
                'Authorization': `Zoho-oauthtoken 1000.849be54bd9d809cc95f6986edf608aa8.36ace1d58213da60426db089a23a6c5e`,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            json: true,
            resolveWithFullResponse: true
        }
        let res = await rpn(options)
        if (res.body.code == 0) {
            let data = (res.body.customers.length > 0) ? res.body.customers[0] : `data don't exist`;
            console.log(data);
            return data;
        } else {
            console.log(`following error encountered: ${res.data.message} but the request was successful`)
            return res.data.message;
        }

    } catch (err) {
        console.error(err);
    }

}

module.exports = anExporter;
























// var options = {
//     method: 'GET',
//     uri: 'https://my-json-server.typicode.com/typicode/demo/db',
//     // qs: {
//     //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
//     // },
//     headers: {
//         'User-Agent': 'Request-Promise'
//     },
//     //json: true, // Automatically parses the JSON string in the response
//     resolveWithFullResponse: true
// };


// async function abc() {
//     let res = await rpn(options)
//     console.log(res);
// }
// abc();