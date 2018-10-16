
const Data = require('../../Data.js');

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

    insertInDict(dic,newObject,isPlayer){
        if (!isPlayer){
            newObject.id=Object.keys(dic).length;
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
                if (!this.activePowers[i].){
                    this.activePowers.splice(i,1);
                }
            }
        }
    }

    proccessEvents(){

        console.log("processing events: "+ this.eventsQueue.length);
        if (!this.inUse){
            console.log("Estoy desocupado");
            this.inUse=true;
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
        //agregar lógica de inserción con prioridad para poderes, disparos, movimientos y aparición de objeto
        this.eventsQueue.push(event);
    }



}
module.exports= EventsManager;