

var express = require('express');
var app = express();


app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});

app.get('/test',function(req, res)
{    

    console.log("web service escucha");  
    res.send(JSON.stringify({"Response":"Preuba superada"}));
       
});

var server = app.listen(8081, function ()
{                        
	var host = server.address().address;
    var port = server.address().port;
    console.log("Executing at %s:%s", host, port);   
});