
const EventManager = require('../GameQueueManager/EventsManager.js');
const Event = require('../GameQueueManager/Event.js');
const Board = require('./Board.js');
const eventKeys= require('../../EventKeys.js');
const Tank= require ('../GameElements/Tank.js');

const Power = require ('../GameElements/Power.js');
const Bullet= require ('../GameElements/Bullet.js');
const BulletDamagePower = require ('../GameElements/BulletDamagePower.js');
const FasterShootPower = require ('../GameElements/FasterShootPower.js');
const GhostPower = require ('../GameElements/GhostPower.js');
const ImmunePower= require ('../GameElements/ImmunePower.js');
const LifeEnhancePower = require ('../GameElements/LifeEnhancePower.js');

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
        this.usersQuantity=0;


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
        this.boardController= new Board(this.width,this.height,wallsNumber,enemiesNumber);
        this.eventHandler = new EventManager(this.boardController,eventKeys,300,powerCheckingTime,this.endGame);
        this.boardController.setWallsAndEnemies(wallsNumber,enemiesNumber,this.eventHandler.getEnemies());
        this.enemiesMovementCalculator = new EnemiesMovementManager(this.eventHandler.getPlayers());
        
    }

    getUserQuantity(){
        return this.usersQuantity;
    }

    setUsersQuantity(value){
        this.usersQuantity= value;
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

            if (bullet.getEndMovement()){
                clearInterval(intervalo);
            }

            if (bullet.getIsEnable() && bullet.getEndMovement()===false){
                this.createObjectEvent(eventKeys.moveBullet,bullet);
            }

            }, bulletSpeed); 

    }

    enemyShoot(tank){
        var intervalo = setInterval(() => {

            if (tank.destroy()){
                clearInterval(intervalo);
            }

            if (tank.getIsEnable && tank.destroy()===false){
                var bullet = new Bullet(this.boardController.getRandomPosition(100,1),"",tank.type, 
                tank.bulletDamage,tank.bulletSpeed,-1,-1,-1,false);  
                bullet.setDirection(tank);
                this.createObjectEvent(eventKeys.appearBullet,bullet);
                this.bulletMovement(bullet,bullet.getSpeed());
            }
            }, this.tanksShootInterval); 
    }

    enemyMovement(tank){
        var intervalo = setInterval(() => {
            
            if (tank.destroy()){
                clearInterval(intervalo);
            }

            if (tank.getIsEnable() && tank.destroy()===false){
                var direction= this.enemiesMovementCalculator.getNextMovement(tank,this.width,this.height);
                if (direction=! -1){
                    tank.setNextDirection(direction);
                    this.createObjectEvent(eventKeys.moveTank,tank);
                }
            }
            
            } , this.tanksMovementInterval); 
    }


    getPower(){
        var power= this.boardController.getRandomPosition(0,5);
        if (power===0){
            image,tank,time,active,damage
            return new BulletDamagePower("",null,10000,false, 5);
        }
        else if (power===1){
            return new FasterShootPower("",null,10000,false,100);
        }

        else if (power===2){
            return new GhostPower("",null,10000,false);
        }

        else if (power===3){
            return new ImmunePower("",null,10000,false);
        }
        else{
            return new LifeEnhancePower("",null,10000,false,50);
        }
        
    }

    generatePower(){
        var intervalo = setInterval(() => {
            
            if (this.endGame){
                clearInterval(intervalo);
            }

            this.createObjectEvent(eventKeys.appearPower,getPower());
            
            } , this.powerAppearInterval); 
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
                this.createObjectEvent(eventKeys.appearTank, tank);
                this.enemyMovement(tank);
                this.enemyShoot(tank);

            }

            
            }, this.tanksAppearInterval); 
    }

    enemyMovement(tank){
        var intervalo = setInterval(() => {
            
            if (this.endGame===true){
                clearInterval(intervalo);
            }

            if (this.eventHandler.getElementsQuantity(this.eventHandler.getPlayers()) === 0 ){
                
                this.endGame==true;
                clearInterval(intervalo);
            }
            
            } , 100); 
    }

    initGame(){
        this.enemyGeneration();
        this.checkEndGame();
    }

    createObjectEvent(key,newObject){
        this.eventHandler.addEvent(new Event(key,newObject));
    }

    
    ApplyPowerObjectEvent(data){
        var tank= this.getPlayerTank(data.playerID);
        if (tank!= undefined){
            this.createObjectEvent(eventKeys.applyPower,tank);
        }
        
    }

    createShootObjectEvent(data){

        var tank= this.getPlayerTank(data.playerID);

        //si ya fue pintado y no está destruido
        if (tank!= undefined && tank.getIsEnable()){
            var bullet = new Bullet(this.playerID,"",tank.type, 
                tank.bulletDamage,tank.bulletSpeed,-1,-1,-1,false);
            bullet.setDirection(tank);
            this.createObjectEvent(eventKeys.appearBullet,bullet);
            this.bulletMovement(bullet,bullet.getSpeed());
            this.createShootObjectEvent(eventKeys.appearBullet,bullet);
        }

    }

    createMoveObjectEvent(data){
        var tank= this.getPlayerTank(data.playerID);
        if (tank!= undefined && tank.getIsEnable()){
            tank.setDirection(data.moveDirection);
            this.createObjectEvent(eventKeys.applyPower,tank);
        }
    }

    createTankForPlayers(playerID){
        tank= new Tank(playerID,playerID,Data.playerTank,20,
            0,0,"","","","","");
        this.eventHandler.insertInDict( this.eventHandler.getPlayers(),new Tank(playerID,playerID,Data.playerTank,
                this.bulletDamage,0,0,"","","","",""),true);
        this.createObjectEvent(eventKeys.appearTank,tank);
        return tank;
    }

    getPlayerTank(playerID){
        this.eventHandler.getPlayers()[playerID];
    }

    playerDead(playerID){
        var tank= this.getPlayerTank(data.playerID);
        
        if (tank===undefined){
            return true;
        }

        if (tank.destroy()){
            return true;
        }

        return false;

    }

    get


}
module.exports= Game;