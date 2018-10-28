



var express = require('express');
var app = express();
var timeForEmit= 250;

const GameManager= require('./Clases/GameBoard/GamesManager.js');


var gamesManager= new GameManager();
var usersCount=0;

app.use(function(req, res, next) 
{
    //res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
    next();
});

var webService = app.listen(8083, function() {
    var host = webService.address().address;
    var port = webService.address().port;
    console.log("Executing at %s:%s", host, port);  
});


var io = require('socket.io')(webService);

io.on('connection', (socket) => {

    var userConnected= true;
    var userID= usersCount;
    var gameId;
    usersCount++

    var emitGameState = function(gameId, userCanPlay){ 
        var emitServerMessage = setInterval(() => {
        if (!userConnected){
            clearInterval(emitServerMessage);
        }
        else{

                
            var data= gamesManager.getDataForPlayer(gameId,userID,userCanPlay);
            socket.emit('gameState', data);
         
        }
        
        }, timeForEmit);

    }


    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        gamesManager.deletePlayerTank(gameId,userID);
        userConnected= false;
        //eliminar el tanque del jugador
        usersCount--;
        if (usersCount===0){
            gamesManager.deleteGame(gameId);
        }
        
    });
    
    //user invoke this when want to play
    socket.on('joinGame', (data) => {

        gameId = gamesManager.joinPlayerToGame(-1,userID);
        var userCanPlay=true;
        if (gameId===-1){
           userCanPlay=false;
        }

        emitGameState(gameId,userCanPlay);

    });

    socket.on('shoot', (data) => {

        gamesManager.playerShoot({"playerId": userID},gameId);

    });

    socket.on('move', (data) => {
        
        gamesManager.playerMove({"playerId": userID,"direction":data.direction},gameId); 
    });

    socket.on('applyPower', (data) => {
        gamesManager.applyPower(gameId,{"playerId": userID});
  
    });



});
