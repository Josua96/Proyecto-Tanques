const Power = require('./Power.js')

class LifeEnhancePower extends Power {

    constructor(image,tank,time,active,lifeValue){
        super(image,tank,time,active);
        this.lifeValue= lifeValue;
    
    }

    
    setPowerToActive(){

        this.applyPower(this.lifeValue);

    }

    applyPower(lifeValue){
        if (this.tank!=undefined){
            this.tank.increaseLife(lifeValue);
        }

        this.active=false;
        this.activeTime=0;
    }
}

module.exports = LifeEnhancePower;