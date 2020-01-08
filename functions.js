// let grantCode = '';
// const user_identifier = 'jaydev@smartsense.co.in';

const idforcompanyidfield = 1788180000000071402;
let data = require('./sampleleaddata.json')
const querystring = require('querystring');
const http = require('https');
const rpn = require('request-promise-native');
var crmclient = require('zcrmsdk');
var exporter = function() {}
crmclient.initialize();
// getAccessTokenFromRefresh();
// console.log(input.body)

//FUNCTION TO GENERATE AUTH TOKEN FOR THE FIRST TIME BELOW
exporter.generateAuthToken = async function(user_identifier, grantCode) {
    return crmclient.generateAuthTokens(user_identifier, grantCode).then(function(auth_response) {
        console.log("access token :" + auth_response.access_token);
        console.log("refresh token :" + auth_response.refresh_token);
        console.log("expires in :" + auth_response.expires_in);
    });
}

// FUNCTION TO GET VALUES OF ACCESS AND REFRESH TOKEN BELOW
exporter.getTokenFromDatabase = async function() {
        let result = await crmclient.getTokenFromDatabase();
        //console.log(result);
        return result;
    }
    //getTokenFromDatabase();
    // FUNC TO GET ACCESS TOKEN FROM REFRESH TOKEN
exporter.getAccessTokenFromRefresh = async function() {
        let ref = await exporter.getTokenFromDatabase();
        let auth_response = await crmclient.generateAuthTokenfromRefreshToken(this.user_identifier, ref.refreshtoken)

        console.log("access token :" + auth_response.access_token);
        console.log("refresh token :" + auth_response.refresh_token);
        console.log("expires in :" + auth_response.expires_in);

        return auth_response.access_token;
    }
    //getAccessTokenFromRefresh();
    //setInterval(getAccessTokenFromRefresh(), 1000*60*55);

// FUNCTION TO PUSH SOME DATA INTO LEADS
exporter.pushDataIntoLeads = async function(data, callback) {
        var input = {};
        input.module = `Leads`;
        input.body = data;
        let response = await crmclient.API.MODULES.post(input);
        let res = JSON.parse(response.body)
            //console.log(response.statusCode);
        if ((response.statusCode == 200) || (response.statusCode == 201)) {
            //console.log(response.body);
            return res.data
        } else {
            console.log("error occured status code is " + response.statusCode);
            console.log(response.body)
            return response.body
        }
    }
    //pushDataIntoLeads(data);


// FUNCTION TO CONVERT A LEAD BY RECORD ID.
exporter.convertLeadByRecordId = async function(id) {
    var input = {};
    input.id = id;
    input.body = JSON.parse("{\"data\": [ {\"overwrite\": true} ] }");
    let response = await crmclient.API.ACTIONS.convert(input)
    let res = JSON.parse(response.body)
        // console.log(response.statusCode);
    if ((response.statusCode == 200) || (response.statusCode == 201)) {
        console.log(res.data[0]);
        return res.data[0];
    } else {
        console.log("error occured status code is " + response.statusCode);
        console.log(response.body)
        return response.body;
    }
}


// FUNCTION TO GET A LEAD BY COMPANY ID
exporter.getLeadByCompanyId = async function(id) {
        var params = {};
        params.criteria = `(Company_id:equals:${id})`;

        var input = {};
        input.module = 'Leads';
        input.params = params;

        try {
            let response = await crmclient.API.MODULES.search(input);
            if (response.statusCode == 200) {
                response_data = JSON.parse(response.body).data;
                console.log(response_data);
            } else {
                resp = JSON.parse(response)
                console.log(response);
                /* 
                        FOR FURTHER CHECKING WHAT ERROR (IN FUTURE)
                */
            }
            return response;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
    //getLeadByCompanyId(1050204030);

// FUNCTION TO GET A RECORD-ID BY COMPANY ID
exporter.getRecIdByCompanyId = async function(id) {
        var params = {};
        params.criteria = `(Company_id:equals:${id})`;

        var input = {};
        input.module = 'Leads';
        input.params = params;
        try {
            let response = await crmclient.API.MODULES.search(input);

            if (response.statusCode == 200) {
                response_data = JSON.parse(response.body).data[0].id;
                console.log(response_data);
                return response_data;
            } else {
                let resp = JSON.parse(response)
                console.log(response);
                // console.log(resp.status_code,resp.message);
                /* 
                        FOR FURTHER CHECKING WHAT ERROR (IN FUTURE)
                */
                return response.statusCode;
            }

        } catch (err) {
            console.error(err);
            return err;
        }
    }
    //getRecIdByCompanyId(300020001000);

// FUNCTION TO GET CUSTOMER details USING COMPANY ID 
exporter.getCustomerByCompanyId = async function(cid) {
        let acc = await exporter.getTokenFromDatabase();
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
                    'Authorization': `Zoho-oauthtoken ${acc.accesstoken}`,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                json: true,
                resolveWithFullResponse: true
            }
            let res = await rpn(options)
                //console.log(`status code : ${res.status}`);
            if (res.body.code === 0) {
                let data = (res.body.customers.length > 0) ? res.body.customers[0] : `data don't exist`;
                //console.log(data);
                return data;
            } else {
                console.log(`following error encountered: ${res.data.message}`)
                return res.body.message;
            }

        } catch (err) { console.error(err); }

    }
    //getCustomerByCompanyId(1500101010);


