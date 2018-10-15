class Bullet{

	constructor(id,image,type,damage,speed,direction,x,y){
		
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


}
module.exports= Bullet;