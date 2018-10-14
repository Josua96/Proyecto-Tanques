const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs  = require('fs'); 

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});

app.get("/",(req, res)=>
{
    fs.readFile('.src/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}); 

app.listen(8095, function() {

    console.log("corriendo  en 8095")
});