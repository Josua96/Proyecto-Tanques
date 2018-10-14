export class InanimatedObject {    
    public position ; 
    public image; 

    constructor(position:any, image:string)
    {
        this.position = position;
        this.image = new Image();
        this.image.src = image; 
    }
}
