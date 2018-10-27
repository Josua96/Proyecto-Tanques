
class Power{

    
    constructor(image,tank,time,active){
        //in miliseconds
        this.image= image;
        this.tank= tank;
        this.activeTime=time;
        this.active=active;
        this.x=0;
        this.y=0;
    }

    setTank(tankObject){
        this.tank= tankObject;
    }

    isActive(){
    	return this.active;
    }

    destroy(){
        return this.activeTime===0;
    }

    getImage(){
        return this.image;
    }
    

}

module.exports= Power;