
const Generic = require('../GameElements/GenericElement.js');
const Tank = require('../GameElements/Tank.js');
const FreeSpace = require('../GameElements/FreeSpace.js');
const BoardPosition= require('../BoardPosition.js');
const imageNames=require("../../imageNames.js");
const Data= require('../../Data.js');



class Board{

	constructor(width, height,wallsNumber, enemiesNumber){
		
		/****************************
		General information
        *****************************/

        this.width= width;
        this.height= height;

        this.gameBoard= new Array(this.width);


        this.initBoard();

	
    }

    getGameBoard(){
    	return this.gameboard;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }


    initBoard(){
 
        
    	for (var i=0; i < this.width; i++){
            
            this.gameBoard[i] = new Array(this.height);
           
    		for(var j=0; j< this.height; j++){
                
                this.gameBoard[i][j]= new BoardPosition(Data.free,new FreeSpace(imageNames.freeSpace),-1);
    			
    		}
        
        }

        //set eagle 
        var i=Math.round(this.height/2);
        this.setPosition(i,0,new BoardPosition(Data.eagle,new Generic(imageNames.eagle,100,i,0),-1));
        this.setPosition(i-1,0,new BoardPosition(Data.wall,new Generic(imageNames.wall,100,i-1,0),-1));
        this.setPosition(i-1,1,new BoardPosition(Data.wall,new Generic(imageNames.wall,100,i-1,1),-1));
        this.setPosition(i,1,new BoardPosition(Data.wall,new Generic(imageNames.wall,100,i,1),-1));
        this.setPosition(i+1,0,new BoardPosition(Data.wall,new Generic(imageNames.wall,100,i+1,0),-1));
        this.setPosition(i+1,1,new BoardPosition(Data.wall,new Generic(imageNames.wall,100,i+1,1),-1));

     



    }


    checkPosition(x,y){


        if ( (x >=0 && x < this.width ) && ( y >= 0 && y < this.height )){
            return true;
        }

        else{
            return false;
        }
    }


    getRandomPosition(max,min){
        return Math.floor(Math.random() * (max - min) + min);
    }

    setWallsAndEnemies(wallsNumber,enemiesNumber,enemies,idGenerator){
        var x;
        var y;
        var enemy;
        while (wallsNumber > 0)
        {
            x= this.getRandomPosition(this.width,0);
            y= this.getRandomPosition(this.height,0);
            
            if (this.gameBoard[x][y].isFree()){
                this.gameBoard[x][y].setData(Data.wall,new Generic(imageNames.wall,100,x,y),-1);
                wallsNumber--;
            }
        }    


        while (enemiesNumber > 0)
        {
            x= this.getRandomPosition(this.width,0);
            y= this.getRandomPosition(this.height,0);
            
            if (this.gameBoard[x][y].isFree()){
                enemy=new Tank(Object.keys(enemies).length.toString(),-1,Data.machineTank,20,x,y,imageNames.whiteTankLeft,
                imageNames.whiteTankUp,imageNames.whiteTankRight,imageNames.whiteTankDown,imageNames.bulletOne);
                enemy.setIsEnable(true);
                enemy.setDirection(Data.up);
                enemy.setCurrentImage(Data.up);
                this.gameBoard[x][y].setData(Data.enemy,enemy,-1);
                enemies[enemy.id]= enemy;
                enemiesNumber--;
            }
        }  
    }

    setPosition(x,y,newObject){

        if (this.checkPosition(x,y)){
            this.gameBoard[x][y] = newObject;
            return true;
        }
        else{
            return false;
        }
        
    }


    getPosition(x,y){
        return this.gameBoard[x][y];
    }

    setNewTank(tankObject,iWidth,fWidth){
        
        var inGame=false;
        var x;
        var y;

        while(!inGame){
            x= this.getRandomPosition(fWidth,iWidth);
            y= this.getRandomPosition(this.height,0);
            if (this.gameBoard[x][y].isFree()){

                
                var type= Data.player;
                if(tankObject.playerId===-1){
                    type= Data.enemy;
                }

                tankObject.x = x;
                tankObject.y=y;

                // this.gameBoard[x][y]= tankObject;
                this.setPosition(x,y,new BoardPosition(type,tankObject,-1));
                tankObject.setIsEnable(true);
                inGame=true;
            }
        }

        return inGame;
    }

}
module.exports= Board;