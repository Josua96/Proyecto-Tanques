const Power = require('./Power.js')

class BulletDamagePower extends Power {

    constructor(image,tank,time,active,damage,imageBulletOne,imageBulletTwo){
        super(image,tank,time,active);
        this.damage=damage;
        this.imageBulletOne=imageBulletOne;
        this.imageBulletTwo= imageBulletTwo;
    }

    setPowerToActive(){
        this.applyPower(this.damage);

    }

    applyPower(damage){
        
        if(this.tank!= undefined){

            this.tank.setBulletDamage(this.tank.getBulletDamage() + damage);
            this.tank.setBulletImage(this.imageBulletTwo);
            var that=this;
            setTimeout(function () {

                if (that.tank!= undefined){

                    that.tank.setBulletDamage(that.tank.getBulletDamage() - damage);
                    that.tank.setBulletImage(that.imageBulletOne);
                    that.tank.power=undefined;
                }

                
                that.active=false;
                that.activeTime=0;
              }, this.activeTime)
        }
    }
}

module.exports = BulletDamagePower;