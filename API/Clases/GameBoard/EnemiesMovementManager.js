const Data = require ('../../Data.js');


class EnemiesMovemet{
    
    constructor(players){
        this.players=players;
    }

    getNextMovement(tank,width,height){
        var destiny = this.selectCloserPosition(tank,this.players);

        if (destiny[0]!=-1){
            return -1;  //dirección inválida representa movimiento no posible
        }

        var movement= this.getValidMovement(tank,width,height,destiny[0],destiny[y]);
        if (movement.length===0){
            return -1;
        }

        return movement[2]; //retornar la dirección donde debe moverse


    }


    //retornar la dirección hacia la que debe moverse el tanque
    getValidMovement(tank,width, height, betterX, betterY){
        var temp
        var positions=[];
        var toPosition=[];
        var temp;
        var sum = 10000;
        if (tank.y-1 >= 0){
            positions.push([tank.x,tank.y-1,Data.left]);
        }

        

        if (tank.x-1 >=0){
            positions.push([tank.x-1,tank.y, Data.up]);
        }

        if (tank.y+1 < width){
            positions.push([tank.x,tank.y+1, Data.right]);
        }
        if (tank.x+1 < height){
            positions.push([tank.x+1,tank.y,Data.down]);
        }

        var i;
        for (i=0;i < positions.length; i++){

            temp= Math.abs(betterX-positions[i][0]) + Math.abs(betterY-positiosn[i][1]);
            if (temp < sum){

                toPosition[0]=positions[i][0];
                toPosition[1]=positions[i][1];
                toPosition[2]= positions[2];
                sum=temp;
            }
        }

        return toPosition;
        
    }

    

    //seleccionar el tanque que está más cerca
    selectCloserPosition(tank, players){

        var better=1000;
        var betterX=-1;
        var betterY=-1;
        var temp;
        for (var player in players) {
           
            if (players.hasOwnProperty(player) && players[player]!= undefined && players[player].getIsEnable()) {           
                temp=Math.abs(player.x- tank.x) + Math.abs(player.y - tank.y);
                // check if player is the most closer

                if (temp < better ){
                    betterX= player.x;
                    betterY= player.y;
                    better= temp;
                }     
            }
        }

        return [betterX,betterY];

    }

}

module.exports= EnemiesMovemet;