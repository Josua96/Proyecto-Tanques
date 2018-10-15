const Power = require('./Power.js')

class LifeEnhancePower extends Power {

    constructor(image,tank,time,active,lifeValue){
        super(image,tank,time,active);
    
    }

    applyPower(lifeValue){
        if (this.tank!=undefined){
            this.tank.increaseLife(lifeValue);
        }

        this.active=false;
    }
}

module.exports = LifeEnhancePower();