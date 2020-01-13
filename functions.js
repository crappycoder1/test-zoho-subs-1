// let grantCode = '';
// const user_identifier = 'jaydev@smartsense.co.in';

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
exporter.pushDataIntoLeads = async function(data) {
        var input = {};
        input.module = `Leads`;
        input.body = data;
        input.body.description = "Created during sign-up";
        let response = await crmclient.API.MODULES.post(input);
        //console.log(response.statusCode);
        if ((response.statusCode == 200) || (response.statusCode == 201)) {
            console.log('success in lead creation')
                //console.log(response.body);
        } else {
            console.log("error occured status code is " + response.statusCode);
            console.log(response.body)
        }
        return response;
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
        console.log('success in lead conversion to account')
        console.log(res.data[0]);
    } else {
        console.log("error occured status code is " + response.statusCode);
        console.log(response.body)
    }
    return response;
}

// FUNCTION TO GET A LEAD ACTIVITIES BY COMPANY ID
exporter.getLeadActivityByCompanyId = async function(id) {
    var params = {};
    params.criteria = `(Company_id:equals:${id})`;

    var input = {};
    input.module = 'Leads';
    input.params = params;
    crmclient.API.MODULES.search(input).then((res) => {
            if (res.statusCode != 200) {
                console.log('error in getting leads');
                return;
            }
            //console.log(JSON.parse(res.body));
            let inp = {};
            inp.module = 'activities'
                //inp.id = JSON.parse(res.body).data[0].id;
                //console.log(inp.id)
            crmclient.API.MODULES.get(inp).then((data) => {
                if (data.statusCode != 200) {
                    console.log('error occured in getting activities')
                    console.log(data);
                    return;
                }
                console.log(JSON.parse(data.body).data[0]);
                console.log(JSON.parse(data.body).data[1]);
                console.log(JSON.parse(data.body).data[2]);
                console.log(JSON.parse(data.body).data[3]);
                console.log(JSON.parse(data.body).data[4]);
                return data;
            }).catch((error) => {
                console.error(error)
                return;
            })
        })
        .catch(err => console.log(err));
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
                console.log(`status code : ${response.statusCode}`)
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
            } else {
                console.log(`request failed with statusCode: ${response.statusCode}`)
                console.log(response);
                // console.log(resp.status_code,resp.message);
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
            if (res.statusCode != 200) {
                console.log(`errorAAAAAAAAAAAAAAA occoured with statuscode: ${res.statusCode}`);
            }
            return res;
        } catch (err) { console.error(err); }

    }
    //getCustomerByCompanyId(1500101010);


// FUNCTION TO CONVERT A LEAD USING COMPANY ID
exporter.convertLeadToAccountByCompanyId = async function(id) {
        let result = await exporter.getRecIdByCompanyId(id);
        if (result.statusCode == 200) {
            response_data = JSON.parse(result.body).data[0].id;
            if (response_data) {
                let sol = await exporter.convertLeadByRecordId(result);
                if (sol.statusCode != 200 || sol.statusCode != 201) {
                    console.log(`error occoured with status code = ${sol.statusCode}`)
                    return 0;
                }
                let res = JSON.parse(sol.body).data[0]
                console.log(res);
                return res.Accounts;
            } else {
                console.log(`cannot find record pls exit`)
                return 0;
            }
        } else {
            console.log(`error with statuscode : ${result.statusCode}`)
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
    if (conv != 0 && synced == true && customer.statusCode == 200) {
        let cust = customer.body.customers.length != 0 ? JSON.parse(customer.body).customers[0] : `data dosen't exist`;
        let d = {};
        d.customer_id = cust.customer_id;
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
            return resp;
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
    d.customer_id = customer.body.customers[0].customer_id;
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
        if (customer.statusCode != 200 && customer.body.customers.length > 0) {
            console.log(`erroraAAAAaaaaaabbbbbbbbbbbbbbbbbBBBBBBB occoured with statuscode: ${customer.statusCode}`);
            return;
        }

        var options = {
            method: 'GET',
            qs: {
                'oauthscope': 'ZohoSubscriptions.invoices.READ',
                'customer_id': customer.body.customers[0].customer_id,
                'filter_by': 'Status.OverDue'
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
            let res = await rpn(options)
            if (res.statusCode != 200) {
                console.log(`error occoured with statuscode: ${res.statusCode}`);
                return res;
            }
            if (res.body.code == 0) {
                console.log(res.body);
                console.log(`you have ${res.body.invoices.length} amount of invoices over due please pay them first`)
                return res
            } else {
                console.log(`code : ${res.body.code}`)
                console.log(`error: ${res.body.message} but request was succesful`)
                return res
            }
        } catch (err) {
            console.error(err)
        }
    }
    // checkForUnpaidInvoices(1500101010);
    //createSub(1500101010, plan, "HR");
    //convertLeadToAccountByCompanyId(cid)

module.exports = exporter;