// FUNCTION TO CONVERT A LEAD USING COMPANY ID
exporter.convertLeadToAccountByCompanyId = async function(id) {
        let result = await exporter.getRecIdByCompanyId(id);
        if (result !== undefined) {
            if (result.toString().length > 4) {
                let sol = await exporter.convertLeadByRecordId(result);
                console.log(sol);
                return sol.Accounts;
            } else {
                console.log(`some error occured with status code = ${resp}`)
                return 0;
            }
        } else {
            console.log('error')
            return 0;
        }
    }
    //convertLeadToAccountByCompanyId(5010402030);

//FUNCTION TO CREATE A SUBSCRIPTION

exporter.createSub1 = async function(dt) {
    console.log("New Subscription creation request starting ")
    let acc = await exporter.getTokenFromDatabase();
    let conv = await exporter.convertLeadToAccountByCompanyId(dt.company_id);
    // console.log(conv);
    let synced = await exporter.instantSync(conv);
    let customer = await exporter.getCustomerByCompanyId(dt.company_id);
    //console.log(customer)
    if (conv != 0 && synced == true) {
        let d = {};
        d.customer_id = customer.customer_id;
        // d.email = dt.email;
        d.plan = dt.plan;
        d.auto_collect = false;
        // console.log(d);
        var options = {
            method: 'POST',
            qs: {
                'oauthscope': 'ZohoSubscriptions.subscriptions.CREATE'
            },
            url: `https://subscriptions.zoho.com/api/v1/subscriptions`,
            //console.log(url);
            headers: {
                'X-com-zoho-subscriptions-organizationid': 691418205,
                'Authorization': `Zoho-oauthtoken ${acc.accesstoken}`,
            },
            json: true,
            resolveWithFullResponse: true

        }
        options.body = d;
        try {
            let resp = await rpn(options)
            if (resp.body.code == 0) {
                console.log(resp.body);
            } else {
                console.log(`code : ${resp.body.code}`)
                console.log(`error: ${resp.body.message}`)
            }
            //callback(resp);
            return resp.body;
        } catch (err) {
            console.error(err)
            return err;
        }
    } else {
        console.log('everything didn\'t go as planned');
        return -1;
    }
}

exporter.onlyCreateSub = async function(id, dt, callback) {
    console.log("ONLY Subscription creation request starting ")
    let acc = await exporter.getTokenFromDatabase();
    let customer = await exporter.getCustomerByCompanyId(dt.company_id);
    let d = {};
    d.customer_id = customer.customer_id;
    d.plan = dt.plan;
    d.auto_collect = false;
    // console.log(d);
    console.log(d);
    var options = {
        method: 'POST',
        qs: {
            'oauthscope': 'ZohoSubscriptions.subscriptions.CREATE',
        },
        url: `https://subscriptions.zoho.com/api/v1/subscriptions`,
        //console.log(url);
        headers: {
            'X-com-zoho-subscriptions-organizationid': 691418205,
            'Authorization': `Zoho-oauthtoken ${acc.accesstoken}`,
        },
        json: true,
        resolveWithFullResponse: true
    }
    options.body = d;
    try {
        let resp = await rpn(options)
            //console.log(`status code : ${resp.status}`);
        if (resp.body.code == 0) {
            console.log(resp.body);
        } else {
            console.log(`code : ${resp.body.code}`)
            console.log(`error: ${resp.body.message}`)
        }
        callback(resp);
        // return resp.data;
    } catch (err) {
        console.error(err)
        console.log('request not completed');
    }
}


//  FUNCTION TO INSTANT SYNC A ZOHO CRM ACCOUNT TO ZOHO SUBSCRIPTION
exporter.instantSync = async function(zcrmaccid) {
        let acc = await exporter.getTokenFromDatabase();
        var options = {
                method: 'POST',
                url: `https://subscriptions.zoho.com/api/v1/crm/account/${zcrmaccid}/import`,
                headers: {
                    'X-com-zoho-subscriptions-organizationid': 691418205,
                    'Authorization': `Zoho-oauthtoken ${acc.accesstoken}`
                },
                json: true,
                resolveWithFullResponse: true
            }
            //console.log(url);
        try {
            let res = await rpn(options)
            console.log(res.body);
            if (res.body.code == 0)
                return true;
            else
                return false;
        } catch (err) {
            console.error(err);
            console.log('request not completed');
            return false;
        }
    }
    //instantSync('3756897000001201002');
    // FUNCTION TO CHECK IF INVOICEs ARE UNPAID
exporter.checkForUnpaidInvoices = async function(cid) {
        let acc = await exporter.getTokenFromDatabase();
        let customer = await exporter.getCustomerByCompanyId(cid);
        var options = {
            method: 'GET',
            qs: {
                'oauthscope': 'ZohoSubscriptions.invoices.READ',
                'customer_id': customer.customer_id,
                'filter_by': 'Status.All'
            },
            url: `https://subscriptions.zoho.com/api/v1/invoices`,
            //console.log(url);
            headers: {
                'X-com-zoho-subscriptions-organizationid': 691418205,
                'Authorization': `Zoho-oauthtoken ${acc.accesstoken}`,
                'Content-Type': 'application/json'
            },
            json: true,
            resolveWithFullResponse: true
        }
        try {

            let res = rpn(options)
            if (res.body.code == 0) {
                console.log(res.body);
            } else {
                console.log(`code : ${res.data.code}`)
                console.log(`error: ${res.data.message} but request was succesful`)
            }

        } catch (err) { console.error(err) }
    }
    // checkForUnpaidInvoices(1500101010);
    //createSub(1500101010, plan, "HR");
    //convertLeadToAccountByCompanyId(cid)

module.exports = exporter;