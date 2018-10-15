

class Tank{

	constructor(id,playerID,type,bulletDamage,x,y,leftImage,upImage,rightImage, downImage,bulletImage){
		
		/****************************
		General information
		*****************************/

		this.id= id;
		this.playerId=playerID;
		this.x=x;
		this.y=y;
		this.type= type;
		this.life=100;

		/****************************
		ActionsControl
		*****************************/
		//in miliseconds
		this.bulletSpeed=  500;
		this.direction=-1;
		
		this.imagesNames=[leftImage,upImage,rightImage, downImage,bulletImage];
		this.imageInUse=imagesNames[0];
		this.bulletDamage= bulletDamage;
		this.canCrossObstacles=false;
		this.isImmune=false;

	}

	setDirection(direction){
		this.direction=direction;
	}

	getDirection(direction){
		return this.direction;
	}

	setPositions(x,y){
		this.x= x;
		this.y=y;
	}

	setBulletImage(newBulletImage){
		this.imagesNames[4]=newBulletImage;
	}

	getBulletImage(){
		return this.imagesNames[4];
	}

	setBulletDamage(value){
		this.bulletDamage=value;
	}

	getBulletDamage(){
		return this.bulletDamage;
	}

	setbulletSpeed(value){
		this.bulletSpeed= value;
	}

	getBulletSpeed(){
		return this.bulletSpeed;
	}

	setCanCrossObstacles(value){
		this.canCrossObstacles=value;
	}

	getCanCrossObstacles(){
		return this.canCrossObstacles;
	}

	setIsImmune(value){
		this.isImmune= value;
	}

	getIsImmune(){
		return this.isImmune;
	}

	//index must to coincidence with UI left,right,up and down keyCodes
	setCurrentImage(index){
		thia.imageInUse= this.imageNames[index];
		
	}

	getCurrentImage(){
		return this.imageInUse;
	}

	increaseLife(value){
		this.life=value;
	}

	decreaseLife(damage){
        if (this.life  > 0){
            this.life-= damage;
        }
    }

    destroy(){
        return this.life<=0;
    }

}
module.exports= Tank;