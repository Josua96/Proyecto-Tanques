const Power = require('./Power.js')

class FasterShootPower extends Power {

    constructor(image,tank,time,active,velocity){
        super(image,tank,time,active);
    }

    applyPower(velocity){
        
        if(this.tank!= undefined){

            this.tank.setBulletSpeed(this.tank.getBulletSpeed() + velocity);
            setTimeout(function () {

                if (this.tank!= undefined){
                    this.tank.setBulletSpeed (this.tank.getBulletSpeed() - velocity);
                }
                this.active=false;
              }, this.time)
        }
    }
}

module.exports = FasterShootPower();