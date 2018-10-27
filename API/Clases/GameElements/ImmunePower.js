

const Power = require('./Power.js')

class ImmunePower extends Power {

    constructor(image,tank,time,active){
        super(image,tank,time,active);
        
    }

    setPowerToActive(){

        this.applyPower();
    }

    applyPower(){
        if (this.tank!=undefined){
            this.tank.setIsImmune(true);
            
            var that=this;

            setTimeout(function () {
                
                if (that.tank!= undefined){
                    that.tank.setIsImmune(false);
                    that.tank.power=undefined;
                }

                
                that.active=false;
                that.activeTime=0;
                
            }, this.activeTime)
        }
        
    }
}

module.exports = ImmunePower;
