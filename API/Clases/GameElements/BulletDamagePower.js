const Power = require('./Power.js')

class BulletDamagePower extends Power {

    constructor(image,tank,time,active,damage){
        super(image,tank,time,active);
        this.damage=damage;

    }

    setPowerToActive(){
        this.applyPower(this.damage);

    }

    applyPower(damage){
        
        if(this.tank!= undefined){

            this.tank.setBulletDamage(this.tank.getBulletDamage() + damage);
            setTimeout(function () {

                if (this.tank!= undefined){
                    this.tank.setBulletDamage(this.tank.getBulletDamage() - damage);
                }
                this.active=false;
                this.activeTime=0;
              }, this.activeTime)
        }
    }
}

module.exports = BulletDamagePower;