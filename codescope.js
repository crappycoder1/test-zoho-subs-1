//const fir = require('./firstRequest.js');

var code = "1000.0d35277f9408ac11262ff9cd96bba21e.735c26b946a845535d1372086c5f07fd";
const scope = {
    "subscriptions": {
        "full": "ZohoSubscriptions.fullaccess.all",
        "create": "ZohoSubscriptions.subscriptions.CREATE",
        "read": "ZohoSubscriptions.subscriptions.READ",
        "update": "ZohoSubscriptions.subscriptions.UPDATE",
        "delete": "ZohoSubscriptions.subscriptions.DELETE"
    },
    "customers": {
        "create": "ZohoSubscriptions.customers.CREATE",
        "read": "ZohoSubscriptions.customers.READ",
        "update": "ZohoSubscriptions.customers.UPDATE",
        "delete": "ZohoSubscriptions.customers.DELETE"
    },
    "plans": {
        "create": "ZohoSubscriptions.plans.CREATE",
        "read": "ZohoSubscriptions.plans.READ",
        "update": "ZohoSubscriptions.plans.UPDATE",
        "delete": "ZohoSubscriptions.plans.DELETE"
    },
    "payments": {
        "create": "ZohoSubscriptions.payments.CREATE",
        "read": "ZohoSubscriptions.payments.READ",
        "update": "ZohoSubscriptions.payments.UPDATE",
        "delete": "ZohoSubscriptions.payments.DELETE"
    },
    "invoices": {
        "create": "ZohoSubscriptions.invoices.CREATE",
        "read": "ZohoSubscriptions.invoices.READ",
        "update": "ZohoSubscriptions.invoices.UPDATE",
        "delete": "ZohoSubscriptions.invoices.DELETE"
    },
    "settings": { "read": "ZohoSubscriptions.settings.READ" }
};
var refresh_token = "1000.82eb1b48a802406c6277eb10e6ea1f3e.abae40e1ad10f9ca55c2b8ca6b09d96b";
exports.code = code;
exports.scope = scope;
exports.refresh_token = refresh_token;