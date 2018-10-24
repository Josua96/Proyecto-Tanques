
const gameData= require("../Data.js");

class BoardPosition{

	constructor(id, object, specialId){
		
		/****************************
		General information
        *****************************/

        this.gameId;
        this.specialId;
        this.gameElement;
        this.setData(id,object,specialId);

    }

    isFree(){
    	return this.gameId === gameData.free;
    }

    setData(id,object,specialId){
    	this.gameId=id;
        this.specialId= specialId
        this.gameElement= object;
    }



}

module.exports= BoardPosition;
