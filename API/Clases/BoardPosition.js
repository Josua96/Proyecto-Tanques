
const gameData= require('../Clases/Data.js');

class BoardPosition{

	constructor(id, object, specialId){
		
		/****************************
		General information
        *****************************/

        this.gameId;
        this.gameData=gameData
        this.specialId;
        this.gameElment;
        setData(id,object,specialId);

    }

    isFree(){
    	return this.gameId === this.gameData.free;
    }

    setData(id,object,specialId){
    	this.gameId=id;
        this.specialId= specialId
        this.gameElment= object;
    }



}

module.exports= BoardPosition;
