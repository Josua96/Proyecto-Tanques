
const Data = require('../../Data.js');
const WhiteSpace = require('../GameElements/FreeSpace.js');


class EventsManager{

	constructor(gameBoard,eventKeys,processingTime, powerCheckingTime){

        this.gameBoard=gameBoard;
        this.eventsKeys=eventKeys;

        //every player and enemy is represented like a dictionary  {"id": object}
        this.enemies={};
        this.players={};
        this.inUse=false;

        this.eagleWasKilled=false;

        /****** QUEUES ******/
        this.activePowers=[]
        this.eventsQueue=[];

        /*** Queue time processing controller */
        this.processingTime= processingTime;
        this.queueInterval;
        this.powersInterval;
        this.powerCheckingTime= powerCheckingTime;

    }

    getEnemies(){
        return this.enemies;
    }

    insertInDict(dic,newObject){

        newObject.id=Object.keys(dic).length;
        dic[newObject.id]=newObject;
        
    }

    getPlayers(){
        return this.players;
    }

    getElementsQuantity(dic){
       return Object.keys(dic).length;
    }

    /** 
     * Delete powers thah have been used
    */
    checkPowers(){
        console.log("chequeando poderes");
        if (this.activePowers.length > 0){
            var i;

            for(i=0; i < this.activePowers.length; i++){
                if (!this.activePowers[i].isActive){
                    this.activePowers.splice(i,1);
                }
            }
        }
    }

    moveEnemiesTanks(){}
    movePlayersTank(){}

    shoot(event){
        event.object.moveBullet();
        if(event.object.x > 0 &&event.object.x < gameBoard.getWidth() || event.object.y > 0 && event.object.y < gameBoard.getHeight())
        {
            if(gameBoard.getPosition(event.object.x,event.object.y).id == Data.eagle){
                if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    eagleWasKilled = true;
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                }
                else{
                   gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                }
            }
            if else(gameBoard.getPosition(event.object.x,event.object.y).id == Data.wall){
                if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                }
                else{
                   gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                }
            }
            if else(gameBoard.getPosition(event.object.x,event.object.y).id == Data.enemy){
                if(event.object.type == Data.playerTank){
                    if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    this.enemies.remove(gameBoard.getPosition(event.object.x,event.object.y).id);
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                    }
                    else{
                       gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                    }
                }
            }
            if else(gameBoard.getPosition(event.object.x,event.object.y).id == Data.player){
                if(event.object.type == Data.machineTank){
                    if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    this.player.remove(gameBoard.getPosition(event.object.x,event.object.y).id);
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                    }
                    else{
                       gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                    }
                }
            }
            if else(gameBoard.getPosition(event.object.x,event.object.y).id == Data.bullet){
                gameBoard.getPosition(event.object.x,event.object.y).setIsEnable(false);
                event.object.setIsEnable(false);
                gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
            }           
        }
    }


    applyPower(){}

    showBullet(event){
        gameBoard.setPosition(event.object.x,event.object.y,event.object);
    }

    showPower(event){
        var insrt=true;
        while(insert){
            var x = this.getRandomPosition(gameBoard.getWidth(),0);
            var y = this.getRandomPosition(gameBoard.getHeight(),0);
            if(gameBoard.getPosition(x,y).id == Data.free){
                gameBoard.setPosition(event.object.x,event.object.y,event.object);
                insert=false;
            }
        }
        
    }

    showTank(event){
        var iW;
        var fW;
        if(event.object.playerId!=-1){
            iW=0;
            fW=(Math.round(gameBoard.getWidth()/2));
            gameBoard.setNewTank(event.object,iW,fW);
        }
        else{
            iW=(Math.round(gameBoard.getWidth()/2));;
            fW=gameBoard.getWidth();
            gameBoard.setNewTank(event.object,iW,fW);
        }

    }


    proccessEvents(){

        if (!this.inUse){
            event = this.eventsQueue.shift();
            if(event==0){
                showTank(event);
                this.inUse=true;
            }
            if else(event==1){
                showBullet(event);
                this.inUse=true;
            }
            if else(event==2){
                showPower(event);
                this.inUse=true;
            }
            if else(event==3){
                if(event.object != undefined && event.object.playerId!=-1){
                    movePlayersTank(event);
                    this.inUse=true;
                }
                if else(event.object != undefined){
                    moveEnemiesTanks(event);
                    this.inUse=true;
                }
            }
            if else(event==4 && event.objet.getIsEnable()){
                shoot(event);
            }
            if else(){
                applyPower(event);
            }
        }
        else{
            console.log("estoy ocupado");
        }
       
    }

    initProcessing(){
        this.queueInterval = setInterval(function(){

            this.proccessEvents();

        },this.processingTime);

        this.powersInterval= setInterval(function(){
            this.checkPowers();            

        },this.powerCheckingTime);

        }

    }

    addEvent(event){
        if(event.type ==1 || event.type==4){
            this.eventsQueue.unshift(event);
        }
        else{
            this.eventsQueue.push(event);
        }        
    }



}
module.exports= EventsManager;