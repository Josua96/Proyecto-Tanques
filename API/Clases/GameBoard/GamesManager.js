const Game= require('./game');

class GamesManager{

	constructor(){

        this.playerQuantityLimit=5;
        this.games=[];

    }

    addNewGame(width,height,wallsNumber,enemiesNumber, pwInterval,tankAppearInterval,tShootInterval,tMovementInterval,pwCheckingInterval,bulletDamage){
        //para esta implementación solo permitir un juego compartido para todos
        if (this.games.length===0){
            this.games.push(new Game(this.games.length,width,height,wallsNumber,enemiesNumber,pwInterval,
                tankAppearInterval,tShootInterval,tMovementInterval,pwCheckingInterval,bulletDamage));

        }
        
    }

    UserCanPlay(playerId){
        if (playerId=== this.playerQuantityLimit){
            return false;
        }
        else{
            return true;
        }
    }

    getGameBoard(gameId){
        return this.games[gameId].getGameBoard();
    }


    parseBoard(boardController){

        
        var forRevision=[];
        var newArray= new Array(boardController.width);
        for (var i=0; i< boardController.width;i++){
            
            newArray[i] = new Array(boardController.height);
           
    		for(var j=0; j< boardController.height; j++){
                

                newArray[i][j]= boardController.gameBoard[i][j].gameElement.getImage();
    			
    		}
        }

        return newArray;
    }

    getDataForPlayer(gameId,playerId,UserCanPlay){

        var dic= {};

        dic["canPaint"]=UserCanPlay;
        dic["playerDead"]= this.games[gameId].playerDead(playerId);
        dic["gameFinished"]= this.games[gameId].getEndGame();
        dic["boardWidth"]=this.games[gameId].boardController.getWidth();
        dic["boardHeight"]=this.games[gameId].boardController.getHeight();
        var tank=this.getPlayerTank(gameId,playerId);
        dic["tankImage"]="free.png";
        if(tank!=undefined){
            dic["tankImage"]= this.getPlayerTank(gameId,playerId).getImage();
        }     
        dic["board"]= this.parseBoard(this.games[gameId].boardController);
        return dic;

    }

    deleteGame(gameId){

        this.games.splice(gameId,1);

    }

    deletePlayerTank(gameId,playerId){
        this.games[gameId].deletePlayerTank(playerId);
    }

    joinPlayerToGame(gameId,playerId){
        
        if (!this.UserCanPlay()){
            return -1;
        }

        
        if (this.games.length===0){

            this.addNewGame(660,660,30,0,1000*60,3000,3000,1500,5000,20);
            this.games[this.games.length-1].startGame();
        
        }

        gameId= this.games.length-1;
        
        this.games[gameId].createTankForPlayers(playerId);
        return gameId;
    }

    getPlayerTank(gameId,playerId){
        return this.games[gameId].getPlayerTank(playerId);
    }

    playerMove(data,gameId){
        this.games[gameId].createMoveObjectEvent(data);
    }

    playerShoot(data,gameId){
        this.games[gameId].createShootObjectEvent(data);
    }
    
    applyPower(gameId,data){
        this.games[gameId].createApplyPowerObjectEvent(data);
    }

}


module.exports= GamesManager;