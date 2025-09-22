class PokemonFactory{

    static fromInput(input){


        return {
            pokemonName: input.pokemonName,
            nickname: input.nickname,
            favorite: input.favorite || false,
            powerLevel: input.powerLevel || 1
        }
    }
}