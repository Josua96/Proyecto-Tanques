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
        this.isEnable=true;
		
		/****************************
		ActionsControl
        *****************************/
        this.direction= direction;
        this.x=x;
        this.y=y;
	
    }

    getIsEnable(){
        return this.isEnable;
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

    moveBullet(){

    }

    setDirection(tank){

    }

    


}
module.exports= Bullet;