
const EventManager = require('../GameQueueManager/EventsManager.js');
const Event = require('../GameQueueManager/Event.js');
const Board = require('./Board.js');
const eventKeys= require('../../EventKeys.js');
const Tank= require ('../GameElements/Tank.js');
const EnemiesMovementManager = require ('./EnemiesMovementManager.js');
const Data = require ('../../Data.js');
const BoardPosition = require ('../BoardPosition.js');


class Game{

    constructor(id,width, height,wallsNumber,enemiesNumber,powerAppearInterval,
                tanksAppearInterval,tanksShootInterval,tanksMovementInterval,powerCheckingTime,bulletDamage){
		
		/****************************
		General information
        *****************************/
        this.gameId=id;

        this.bulletDamage= bulletDamage;

        this.powerAppearInterval= powerAppearInterval;
        this.tanksAppearInterval= tanksAppearInterval;
        this.tanksShootInterval= tanksShootInterval;
        this.tanksMovementInterval= tanksMovementInterval;
        this.width= width;
        this.height= height; 

        this.endGame=false;
        this.gameStarting=true;
        //para elminar de un diccionario delete thisIsObject["Cow"];

        /*******************************
         Game component instantiation
        ********************************/
        this.boardController= new Board(this.width,this.height,wallsNumber,enemiesNumber);
        this.eventHandler = new EventManager(this.boardController,eventKeys,300,powerCheckingTime);
        this.boardController.setWallsAndEnemies(wallsNumber,enemiesNumber,this.eventHandler.getEnemies());
        this.enemiesMovementCalculator = new EnemiesMovementManager(this.eventHandler.getPlayers());
        
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

    bulletMovement(bullet,bulletSpeed){
        var intervalo = setInterval(() => {
            
            
            }, bulletSpeed); 

    }

    enemyShoot(tank){
        var intervalo = setInterval(() => {
            
            
            }, this.tanksShootInterval); 
    }

    enemyMovement(tank){
        var intervalo = setInterval(() => {
            
            if (tank.getIsEnable()){
                
            }
            
            } , this.tanksMovementInterval); 
    }

    canGenerateEnemy(){
        var playerQuantity= this.eventHandler.getElementsQuantity(this.eventHandler.players);
        var enemiesQuantity= this.eventHandler.getElementsQuantity(this.eventHandler.enemies);
        return playerQuantity === enemiesQuantity;
    }

    enemyGeneration(){
        var intervalo = setInterval(() => {
            
            if(this.endGame){
                clearInterval(intervalo);
            }

            if ( this.canGenerateEnemy()){
                var tank = new Tank(-1,-1,Data.machineTank,this.bulletDamage,0,0,"","","","","");
                this.eventHandler.insertInDict(this.eventHandler.getEnemies(),tank,false);
                this.eventHandler.addEvent(new Event(eventKeys.appearTank,tank));
            }

            
            }, this.tanksAppearInterval); 
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
        tank= new Tank(playerID,playerID,Data.playerTank,20,
            0,0,"","","","","");
        this.eventHandler.insertInDict( this.eventHandler.getPlayers(),new Tank(playerID,playerID,Data.playerTank,
                this.bulletDamage,0,0,"","","","",""),true);
        return tank;
    }

    getPlayerTank(playerID){
        this.eventHandler.getPlayers()[playerID];
    }

}
module.exports= Game;