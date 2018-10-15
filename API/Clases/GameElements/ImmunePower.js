

const Power = require('./Power.js')

class ImmunePower extends Power {

    constructor(image,tank,time,active){
        super(image,tank,time,active);
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
            }, this.time)
        }
        
    }
}

module.exports = ImmunePower();
