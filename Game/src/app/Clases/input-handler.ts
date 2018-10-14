import { environment } from 'src/environments/environment';

export class InputHandler {

    private keyCodes:any;
    private playerActions: any;
    private movementDirections:any;

    constructor(){
        this.keyCodes= environment.keyCodes;
        this.playerActions= environment.playerActions;
        this.movementDirections= environment.directions;
    }

    public getAction(keyCode:Number): Object {
        if (keyCode === this.keyCodes.shoot){
            return {"validAction":true,"action": this.playerActions.shoot};
        }
        else if (keyCode=== this.keyCodes.up){
            return {"validAction":true,"action": this.playerActions.move,"direction":this.movementDirections.up};
        }
        else if (keyCode=== this.keyCodes.down){
            return {"validAction":true,"action": this.playerActions.move,"direction":this.movementDirections.down};
        }
        else if (keyCode=== this.keyCodes.left){
            return {"validAction":true,"action": this.playerActions.move,"direction":this.movementDirections.left};
        }
        else if (keyCode=== this.keyCodes.right){
            return {"validAction":true,"action": this.playerActions.move,"direction":this.movementDirections.right};
        }
        else{
            return {"validAction":false}
        }
    }
}
