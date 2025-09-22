
class Pokemon{

    constructor(pokemonName,nickname,favorite,powerLevel){

        if (!pokemonName||!nickname||!favorite||!powerLevel){

            throw new Error("Invalid attributes to Pokemon")

        }

        this.pokemonName = pokemonName
        this.nickname = nickname; 
        this.favorite = favorite; 
        this.powerLevel = powerLevel; 
    }


    powerLevelUp(){

        if (this.powerLevel >=100){
            throw new Error("Pokemon power level must be between 1 and 100");
        } 

        this.powerLevel +=1;
 
    }

    markAsFavorite(){
        this.favorite = true;
    }

}

export {Pokemon}