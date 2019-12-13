var http = require('http');
// const express = require('express');
// const bodyParser = require('body-parser');
const axios = require('axios');
// var app = express();
const reqToGetInv = require('./reqToGetInv');
const codeScope = require('./codescope');


var subData = require('./subscriptions.json');

function getBillForLessThanFourDays(obj) {
    let tod = new Date();

    function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
    var str = '';
    obj.subscriptions.forEach((element) => {
        let cdt = new Date(element.next_billing_at);
        if (datediff(tod, cdt) <= 5) {
            console.log(`${element.customer_id}    ${element.customer_name}     `);
            reqToGetInv.readInvCustId(element.customer_id);
        }
    })
}

function getNewInvoiceAfterUpdate(subId) {
    const reqToGetInv = require('./reqToGetInv')
    reqToGetInv.readInvSubIdLatest(subId);
}
getNewInvoiceAfterUpdate('217455000000007520');
//getBillForLessThanFourDays(subData)