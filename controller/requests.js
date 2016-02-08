/**
 * Created by punagrawal on 1/18/16.
 */

var headers = require('./headers');
var unirest = require("unirest");

module.exports = {
    getDetailsRequest: function(token) {
        var req = unirest("GET", "https://arlo.netgear.com/hmsweb/users/devices");
        headers.authorization = token;
        req.headers(headers);
        return req;
    },
    armRequest: function (token, mode, bse) {
        var req = unirest("POST", "https://arlo.netgear.com/hmsweb/users/devices/notify/"+bse.deviceId);
        headers.authorization = token;
        headers.xcloudid = bse.xCloudId;
        req.headers(headers);
        req.type("json");
        req.payload = {
            "from": bse.userId+"_web",
            "to": bse.deviceId,
            "action": "set",
            "responseUrl": "",
            "resource": "modes",
            "transId": "web!!"+new Date().getTime(),
            "publishResponse": true,
            "properties": {
                "active": mode
            }
        };
        return req;
    },
    authRequest: function () {
        var req = unirest("POST", "https://arlo.netgear.com/hmsweb/login");
        req.headers(headers);
        return req;
    },
    logoutRequest: function (token) {
        var req = unirest("PUT", "https://arlo.netgear.com/hmsweb/logout");
        headers.authorization = token;
        req.headers(headers);
        return req;
    }
};