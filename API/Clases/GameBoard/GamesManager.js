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

    joinPlayerToGame(gameId,playerId){
        var tank=this.games[gameId].createTankForPlayers(playerId);
        this.games[gameId].createAppearObjectEvent(tank);
    }

    getPlayerTank(playerId){
        return this.games[gameId].getPlayerTank(playerId);
    }

    playerMove(data,gameId){
        this.games[gameId].createMoveObjectEvent(data);
    }

    playerShoot(data,gameId){
        this.games[gameId].createAppearObjectEvent(data);
    }

}


module.exports= GamesManager