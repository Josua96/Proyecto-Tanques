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
    private width: number;
    private height:number;
    private boardArray: Array<any>;
    
    /**
     * 
     * @param canvas Objeto canvas donde se va a dibujar     
     * @param animatedObjects Lista de objetos que se tienen que pintar
     * @param eventListener visor de eventos del teclado
     */
    constructor(canvas:HTMLCanvasElement,animatedObjects:any, eventListener:InputHandler,width:number,height:number){

        this.canvas =  canvas;
        this.width=width+2;
        this.height= height+2;
       // this.canvas.width=this.width*30;
       // this.canvas.height= this.height*30;

        this.animatedObjects = animatedObjects; 
        this.eventListener = eventListener;         
        this.boardDrawer = canvas.getContext('2d'); 
        this.createEdges();
    }

    
    
    /**
     * @summary crea los bordes del tablero. 
     */
    createEdges()
    {      
        
        var imag  = document.getElementById("edge.png");
        
        var i=0;

        for(i=0; i < 24; i++)
        {
            this.boardDrawer.drawImage(imag, i*30,0,30,30); 
            this.boardDrawer.drawImage(imag, i*30,690,30,30);                                                            
        }           
        for(i=1; i < 23; i++)
        {           
            this.boardDrawer.drawImage(imag,0, i*30,30,30);          
            this.boardDrawer.drawImage(imag,690, i*30,30,30);  

        }           
 
        
        console.log("terminé de dibujar");
        
    }

    setBoardArray(board : Array<any>){
        this.boardArray=board;
    }

    /**
     * @summary Esta funcion pinta los objetos animados en patalla.       
     */
    updateBoard(board:Array<any>)
    {     
        var width= board.length;
        var height= board[0].length;

        var i=0;
        var j=0;

        var canvasI=1;
        var canvasJ=1;
        console.log(board);
        for(i=0; i < width; i++){

            for (j=0;j <height; j++){

                console.log("posicion tablero--- "+ " i= "+ i+" j= "+j);

                console.log(board[i][j]);
                console.log("valor canvas j: "+ canvasJ);
                
                /*
                this.boardDrawer.clearRect(canvasI*30, canvasJ*30 , 30, 30);
                this.boardDrawer.drawImage(document.getElementById(board[i][j]),canvasI*30,canvasJ*30,30,30);
                */
                this.boardDrawer.clearRect(canvasJ*30, canvasI*30 , 30, 30);
                this.boardDrawer.drawImage(document.getElementById(board[i][j]),canvasJ*30,canvasI*30,30,30);

                canvasJ++;

            }
            canvasJ=1;
            canvasI++;

        }



        
       /*
        this.animatedObjects.forEach(element => {            
            var position = element.getPosition(); 
            this.boardDrawer.drawImage(element.getImage(), position.x, position.y);         
        });

        */
    }    


    /**
    * @summary Permite inicializar el tablero para que el jugador inicie. 
    */
    initialize()
    {
       // this.updateBoard();   
        this.createEdges();        
    }
}
