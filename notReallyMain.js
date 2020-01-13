var request = require('request');
var rpn = require('request-promise-native');
var functions = require('./functions')
    //functions.getTokenFromDatabase().then(resp => console.log(resp))
    //functions.getAccessTokenFromRefresh().then((resp) => console.log(resp));
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
                'Authorization': `Zoho-oauthtoken 1000.d04510c168cd664f2113566a29788d30.0a69a45314e8f52f2b1d1dab46d14a66`,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            json: true,
            resolveWithFullResponse: true
        }
        let res = await rpn(options)
            // if (res.body.code == 0) {
            //     let data = (res.body.customers.length > 0) ? res.body.customers[0] : `data don't exist`;
            //     console.log(data);

        // } else {
        //     console.log(`following error encountered: ${res.data.message} but the request was successful`)
        // }
        return res;

    } catch (err) {
        console.error(err);
    }

}

anExporter.checkForUnpaidInvoices = async function(cid) {
    // let acc = await exporter.getTokenFromDatabase();
    let customer = await anExporter.getCustomerByCompanyId(cid);
    //console.log(customer.body)
    var options = {
            method: 'GET',
            qs: {
                'oauthscope': 'ZohoSubscriptions.invoices.READ',
                'customer_id': customer.body.customers[0].customer_id,
                'filter_by': 'Status.OverDue&Status.'
            },
            url: `https://subscriptions.zoho.com/api/v1/invoices`,
            //console.log(url);
            headers: {
                'X-com-zoho-subscriptions-organizationid': 691418205,
                'Authorization': `Zoho-oauthtoken 1000.d04510c168cd664f2113566a29788d30.0a69a45314e8f52f2b1d1dab46d14a66`,
                'Content-Type': 'application/json'
            },
            json: true,
            resolveWithFullResponse: true
        }
        // if (customer.statusCode != 200) {
        //     console.log(`erroraAAAAaaaaaabbbbbbbbbbbbbbbbbBBBBBBB occoured with statuscode: ${customer.statusCode}`);
        //     return customer;
        // }
    try {
        let res = await rpn(options)
        console.log(res);
        // if (res.statusCode != 200) {
        //     console.log(`error occoured with statuscode: ${res.statusCode}`);
        //     return res;
        // }
        // if (res.body.code == 0) {
        //     console.log(res.body);
        //     return res
        // } else {
        //     console.log(`code : ${res.body.code}`)
        //     console.log(`error: ${res.body.message} but request was succesful`)
        //     return res
        // }
    } catch (err) {
        console.error(err)
    }
}
anExporter.getOnlyRequiredLeadDataByCompanyid = async function(company_id) {
    let acc = await functions.getTokenFromDatabase();
    var options = {
        method: "POST",
        qs: {
            scope: `ZohoCRM.modules.all`
        },
        url: `https://www.zohoapis.com/crm/v2/coql`,
        headers: {
            "X-com-zoho-subscriptions-organizationid": 691418205,
            "Authorization": `Zoho-oauthtoken ${acc.accesstoken}`,
            "Content-Type": "application/json"
        },
        body: {
            select_query: "select Last_Name, First_Name, Full_Name from Leads where Last_Name = 'Underrated'"
        },
        json: true,
        resolveWithFullResponse: true
    }
    try {
        let res = rpn(options);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}
var t = require('./sampleleaddata.json')

functions.pushDataIntoLeads(t);

//anExporter.getOnlyRequiredLeadDataByCompanyid();
//functions.getAccessTokenFromRefresh();
//anExporter.checkForUnpaidInvoices(999999)
//functions.getLeadActivityByCompanyId(98248288);
// anExporter.getCustomerByCompanyId(999999).then((something) => {
//     console.log(something.statusCode);
// })

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