

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
            
            setTimeout(function () {
                if (this.tank!= undefined){
                    this.tank.setIsImmune(false);
                }
                this.active=false;
                this.activeTime=0;
                
            }, this.activeTime)
        }
        
    }
}

module.exports = ImmunePower;
