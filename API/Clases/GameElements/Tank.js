

class Tank{

	constructor(id,playerID,type,bulletDamage,x,y,leftImage,upImage,rightImage, downImage,bulletImage,isEnable){
		
		/****************************
		General information
		*****************************/

		this.id= id;
		this.playerId=playerID;
		this.x=x;
		this.y=y;
		this.type= type;

		this.life=100;
		this.power= undefined;
		this.isEnable= false;

		/****************************
		ActionsControl
		*****************************/
		//in miliseconds
		this.bulletSpeed=  500;
		this.direction=-1;
		this.nextDirection=-1;

		this.imagesNames=[leftImage,upImage,rightImage, downImage,bulletImage];
		this.imageInUse=this.imagesNames[0];
		this.bulletDamage= bulletDamage;
		this.canCrossObstacles=false;
		this.isImmune=false;
		this.isEnable=false;

	}


	getIsEnable(){
		return this.isEnable;
	}

	setIsEnable(value){
		this.isEnable= value;
	}

	setPower(powerObject){
		this.power= powerObject;
	}

	applyPower(){

		if (this.power!= undefined && !this.power.isActive()){
			this.power.setPowerToActive();
		}
	}

	getIsEnable(){
		return this.isEnable;
	}

	setDirection(direction){
		this.direction=direction;
	}

	setNextDirection(direction){
		this.nextDirection=direction;
		this.isEnable=false;
	}

	getNextDirection(){
		return this.nextDirection;
	}


	getDirection(){
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

	getImage(){
		return this.imageInUse;
	}

	increaseLife(value) {
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