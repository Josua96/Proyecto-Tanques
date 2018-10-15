export class Gameobject {
    public image;
    public position;     
    
    /**
     * @summary Constructor de la clase game object
     * @param {Image} images: imagenes que seran usadas para pintar en la pantalla.           
     * @param {Json} position:posicion del objeto en el canvas.
     */
    constructor(image,position)
    {
        this.image = image; 
        this.position = position;         
    }

    /**
     * @summary Permite obtener la posicion de un objeto actual 
     * @returns Json con las posiciones {x=?,y=?}
     */
    getPosition()
    {
        return this.position; 
    }

    getImage()
    {
        return this.image; 
    }
}
