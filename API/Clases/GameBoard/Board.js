
const Generic = require('../GameElements/GenericElement.js');
const Tank = require('../GameElements/Tank.js');
const FreeSpace = require('../GameElements/FreeSpace.js');
const BoardPosition= require('../BoardPosition.js');

const Data= require('../../Data.js');



class Board{

	constructor(width, height,wallsNumber, enemiesNumber){
		
		/****************************
		General information
        *****************************/

        this.width= width;
        this.height= height;

        this.gameBoard= new Array(width);
        this.initBoard();

	
    }

    getGameBoard(){
    	return this.gameboard;
    }


    initBoard(){
    	var i;
    	var j;
    	
    	for(i=0; i <this.witdh; i++){

    		this.gameBoard[i] = new Array(this.height);

    		for(j=0; j< this.height; j++){
    			
                this.gameBoard[i][j]= new BoardPosition(Data.free,new FreeSpace("image"),-1);
    			
    		}
        
        }

        //set eagle 
        var i=Math.round(this.width/2);
        this.setPosition(i,0,new BoardPosition(Data.eagle,new Generic("",100,i,0),-1));

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
                this.gameBoard[x][y].setData(Data.wall,new Generic("image",100,x,y),-1);
                wallsNumber--;
            }
        }    


        while (enemiesNumber > 0)
        {
            x= this.getRandomPosition(this.width,0);
            y= this.getRandomPosition(this.height,0);
            
            if (this.gameBoard[x][y].isFree()){
                enemy=new Tank(Object.keys(enemies).length,-1,Data.machineTank,20,x,y,"","","","","bulletImage");
                this.gameBoard[x][y].setData(Data.enemy,enemy,-1);
                enemies[enemy.id]= enemy;
                enemiesNumber--;
            }
        }  
    }

    setPosition(x,y,newObject){
        this.gameBoard[x][y]= newObject;
        return true;
    }

    setNewPlayer(playerObject){
        var inGame=false;
        var x;
        var y;

        while(!inGame){
            x= this.getRandomPosition(this.width,0);
            y= this.getRandomPosition(this.height,Math.round(this.height/2));
            if (this.gameBoard[x][y].isFree()){
                this.gameBoard[x][y]= playerObject;
                playerObject.setPosition(x,y);
                inGame=true;
            }
        }

        return inGame;
    }

}
module.exports= Board;