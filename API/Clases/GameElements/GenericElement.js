
//works for walls and eagle
class GenericElement{

	constructor(image,life,x,y){
		
		/****************************
		General information
        *****************************/
        this.image= image;
        this.life=life;

		/****************************
		ActionsControl
        *****************************/
        this.x=x;
        this.y=y;
	
    }

    getType(){
        return this.type;
    }

    getImage(){
        return this.image;
    }

    decreaseLife(damage){
        if (this.life  > 0){
            this.life-= damage;
        }
    }

    destroy(){
        return this.life<=0;
    }

    
    



}
module.exports= GenericElement;