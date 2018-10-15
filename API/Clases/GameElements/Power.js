
class Power{

    
    constructor(image,tank,time,active){
        //in miliseconds
        this.tank= image;
        this.tank= tank;
        this.activeTime=time;
        this.active=active;
        
    }

    isActive(){
    	return this.active;
    }

}

module.exports= Power;