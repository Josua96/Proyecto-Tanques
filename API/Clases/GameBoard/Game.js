
const EventManager = require('../GameQueueManager/EventsManager.js');
const Event = require('../GameQueueManager/Event.js');
const Board = require('./Board.js');
const eventKeys= require('../../EventKeys.js');
const Tank= require ('../GameElements/Tank.js');

const Power = require ('../GameElements/Power.js');
const Bullet= require ('../GameElements/Bullet.js');
const BulletDamagePower = require('../GameElements/BulletDamagePower.js');
const FasterShootPower = require ('../GameElements/FasterShootPower.js');
const GhostPower = require ('../GameElements/GhostPower.js');
const ImmunePower= require ('../GameElements/ImmunePower.js');
const LifeEnhancePower = require ("../GameElements/LifeEnhancerPower.js");

const EnemiesMovementManager = require ('./EnemiesMovementManager.js');
const Data = require ('../../Data.js');
const imageNames = require ('../../imageNames.js');
const BoardPosition = require ('../BoardPosition.js');


class Game{

    constructor(id,width, height,wallsNumber,enemiesNumber,powerAppearInterval,
                tanksAppearInterval,tanksShootInterval,tanksMovementInterval,powerCheckingTime,bulletDamage){
		
		/****************************
		General information
        *****************************/
        this.gameId=id;

        this.bulletDamage= bulletDamage;
        this.usersQuantity=0;
        this.gameFactor=30;

        this.powerAppearInterval= powerAppearInterval;
        this.tanksAppearInterval= tanksAppearInterval;
        this.tanksShootInterval= tanksShootInterval;
        this.tanksMovementInterval= tanksMovementInterval;
        this.width= width;
        this.height= height; 
        this.bulletSpeed=500;

        this.endGame=false;
        this.gameStarting=true;
        //para elminar de un diccionario delete thisIsObject["Cow"];

        /*******************************
         Game component instantiation
        ********************************/
       
        this.boardController= new Board(this.width/this.gameFactor,this.height/this.gameFactor,wallsNumber,enemiesNumber);
        this.eventHandler = new EventManager(this.boardController,eventKeys,10,powerCheckingTime,this.endGame);
        this.boardController.setWallsAndEnemies(wallsNumber,enemiesNumber,this.eventHandler.getEnemies());
        this.enemiesMovementCalculator = new EnemiesMovementManager(this.eventHandler.getPlayers());
        
    }

    getUserQuantity(){
        return this.usersQuantity;
    }

    setUsersQuantity(value){
        this.usersQuantity= value;
    }

    setEndGame(value){
        this.endGame=value;
    }

    getEndGame(){
        return this.endGame;
    }

    startGame(){

        if (this.gameStarting){
            this.gameStarting= false;
            this.eventHandler.initProcessing();
            this.initGame();
        }

    }

    getGameBoard(){
        return this.boardController.getGameBoard();
    }

    isValidPosition(x,y){
        
        if(x < 0 || x >=this.width ){
            return false;
        }

        if (y < 0 || y >= this.height){
            return false;
        }

        return true;
    
    }

    bulletMovement(bullet,bulletSpeed){
        var intervalo = setInterval(() => {

            if (bullet.getEndMovement() || this.endGame){
                clearInterval(intervalo);
            }

            if (bullet.getIsEnable() && bullet.getEndMovement()===false){
                this.createObjectEvent(eventKeys.moveBullet,bullet,-1);
            }

            }, bulletSpeed); 

    }

    enemyShoot(tank){
        var intervalo = setInterval(() => {

            if (tank.destroy() || this.endGame){
                clearInterval(intervalo);
            }

            if (tank.getIsEnable && tank.destroy()===false){
                var bullet = new Bullet(this.boardController.getRandomPosition(100,1),tank.getBulletImage(),tank.type, 
                tank.bulletDamage,tank.bulletSpeed,-1,-1,-1,false);  
                bullet.setDirection(tank);
                if (this.isValidPosition(bullet.x,bullet.y)){

                    this.createObjectEvent(eventKeys.appearBullet,bullet,-1);
                    this.bulletMovement(bullet,bullet.getSpeed());
                }
                
            }
            }, this.tanksShootInterval); 
    }


    enemyMovement(tank){

        var intervalo = setInterval(() => {
            
            if (tank === undefined || tank.destroy() || this.endGame){
                clearInterval(intervalo);
            }

            if (tank.getIsEnable() && tank.destroy()===false){
                
                var direction= this.enemiesMovementCalculator.getNextMovement(tank,this.width,this.height);


                if (direction != -1){
                    tank.setNextDirection(direction);

                    this.createObjectEvent(eventKeys.moveTank,tank,direction);

                }

            }
            
            } , this.tanksMovementInterval); 
    }


    getPower(){
        var power= this.boardController.getRandomPosition(0,5);
        if (power===0){

            return new BulletDamagePower(imageNames.damageShootPower,null,10000,false, 5);
        }
        else if (power===1){
            return new FasterShootPower(imageNames.fasterShootPower,null,10000,false,100);
        }

        else if (power===2){
            return new GhostPower(imageNames.ghostPower,null,20000,false);
        }

        else if (power===3){
            return new ImmunePower(imageNames.immunePower,null,8000,false);
        }
        else{
            return new LifeEnhancePower(imageNames.enhancerPower,null,10000,false,50);
        }
        
    }

