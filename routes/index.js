var express = require('express');
var router = express.Router();
var functions = require('../functions')
    //var ins = require('../notReallyMain')

/* GET home page. */
//functions.getAccessTokenFromRefresh();
router.get('/', (req, res, next) => {
    res.render('checkoutpage', {
        data: {},
        errors: {},
        title: "I am get"
    })
})
router.post('/somePostRequest', (req, res, next) => {
    console.log("In post body")
        // res.render('checkoutpage', {
        //     data: req.body,
        //     errors: {
        //         message: {
        //             msg: 'A message is required'
        //         },
        //         email: {
        //             msg: 'That email doesn‘t look right'
        //         }
        //     },
        //     title: "I am post"
        // })
    console.log('posted');
    console.log(req.body)
        // functions.onlyCreateSub(null, req.body, (resp) => {
        //     if (resp.status == 201) { res.send(resp.data); } else
        //         res.send(resp.status);
        //   });
        // functions.pushDataIntoLeads(req.body).then((resp) => {
        //         res.send(resp);
        //         console.log(resp);
        //     })
        // functions.createSub1(req.body).then((resp) => {
        //     if (resp == -1) {
        //         res.send('error occured')
        //         return;
        //     }
        //     console.log(resp.body);
        //     res.send(resp.body);
        // })
        //     functions.checkForUnpaidInvoices(req.body.id).then((response) => {
        //         console.log(`invoices overdue : ${response.body.invoices.length}`);
        //         res.send(response.body.invoices);
        //     }).catch((err) => {
        //         console.error(err)
        //         res.send(err);
        //     })
})


module.exports = router;