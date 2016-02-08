/**
 * Created by punagrawal on 1/17/16.
 */

var express = require('express');
var app = express();
var http = require('http');
var port = process.env.PORT || 8080;
var router = express.Router();
var bodyParser = require('body-parser');
var arm = require('./workflow/arm');

router.get('/', function(req, res){
    res.json({message : 'hello world'});
});

router.post('/arm', function(req, res){
    if(!authenticate(req)){
        console.log("Received unauthenticated request : "+req);
        res.sendStatus(401);
    }else {
        console.log('Arming the Arlo system');
        arm(req.body.mode || "mode1", req.body.username, req.body.password);
        res.json('Arlo System Armed');
    }
});

router.post('/disarm', function(req, res){
    if(!authenticate(req)){
        console.log("Received unauthenticated request : "+req);
        res.sendStatus(401);
    }else {
        console.log('Disarming the Arlo system');
        arm(req.body.mode || "mode0", req.body.username, req.body.password);
        res.json('Arlo System Disarmed');
    }
});

function authenticate(req){
    return req.body;
}


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

http.createServer(app).listen(port);

console.log("Magic happens on port "+port);