    generatePower(){
        var intervalo = setInterval(() => {
            
            if (this.endGame){
                clearInterval(intervalo);
            }

            this.createObjectEvent(eventKeys.appearPower,this.getPower(),-1);

            
            } , this.powerAppearInterval); 
    }

    canGenerateEnemy(){
       
       var playerQuantity= this.eventHandler.getElementsQuantity(this.eventHandler.getPlayers());
       // var enemiesQuantity= this.eventHandler.getElementsQuantity(this.eventHandler.getEnemies());
       
       var enemiesQuantity= this.eventHandler.getEnemiesQuantity();

       return enemiesQuantity <= (playerQuantity*2);
    
    }


    enemyGeneration(){

        var intervalo = setInterval(() => {
            
            if(this.endGame){
                clearInterval(intervalo);
            }

            if (this.canGenerateEnemy()){

                var tank = new Tank(-1,-1,Data.machineTank,this.bulletDamage,0,0,
                    imageNames.whiteTankLeft,
                    imageNames.whiteTankUp,imageNames.whiteTankRight,imageNames.whiteTankDown,imageNames.bulletOne);
                tank.setDirection(Data.up);
                tank.setCurrentImage(Data.up);
                this.eventHandler.insertInDict(this.eventHandler.getEnemies(),tank,false);
                this.eventHandler.setEnemiesQuantity(1);
                
                this.createObjectEvent(eventKeys.appearTank, tank,-1);
                this.enemyMovement(tank);
                this.enemyShoot(tank);

            }

            
            }, this.tanksAppearInterval); 
    }

    checkEndGame(){
        
        var intervalo = setInterval(() => {

            if (this.endGame===true){
                
                clearInterval(intervalo);
            }

            if (this.eventHandler.getElementsQuantity(this.eventHandler.getPlayers()) === 0 ||
                this.eventHandler.getEagleWasKilled()){
                this.setEndGame(true);

                clearInterval(intervalo);
            }
            
            } , 300); 
    }

    initGame(){
        this.enemyGeneration();
        this.checkEndGame();
        this.generatePower();
    }

    createObjectEvent(key,newObject,direction){
        this.eventHandler.addEvent(new Event(key,newObject,direction));
    }

    
    createApplyPowerObjectEvent(data){
        var tank= this.getPlayerTank(data.playerId);
        if (tank!= undefined){
            this.createObjectEvent(eventKeys.applyPower,tank,-1);
        }
        
    }

    createShootObjectEvent(data){

        var tank= this.getPlayerTank(data.playerId);

        //si ya fue pintado y no está destruido
        if (tank!= undefined && tank.getIsEnable() && !this.endGame){
            var bullet = new Bullet(this.playerID,tank.getBulletImage(),tank.type, 
                tank.bulletDamage,tank.bulletSpeed,-1,-1,-1,false);
            bullet.setDirection(tank);
            this.createObjectEvent(eventKeys.appearBullet,bullet,-1);
            this.bulletMovement(bullet,bullet.getSpeed());

        }

    }


    createMoveObjectEvent(data){
        var tank= this.getPlayerTank(data.playerId);
        if (tank!= undefined && tank.getIsEnable()){
            tank.setDirection(data.direction);
            this.createObjectEvent(eventKeys.moveTank,tank,data.direction);
        }
    }

    getImageForPlayer(playerId,tank){
        if (playerId===0){
            tank.setImages([imageNames.redTankLeft,imageNames.redTankUp,imageNames.redTankRight,
                imageNames.redTankDown, imageNames.bulletOne]);
        }
        else if (playerId===1){
            tank.setImages([imageNames.blueTankLeft,imageNames.blueTankUp,imageNames.blueTankRight,
                imageNames.blueTankDown, imageNames.bulletOne]);
        }

        else if (playerId===2){
            tank.setImages([imageNames.greenTankLeft,imageNames.greenTankUp,imageNames.greenTankRight,
                imageNames.greenTankDown, imageNames.bulletOne]);
        }

        else if (playerId===2){
            tank.setImages([imageNames.grayTankLeft,imageNames.grayTankUp,imageNames.grayTankRight,
                imageNames.grayTankDown, imageNames.bulletOne]);
        }

        else{
            tank.setImages([imageNames.pinkTankLeft,imageNames.pinkTankUp,imageNames.pinkTankRight,
                imageNames.pinkTankDown, imageNames.bulletOne]);
        }

    }

    deletePlayerTank(playerId){
        var tank = this.getPlayerTank(playerId);
        if (tank!= undefined){
            this.eventHandler.deletePlayerTank(tank);
        }
        
    }

    createTankForPlayers(playerID){
        var tank= new Tank(playerID,playerID,Data.playerTank,this.bulletDamage,0,0,"","","","","");
        this.getImageForPlayer(playerID,tank);
        tank.setDirection(Data.up);
        tank.setCurrentImage(Data.up);
        this.eventHandler.insertInDict( this.eventHandler.getPlayers(),tank,true);
        this.createObjectEvent(eventKeys.appearTank,tank,-1);
        return tank;
    }

    getPlayerTank(playerID){

        return this.eventHandler.getPlayers()[playerID.toString()];
    }

    playerDead(playerID){
        
        var tank= this.getPlayerTank(playerID);
        
        if (tank===undefined){
            return true;
        }

        if (tank.destroy()){
            return true;
        }

        return false;

    }

}
module.exports= Game;