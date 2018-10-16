class EnemiesMovemet{
    
    constructor(players){
        this.players=players;
    }

    getNextMovement(toX,toY,tank){

    
    }

    getValidMovement(width, height, betterX, betterY){
        
    }

    selectCloserPosition(tank, players){

        var better=1000;
        var betterX=-1;
        var betterY=-1;
        var temp;
        for (var player in players) {
           
            if (dictionary.hasOwnProperty(player)) {           
                temp=Math.abs(player.x- tank.x) + Math.abs(player.y - tank.y);
                // check if player is the most closer

                if (temp < better ){
                    betterX= player.x;
                    betterY= player.y;
                    better= temp;
                }     
            }
        }



    }

}

module.exports= EnemiesMovemet;