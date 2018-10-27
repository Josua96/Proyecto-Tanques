
const Data = require('../../Data.js');
const WhiteSpace = require('../GameElements/FreeSpace.js');
const BoardPosition= require('../BoardPosition.js');
const imageNames=require("../../imageNames.js");

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

    getEagleWasKilled(){
        return this.eagleWasKilled;
    }

    getEnemies(){
        return this.enemies;
    }

    insertInDict(dic,newObject,isPlayer){
        if (!isPlayer){
        
            newObject.id = Object.keys(dic).length.toString();
            console.log("----------------------------- enemigos en diccionarios -------------------");
            console.log("------------------------------------------------- -------------------");
            console.log("----------------------------- --------------------------------------");
            
        }
        
        dic[newObject.id]=newObject;
        console.log(dic);
        
    }

    getPlayers(){
        return this.players;
    }

    getElementsQuantity(dic){
       return Object.keys(dic).length;
    }

    deleteFromDic(dic,id){
        console.log("delete ****************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" );
        console.log("dic: " +dic);
        console.log(dic);
        console.log("id: "+ id);
        delete dic[id.toString()];
        console.log(dic);
        console.log("object was removed");
    }

    /** 
     * Delete powers thah have been used
    */
    checkPowers(){

        if (this.activePowers.length > 0){
            var i;

            for(i=0; i < this.activePowers.length; i++){
                if (!this.activePowers[i].destroy()){
                    this.activePowers.splice(i,1);
                }
            }
        }
    }

    calculateNextPosition(x,y,direction){
        var mx = x;
        var my = y;

        if(direction == Data.left){
            my = y - 1;
        }
        else if(direction == Data.right){
            my = y + 1;
        }
        else if(direction == Data.up){
            mx = x - 1;
        }
        else if(direction == Data.down){
            mx = x + 1;
        }


        return [mx, my];
    }


    moveEnemiesTanks(event){

        /*

        if (event.object===undefined || !event.object.getIsEnable()){
            return;
        }

        */

       if (event.object===undefined){
           
            return;
        
        }

        event.object.setIsEnable(true);

        var oldPosition=[event.object.x,event.object.y];

        var nextPosition = this.calculateNextPosition(event.object.x, event.object.y,event.direction);

     

        if(nextPosition[0] >= 0 && nextPosition[0] < this.gameBoard.getWidth() && nextPosition[1] >= 0 && nextPosition[1] < this.gameBoard.getHeight())
        {


            if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.free){
                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];


                event.object.setCurrentImage(event.direction);

                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.enemy,event.object,-1));
                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                    Data.free,
                    new WhiteSpace(imageNames.freeSpace),
                    -1));

            }
            else if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.power){

                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];

                this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameElement.setTank(event.object);
                event.object.setPower(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameElement);


                event.object.setCurrentImage(event.direction);

                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.enemy,event.object,-1));
                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                    Data.free,
                    new WhiteSpace(imageNames.freeSpace),
                    -1));

                //aplicar el poder tomado
                event.object.applyPower();
                
            }
            else if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.wall){


                if(event.object.getCanCrossObstacles()){

                    var nPosition= this.calculateNextPosition(nextPosition[0],nextPosition[1],event.direction);

                    if (this.gameBoard.checkPosition(nPosition[0],nPosition[1])
                            && this.gameBoard.getPosition(nPosition[0],nPosition[1]).gameId === Data.free)
                            
                            {
                                event.object.x = nPosition[0];
                                event.object.y = nPosition[1];
                                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.enemy,event.object,-1));
                                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                                Data.free,
                                new WhiteSpace(imageNames.freeSpace),
                                -1));
                            }
                }          
            }
            else{


                event.object.setCurrentImage(event.direction);
                event.object.x=oldPosition[0];
                event.object.y= oldPosition[1];

            }
        }


        

    }


    movePlayersTank(event){

        /*

        if (event.object===undefined || !event.object.getIsEnable()){
            return;
        }

        */

       if (event.object===undefined){
            return;
        }



        var oldPosition=[event.object.x,event.object.y];

        var nextPosition = this.calculateNextPosition(event.object.x, event.object.y,event.direction);

        if(nextPosition[0] >= 0 && nextPosition[0] < this.gameBoard.getWidth() && nextPosition[1] >= 0 && nextPosition[1] < this.gameBoard.getHeight())
        {



            if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.free){
                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];

                event.object.setCurrentImage(event.direction);

                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.player,event.object,-1));
                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                    Data.free,
                    new WhiteSpace(imageNames.freeSpace),
                    -1));

            }
            else if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.power){

                event.object.x = nextPosition[0];
                event.object.y = nextPosition[1];

                this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameElement.setTank(event.object);
                event.object.setPower(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameElement);

                event.object.setCurrentImage(event.direction);

                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.player,event.object,-1));
                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                    Data.free,
                    new WhiteSpace(imageNames.freeSpace),
                    -1));
            }
            else if(this.gameBoard.getPosition(nextPosition[0],nextPosition[1]).gameId === Data.wall){

                if(event.object.getCanCrossObstacles()){
                    var nPosition= this.calculateNextPosition(nextPosition[0],nextPosition[1],event.direction);

                    if (this.gameBoard.checkPosition(nPosition[0],nPosition[1])
                            && this.gameBoard.getPosition(nPosition[0],nPosition[1]).gameId === Data.free)
                            
                            {
                                event.object.x = nPosition[0];
                                event.object.y = nPosition[1];
                                this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.player,event.object,-1));
                                this.gameBoard.setPosition(oldPosition[0],oldPosition[1],new BoardPosition(
                                Data.free,
                                new WhiteSpace(imageNames.freeSpace),
                                -1));
                            }
                    
                }          
            }
            else{
                event.object.setCurrentImage(event.direction);
                event.object.x=oldPosition[0];
                event.object.y= oldPosition[1];
            }
        }

        event.object.setIsEnable(true);
    }


    checkImpact(event){

        /*

        if (event.object===undefined || !event.object.getIsEnable()){
            return;
        }
        */

       if (event.object===undefined){
            
            return;
        
        }


        if((event.object.x >= 0 && event.object.x < this.gameBoard.getWidth()) && (event.object.y >= 0 && event.object.y < this.gameBoard.getHeight()))
        {


            
            if(this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.eagle){



                event.object.setIsEnable(false);  

                if (event.object.type === Data.machineTank){
                    return;
                }


                this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.decreaseLife(event.object.damage); 
                

                if(this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.destroy()){
                    this.eagleWasKilled = true;
                    this.endGame=true;
                    this.gameBoard.setPosition(event.object.x,event.object.y,
                    new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1)
                    );
                }

            }
            else if (this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.wall){

                event.object.setIsEnable(false);  

                if (event.object.type === Data.machineTank){
                    return;
                }
                

                this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.decreaseLife(event.object.damage);

                if(this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.destroy()){
                    this.gameBoard.setPosition(event.object.x,event.object.y,
                        new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1)
                    );
                }
            }
            else if (this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.enemy){


                event.object.setIsEnable(false);  

                if(event.object.type === Data.playerTank)

                {

                    this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.decreaseLife(event.object.damage); 

                    if(this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.destroy())
                    {
                        this.deleteFromDic(this.enemies,this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.id.toString());

                        this.gameBoard.setPosition(event.object.x,event.object.y,
                            new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1));
                    }

                }
            }
            else if(this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.player){

                event.object.setIsEnable(false);  

                if(event.object.type === Data.machineTank){



                    this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.decreaseLife(event.object.damage); 

                    if(this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.destroy())
                    {
                        this.deleteFromDic(this.players,this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.id);            
                        this.gameBoard.setPosition(event.object.x,event.object.y,
                            new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1));
                    }
                }

            }


            else if (this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.bullet){

                this.gameBoard.getPosition(event.object.x,event.object.y).gameElement.setIsEnable(false);
                event.object.setIsEnable(false);
                this.gameBoard.setPosition(event.object.x,event.object.y,
                    new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1));
            
            }

            else if (this.gameBoard.getPosition(event.object.x,event.object.y).gameId === Data.power){

                event.object.setIsEnable(false);   
            }

            else{
                    this.gameBoard.setPosition(event.object.x,event.object.y,new BoardPosition(Data.bullet,event.object,-1));
                }           
        }
        
        else{
            event.object.setIsEnable(false);   
        }
    }

    shoot(event){

        if (event.object===undefined || !event.object.getIsEnable()){

            return;
        }

        else
        {

       //     var x =;
      //      var y=event.object.y;
            this.gameBoard.setPosition(event.object.x,event.object.y,
            new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1));
            
            event.object.moveBullet();

            this.checkImpact(event);
        }
        
    }


    applyTankPower(event){
        console.log("aplicando poder");

        if (event.object===undefined || !event.object.getIsEnable()){
            return;
        }

        else{

            event.object.applyPower();
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ aplicado a tanque  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.log(event.object);
        }

    }

    showBullet(event){

        event.object.setIsEnable(true);
        this.checkImpact(event);
        
    }

    showPower(event){

        var insert=true;
        while(insert){

            var x = this.gameBoard.getRandomPosition(this.gameBoard.getWidth(),0);
            var y = this.gameBoard.getRandomPosition(this.gameBoard.getHeight(),0);
            if(this.gameBoard.getPosition(x,y).gameId === Data.free){

                event.object.x=x;
                event.object.y=y;
                this.gameBoard.setPosition(x,y,new BoardPosition(Data.power,event.object,-1));

                insert=false;
            }
        }
        
    }

    showTank(event){

        var iW;
        var fW;
        if(event.object.playerId!=-1){
            iW=0;
            fW=(Math.round(this.gameBoard.getWidth()/2));
            this.gameBoard.setNewTank(event.object,iW,fW);
        }
        else{
            iW=(Math.round(this.gameBoard.getWidth()/2));;
            fW=this.gameBoard.getWidth();
            this.gameBoard.setNewTank(event.object,iW,fW);
        }

    }


    proccessEvents(){

        var event = this.eventsQueue.shift();

        if (event===undefined){
            return;
        }

        if (this.inUse===false){

        
        this.inUse=true;
        if(event.getType()===0){
            this.showTank(event);
           
        }
        else if (event.getType()===1){
            this.showBullet(event);
            
        }
        else if (event.getType()===2){

            /** generar poder, appear tank */
            this.showPower(event);
            
        }
        else if (event.getType()===3){
            if(event.object != undefined && event.object.playerId!=-1){
                this.movePlayersTank(event);
                
            }
            else if (event.object != undefined){
                this.moveEnemiesTanks(event);
               
            }
        }
        else if(event.getType()===4 && event.object.getIsEnable()){
            this.shoot(event);
            
        }
        else if(event.getType()===5){
            this.applyTankPower(event);
           
        }

        this.inUse= false;

        }
        else{
            this.eventsQueue.push(event);
        }

       
       
    }

    deletePlayerTank(tank){
        this.gameBoard.setPosition(tank.x,tank.y,
            new BoardPosition(Data.free,new WhiteSpace(imageNames.freeSpace),-1));
        this.deleteFromDic(this.players, tank.playerId);
    }

    initProcessing(){
        var that= this;
        this.queueInterval = setInterval(function(){

            that.proccessEvents();
            

        },this.processingTime);

        this.powersInterval= setInterval(function(){
            that.checkPowers();            

        },this.powerCheckingTime);

        }

    

    addEvent(event){
        

        if(event.type ==0 || event.type==2 || event.type==5){
            this.eventsQueue.unshift(event);
        }
        else{
            this.eventsQueue.push(event);
        }

    }



}
module.exports= EventsManager;