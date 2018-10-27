class Event{

	constructor(type, object,direction){
        this.type= type;
        this.object= object;
        this.direction= direction;
    }

    getType(){
        return this.type;
    }

    getObject(){
        return this.object;
    }

}
module.exports= Event;