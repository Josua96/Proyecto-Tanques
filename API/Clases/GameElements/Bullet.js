const Data = require ('../../Data.js');

class Bullet{

	constructor(id,image,type,damage,speed,direction,x,y,isEnable){
		
		/****************************
		General information
		*****************************/

        this.id=id;
        this.type= type;
        this.image= image;
        //in miliseconds
        this.speed=speed;
        this.damage=damage;
        this.isEnable=true;
		
		/****************************
		ActionsControl
        *****************************/
        this.direction= direction;
        this.x=x;
        this.y=y;
        this.isEnable=true;
        this.endMovement=false;
	
    }

    setEndMovement(value){
        this.endMovement=true;
    }

    getEndMovement(){
        return this.endMovement;
    }
    

    getIsEnable(){
        return this.isEnable;
    }

    getSpeed(){
        return this.speed;
    }

    setIsEnable(value){
        this.isEnable= value;
    }

    getType(){
        return this.type;
    }

    getDirection(){
        return this.direction;
    }

    getImage(){
        return this.image;
    }

    getDamage(){
        return this.damage;
    }



    //determinar la dirección donde la bala tiene que aparecer con respecto al tanque
    setDirection(tank){
        this.direction=tank.getDirection();
        
        if (this.direction === Data.left){
            this.x=tank.x;
            this.y= tank.y-1;

        }
        else if (this.direction === Data.up){
            this.x=tank.x-1;
            this.y= tank.y;
        }
        else if (this.direction === Data.right){
            this.x=tank.x;
            this.y= tank.y+1;

        }
        //hacia abajo
        else{
            this.x=tank.x+1;
            this.y= tank.y;
        }

    }

    getIsEnable(){
        return this.isEnable;
    }

    setIsEnable(value){
        this.isEnable = value;
    }

    moveBullet(){
        if(this.direction==0){
            this.y = this.y-1;
        }
        else if (this.direction==1){
            this.x = this.x-1;
        }
        else if(this.direction==2){
            this.y=this.y+1;
        }
        else{
            this.x =this.x+1;
        }
    }



}
module.exports= Bullet;