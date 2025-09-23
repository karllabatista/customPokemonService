class PokemonRepository{

    async save(){

        throw new Error("Method 'save' must be implemented.");
    }

    async findByName(pokemonName){
        throw new Error("Method 'findByName' must be implemented.");
    }

    async countFavorites(){
        throw new Error("Method 'countFavorites' must be implemented.");
    
    }
}

export {PokemonRepository}