/**
 * Created by punagrawal on 1/18/16.
 */

var requests = require('./../controller/requests');
var async = require('async');

function baseStationEntry(value){
    return value.deviceType == "basestation";
}

module.exports = function(mode, username, password) {

    async.waterfall(
        [
            //login and get the auth token
            function (callback) {
                var authReq = requests.authRequest();
                authReq.send("{\"email\":\"" + username + "\",\"password\":\"" + password + "\"}");
                authReq.end(function (res) {
                    if (res.error){
                        callback(res.error, '500');
                    }
                    callback(null, res);
                });
            },

            //Get the details of the Arlo setup
            function (res, callback) {
                var token = res.body.data.token;
                var getDetailsRequest = requests.getDetailsRequest(token, mode);
                getDetailsRequest.send(JSON.stringify(getDetailsRequest.payload)) ;
                getDetailsRequest.end(function (res) {
                    if (res.error){
                        callback(res.error, '500');
                    }
                    var bse = res.body.data.filter(baseStationEntry);
                    if(bse === undefined || bse.length === 0){
                        callback(res.error, '500');
                    }
                    callback(null, token, bse[0]);
                });
            },


            //Arm or disarm the system based on mode
            function (token, baseStationEntry, callback) {
                var armRequest = requests.armRequest(token, mode, baseStationEntry);
                armRequest.send(JSON.stringify(armRequest.payload)) ;
                armRequest.end(function (res) {
                    if (res.error){
                        callback(res.error, '500');
                    }

                    callback(null, token);
                });
            },

            //Finally logout from the system
            function(token, callback){
                var logoutRequest =requests.logoutRequest(token);
                logoutRequest.send();
                logoutRequest.end(function (res) {
                    if (res.error){
                        callback(res.error, '500');
                    }

                    callback(null, '200 OK');
                });
            }
        ],
        function (err, status) {
            console.log(status);
        }
    );
};