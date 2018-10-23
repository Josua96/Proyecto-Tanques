class Event{

	constructor(type, object){
        this.type= type;
        this.object= object;
        this.state= waiting;
    }

    getType(){
        return this.type;
    }

    getObject(){
        return this.object;
    }

}
module.exports= Event;