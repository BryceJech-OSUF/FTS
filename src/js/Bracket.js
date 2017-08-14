'use strict';

function Bracket(opts){
    this.doubles = opts.isDoubles || false;
    this.players = [];
}

Bracket.prototype.addPlayer = function(id){
    this.players.push(id);
}

Bracket.prototype.removePlayer = function(id){
    let index = this.players.indexOf(id);

    if(index != -1){
        this.players = this.players.slice(0, index).concat(this.players.slice(index + 1));
    }
}

Bracket.prototype.finalize = function(){
    if(this.isDoubles && this.numPlayers % 2 != 0){
        throw new Error('Must have even number of players to play doubles');
    }
    this.numPlayers = this.players.length;
    this.numTeams = (function(numPlayers, isDoubles){
        if(isDoubles){
            numPlayers = numPlayers / 2;
        }

        for(let exp = 1; ;exp++){
            if(Math.pow(2, exp) >= numPlayers) return Math.pow(2, exp);
        }

    })(this.numPlayers, this.isDoubles);

    return this;
}
