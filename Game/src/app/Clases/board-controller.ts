export class BoardController {

    private boardManager: HTMLCanvasElement;
    private  boardDrawer :CanvasRenderingContext2D;
    private width: number;
    private height: number;


    constructor(board:HTMLCanvasElement, width:number,height:number){
        this.boardManager=board;
        this.boardDrawer= this.boardManager.getContext('2d');
        this.width= width;
        this.height= height;
        this.boardManager.width = this.width;
        this.boardManager.height= this.height;
    }

    
    public  updateBoard(boardUpdated:Number[]): void{
        return;
    }


}
