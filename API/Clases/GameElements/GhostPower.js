
const Power = require('./Power.js')

class GhostPower extends Power {

    constructor(image,tank,time,active){
        super(image,tank,time,active);
    }

    applyPower(){
        
        if(this.tank!= undefined){

            this.tank.setCanCrossObstacles(true);
            setTimeout(function () {

                if (this.tank!= undefined){
                    this.tank.setCanCrossObstacles(false);
                }
                this.active=false;
              }, this.time)
        }
    }
}

module.exports = GhostPower();