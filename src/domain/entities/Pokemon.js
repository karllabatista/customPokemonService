
class Pokemon{

    constructor(pokemonName,nickname,favorite,powerLevel){

        if (!pokemonName||!nickname||powerLevel == null || typeof favorite !== "boolean"){

            throw new Error("Invalid attributes to Pokemon")

        }

        this.pokemonName = pokemonName
        this.nickname = nickname; 
        this.favorite = favorite; 
        this.powerLevel = powerLevel; 
    }

}

export {Pokemon}