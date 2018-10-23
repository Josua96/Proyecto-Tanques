import { Gameobject } from "./game-object";

export class AnimatedObject extends Gameobject
{
    public images; 

    /**     
     * @param imageDefault Imagen por defecto 
     * @param images Lista de images que cambiaran segun el estado
     * @param position Posicion actual del objeto. 
     */

    constructor(imageDefault:HTMLImageElement, images, position:any)
    {
        super(imageDefault, position); 
        this.images = images;     
    }

    
    /**
     * @summary Permite cambiar la imagen del objeto
     * @param image Posicion en el array de imagenes 
     */
    changeImage(image:number)
    {
        this.image = this.images[image]; 
    }
}
