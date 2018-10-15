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
		
		/****************************
		ActionsControl
        *****************************/
        this.direction= direction;
        this.x=x;
        this.y=y;
        this.isEnable=true;
	
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

    getIsEnable(){
        return this.isEnable;
    }

    setIsEnable(value){
        this.isEnable = value;
    }

    moveBullet(){
        if(this.direction==0){
            this.x = this.x-1;
        }
        if else(this.direction==1){
            this.y = this.y+1;
        }
        if else(this.direction==2){
            this.x=this.x+1;
        }
        else{
            this.y=this.y-1;
        }
    }


}
module.exports= Bullet;