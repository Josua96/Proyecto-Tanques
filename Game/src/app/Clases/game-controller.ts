import { Gameobject } from "./game-object";
import { InputHandler } from '../Clases/input-handler';
import { TouchSequence } from "selenium-webdriver";
import { AnimatedObject } from "./animated-object";



export class GameController {
    private canvas:HTMLCanvasElement; 
    private edgeModel : Gameobject;
    private animatedObjects:Array<AnimatedObject>; 
    private eventListener: InputHandler; 
    private boardDrawer; 
    private inGame:boolean = true; 

    /**
     * @summary crea los bordes del tablero. 
     */
    createEdges()
    {         
        var imag  = new Image(); 
        imag.src = "../../assets/Images/estructures/pared.png";
        imag.onload
        { console.log("SE llamo"); 
            var i=0;
            for(i=0; i<24; i++)
            {
                this.boardDrawer.drawImage(imag, i*30,0); 
                this.boardDrawer.drawImage(imag, i*30,690);                                                            
            }           
            for(i=1; i<23; i++)
            {           
                this.boardDrawer.drawImage(imag,0, i*30);          
                this.boardDrawer.drawImage(imag,690, i*30);               
            }           
        }
                                
    }

    /**
     * @summary Permite inicializar el tablero para que el jugador inicie. 
     */
    initialize()
    {
        this.updateBoard();   
        this.createEdges();        
    }
    
   /**
   * @summary Esta funcion pinta los objetos animados en patalla.       
   */
    updateBoard()
    {     
        this.animatedObjects.forEach(element => {            
            var position = element.getPosition(); 
            this.boardDrawer.drawImage(element.getImage(), position.x, position.y);         
        });
    }    

    /**
     * 
     * @param canvas Objeto canvas donde se va a dibujar     
     * @param animatedObjects Lista de objetos que se tienen que pintar
     * @param eventListener visor de eventos del teclado
     */
    constructor(canvas:HTMLCanvasElement,animatedObjects:any, eventListener:InputHandler){        
        this.canvas =  canvas;         
        this.animatedObjects = animatedObjects; 
        this.eventListener = eventListener;         
        this.boardDrawer = canvas.getContext('2d'); 

    }
    

}
