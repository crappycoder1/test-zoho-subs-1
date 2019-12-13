var exports = module.exports = {};

function getUrl(code) {
    var arrcl = require('./clientData.json');
    var apiData = require('./apiData.json');
    var tsturl = apiData.AccRef.baseUrl;

    function encodeQueryData(arrcl) {
        var ret = [];
        for (let d in arrcl)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(arrcl[d]));
        return ret.join('&');
    }
    var url = encodeQueryData(arrcl);
    url = url.replace(/\r?\n|\r/g, '');
    url = tsturl + 'refresh_token=' + code + '&' + url + '&grant_type=refresh_token';
    return url;
}

exports.giveUrlForAcc = function(code) {
    var clurl = getUrl(code);
    return clurl;
}
var resp;
var resp1;
exports.resp = resp;
exports.resp1 = resp1;