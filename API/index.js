

var express = require('express');
var app = express();
var timeForEmit= 500;

app.use(function(req, res, next) 
{
    //res.header('Access-Control-Allow-Credentials', true);
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



var webService = app.listen(1001, function() {
    var host = webService.address().address;
    var port = webService.address().port;
    console.log("Executing at %s:%s", host, port);  
});


var io = require('socket.io')(webService);

io.on('connection', (socket) => {

    var userConnected= true;

    var emitGameState = function(){ 
        var emitServerMessage = setInterval(() => {
        if (!userConnected){
            clearInterval(emitServerMessage);
        }
        else{
            socket.emit('gameState', {type:'new-message', text: "prueba intervalo"});
        }
        
        }, timeForEmit);

    }

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
        userConnected= false;
    });
    
    //user invoke this when want to play
    socket.on('joinGame', (data) => {
        console.log("user join to game");
        console.log(data);
        emitGameState();

    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('shoot', (data) => {
        console.log("user shoot action");
        console.log(data);
        //add http request to queue  
    });

    socket.on('move', (data) => {
        console.log("user move to some side");
        console.log(data);
        //add http request to queue  
    });


});

function tankAppear(){
    var control=60;
    var emitServerMessage = setInterval(() => {
 
        if (control < 0){
            console.log("ya no generaré más tanques");
            clearInterval(emitServerMessage);

        }
        else{

            console.log("Otro tanque ha sido generado");
            control--;
        }
        
        }, 200);
}

function powerAppear(control,text){

    var emitServerMessage = setInterval(() => {
        console.log(text);
        if (control < 0){
            console.log("ya no puedo generar más poderes");
            clearInterval(emitServerMessage);

        }
        else{

            
            control--;
        }
        
        }, 600);
}

function otherProcessing(){
    var control=100;
    var emitServerMessage = setInterval(() => {
        if (control < 0){
            console.log("Se acabó el otro trabajo corriendo");
            clearInterval(emitServerMessage);

        }
        else{

            console.log("Otro trabajo corriendo");
            control--;
        }
        
        }, 800);
}

//tankAppear();
console.log("no esperé a que terminara generación de tanque");
powerAppear(20,"appear 1");
powerAppear(30,"appear2")
console.log("no esperé a que terminara generación de poder");
//otherProcessing();