const Power = require('./Power.js')

class FasterShootPower extends Power {

    constructor(image,tank,time,active,velocity){
        super(image,tank,time,active);
        this.velocity=velocity;
    }

    setPowerToActive(){

        this.applyPower(this.velocity);
    }

    applyPower(velocity){
        
        if(this.tank!= undefined){

            this.tank.setBulletSpeed(this.tank.getBulletSpeed() - velocity);

            var that=this;

            setTimeout(function () {

                if (that.tank!= undefined){
                    that.tank.setBulletSpeed (that.tank.getBulletSpeed() + velocity);
                    that.tank.power=undefined;
                }

                that.active=false;
                that.activeTime=0;

              }, this.activeTime)
        }
    }
}

module.exports = FasterShootPower;