
const EventManager = require('../GameQueueManager/EventsManager.js');
const Event = require('../GameQueueManager/Event.js');
const Board = require('./Board.js');
const eventKeys= require('../../EventKeys.js');
const Tank= require ('../GameElements/Tank.js');
const Data = require ('../../Data.js');
const BoardPosition = require ('../BoardPosition.js');


class Game{

    constructor(id,width, height,wallsNumber,enemiesNumber,powerAppearInterval,
                tanksAppearInterval,tanksShootInterval,tanksMovementInterval,powerCheckingTime){
		
		/****************************
		General information
        *****************************/
        this.gameId=id;
        this.powerAppearInterval= powerAppearInterval;
        this.tanksAppearInterval= tanksAppearInterval;
        this.tanksShootInterval= tanksShootInterval;
        this.tanksMovementInterval= tanksMovementInterval;
        this.width= width;
        this.height= height; 

        this.gameStarting=true;
        //para elminar de un diccionario delete thisIsObject["Cow"];

        /*******************************
         Game component instantiation
        ********************************/
        this.boardController= new Board(this.width,this.height,wallsNumber,enemiesNumber);
        this.eventHandler = new EventManager(this.boardController.getGameBoard(),eventKeys,300,powerCheckingTime);
        this.boardController.setWallsAndEnemies(wallsNumber,enemiesNumber,this.eventHandler.getEnemies());
        
    }

    startGame(playerTank){

        if (this.gameStarting){
            this.gameStarting= false;
            this.eventHandler.initProcessing();
            this.initGame();
        }

        //aparecer el tanque del jugador

    }

    getGameBoard(){
        return this.boardController.getGameBoard();
    }

    bulletMovement(){

    }

    enemyShoot(){

    }

    enemyMovement(){

    }

    enemyGeneration(eventHandler,boardController){
        
    }

    initGame(){
        this.enemyGeneration();
    }

    createAppearObjectEvent(newObject){
        this.eventHandler.addEvent(new Event(eventKeys.appear,newObject));
    }

    createMoveObjectEvent(objectToMove){
        this.eventHandler.addEvent(new event(eventKeys.movement,objectToMove));
    }

    createTankForPlayers(playerID){
        tank= new Tank(Data.player,playerID,Data.playerTank,20,
            0,0,"","","","","");
        this.eventHandler.insertInDict(this.eventHandler.getPlayers(),new BoardPosition(Data.player,tank,-1));
        return tank;
    }

    getPlayerTank(playerID){
        this.eventHandler.getPlayers()[playerID];
    }

}
module.exports= Game;