class PokemonError extends Error{
    constructor(message){
        super(message);
        this.name = "PokemonError";
    }
}

export {PokemonError};