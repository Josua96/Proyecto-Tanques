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
        
        var that= this;

        if (that.tank!=undefined){
            that.tank.increaseLife(lifeValue);
            that.tank.power=undefined;
        }

        that.active=false;
        that.activeTime=0;
    }
}

module.exports = LifeEnhancePower;