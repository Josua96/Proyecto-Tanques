
const Power = require('./Power.js')

class GhostPower extends Power {

    constructor(image,tank,time,active){
        super(image,tank,time,active);
    }
    
    setPowerToActive(){

        this.applyPower();
    }

    applyPower(){
        
        if(this.tank!= undefined){
            this.tank.setCanCrossObstacles(true);
            var that=this;
            setTimeout(function () {

                if (that.tank!= undefined){
                    that.tank.setCanCrossObstacles(false);
                    that.tank.power=undefined;
                }

                
                that.active=false;
                that.activeTime=0;
              }, this.activeTime)
        }
    }
}

module.exports = GhostPower;