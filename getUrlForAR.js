var exports = module.exports = {};

function getUrl(code, scope) {
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
    url = tsturl + 'code=' + code + '&' + url + '&grant_type=authorization_code&scope=' + scope + '&state=t3st1ng';
    return url;
}

exports.giveUrlForAR = function(code, scope) {
    var clurl = getUrl(code, scope);
    return clurl;
}