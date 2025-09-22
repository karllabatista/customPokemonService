class PokemonRepositoryError extends Error{

    constructor(message){
        super(message);
        this.name = "PokemonRepositoryError";

    }
}

export {"PokemonRepositoryError"}