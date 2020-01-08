var express = require('express');
var router = express.Router();
var functions = require('../functions')
var ins = require('../notReallyMain')

/* GET home page. */
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
        // functions.pushDataIntoLeads(data, (result) => {
        //     console.log(result);
        // })
    ins.getCustomerByCompanyId(req.body.id);

})


module.exports = router;