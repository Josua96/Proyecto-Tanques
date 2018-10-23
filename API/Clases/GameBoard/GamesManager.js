const Game= require('./game');

class GamesManager{

	constructor(){

        this.games=[];

    }

    addNewGame(width,height,wallsNumber,enemiesNumber, pwInterval,tankAppearInterval,tShootInterval,tMovementInterval,pwCheckingInterval,bulletDamage){
        //para esta implementación solo permitir un juego compartido para todos
        if (this.games.length===0){
            this.games.push(new Game(this.games.length,width,height,wallsNumber,enemiesNumber,pwInterval,
                tankAppearInterval,tShootInterval,tMovementInterval,pwCheckingInterval,bulletDamage));
        }
        
    }

    getGameBoard(gameId){
        return this.games[gameId].getGameBoard();
    }


   

    getDataForPlayer(gameId,playerId){
        var dic= {};
        dic["board"]= this.getGameBoard(gameId);
        dic["canPaint"]=4;

    }

    joinPlayerToGame(gameId,playerId){
        var gameId;
        if (this.games.length===0){
            console.log("generate a new game");
            this.addNewGame(720,720,30,5,1000*60,3000,2000,1500,5000,20);
            gameId= this.games.length;
        }
        
        else{
            var tank=this.games[gameId].createTankForPlayers(playerId);
            return gameId;
    }
    
    }

    getPlayerTank(playerId){
        return this.games[gameId].getPlayerTank(playerId);
    }

    playerMove(data,gameId){
        this.games[gameId].createMoveObjectEvent(data);
    }

    playerShoot(data,gameId){
        var tank = this.getPlayerTank(playerId);
        this.games[gameId].createShootObjectEvent(data);
    }
    
    applyPower(gameId){
        this.games[gameId].createApplyPowerObjectEvent(data);
    }

}


module.exports= GamesManager