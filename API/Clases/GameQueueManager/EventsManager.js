
const Data = require('../../Data.js');
const WhiteSpace = require('../GameElements/FreeSpace.js');


class EventsManager{

	constructor(gameBoard,eventKeys,processingTime, powerCheckingTime,endGame){

        this.endGame=endGame;

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

    insertInDict(dic,newObject,isPlayer){
        if (!isPlayer){
            console.log("id: "+Object.keys(dic).length);
            console.log("id parseada: "+ parseInt(Object.keys(dic).length));

            newObject.id = Object.keys(dic).length.toString();
        }
        
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
                if (!this.activePowers[i].destroy()){
                    this.activePowers.splice(i,1);
                }
            }
        }
    }

    calculateNextPosition(x,y){
        var x = x;
        var y = y;
        if(event.object.getNextDirection() == Data.left){
            x = x - 1;
        }
        else if(event.object.getNextDirection() == Data.right){
            x = x + 1;
        }
        else if(event.object.getNextDirection() == Data.up){
            y = y + 1;
        }
        else if(event.object.getNextDirection() == Data.down){
            y = y - 1;
        }
        return [x, y];
    }

    moveEnemiesTanks(event){

        var nextPosition = calculateNextPosition(event.object.x, event.object.y);

        if(nextPosition[0] > 0 && nextPosition[0] < gameBoard.getWidth() || nextPosition[1] > 0 && nextPosition[1] < gameBoard.getHeight())
        {
            if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.free){
                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];
            }
            else if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.power){
                gameBoard.getPosition(nextPosition[0],nextPosition[1]).setTank(event.object);
                event.object.setPower(gameBoard.getPosition(nextPosition[0],nextPosition[1]));
                event.object.applyPower();
            }
            else if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.wall){
                if(event.object.getCanCrossObstacles()){
                    moveEnemiesTanks(event);
                }          
            }
        }
    }

    movePlayersTank(event){
        var nextPosition = calculateNextPosition(event.object.x, event.object.y);

        if(nextPosition[0] > 0 && nextPosition[0] < gameBoard.getWidth() || nextPosition[1] > 0 && nextPosition[1] < gameBoard.getHeight())
        {
            if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.free){
                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];
            }
            else if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.power){
                gameBoard.getPosition(nextPosition[0],nextPosition[1]).setTank(event.object);
                event.object.setPower(gameBoard.getPosition(nextPosition[0],nextPosition[1]));
            }
            else if(gameBoard.getPosition(nextPosition[0],nextPosition[1]) == Data.wall){
                if(event.object.getCanCrossObstacles()){
                    moveEnemiesTanks(event);
                }          
            }
        }
    }

    shoot(event){
        event.object.moveBullet();
        if(event.object.x > 0 && event.object.x < gameBoard.getWidth() || event.object.y > 0 && event.object.y < gameBoard.getHeight())
        {
            if(gameBoard.getPosition(event.object.x,event.object.y).id == Data.eagle){
                if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    eagleWasKilled = true;
                    endGame=true;
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                }
                else{
                   gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                }
            }
            else if (gameBoard.getPosition(event.object.x,event.object.y).id == Data.wall){
                if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy()){
                    gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                }
                else{
                   gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                }
            }
            else if (gameBoard.getPosition(event.object.x,event.object.y).id == Data.enemy){
                if(event.object.type == Data.playerTank){
                    if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy())
                    {
                        this.enemies.remove(gameBoard.getPosition(event.object.x,event.object.y).id);
                        gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                    }
                    else {
                       gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                    }
                }
            }
            else if(gameBoard.getPosition(event.object.x,event.object.y).id == Data.player){
                if(event.object.type == Data.machineTank){
                    if(gameBoard.getPosition(event.object.x,event.object.y).object.destroy())
                    {
                        this.player.remove(gameBoard.getPosition(event.object.x,event.object.y).id);
                        gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
                    }
                    else{
                       gameBoard.getPosition(event.object.x,event.object.y).object.decreaseLife(event.object.damage); 
                    }
                }
            }
            else if (gameBoard.getPosition(event.object.x,event.object.y).id == Data.bullet){
                gameBoard.getPosition(event.object.x,event.object.y).setIsEnable(false);
                event.object.setIsEnable(false);
                gameBoard.setPosition(event.object.x,event.object.y,WhiteSpace("imagen"));
            }           
        }
        else{
            event.object.setIsEnable(false);   
        }
    }


    applyTankPower(event){
        event.object.applyPower();
    }

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
            if(event.getType()==0){
                showTank(event);
                this.inUse=true;
            }
            else if (event.getType()==1){
                showBullet(event);
                this.inUse=true;
            }
            else if (event.getType()==2){
                showPower(event);
                this.inUse=true;
            }
            else if (event.getType()==3){
                if(event.object != undefined && event.object.playerId!=-1){
                    movePlayersTank(event);
                    this.inUse=true;
                }
                else if (event.object != undefined){
                    moveEnemiesTanks(event);
                    this.inUse=true;
                }
            }
            else if(event.getType()==4 && event.objet.getIsEnable()){
                shoot(event);
                this.inUse=true;
            }
            else if(event.getType()==5){
                applyTankPower(event);
                this.inUse=true; 
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