import PokemonApiPort from "../../../domain/ports/api/PokemonApi.js";


class PokemonApiHttpClient extends PokemonApiPort{

    constructor(baseUrl){
        super();
        this.baseUrl = baseUrl;
    }

    async fetchPokemonByName(pokemonName) {

        try {
            const response = await fetch(`${this.baseUrl}/${pokemonName}`);
            
            if (!response.ok) {
                console.error("Pokemon not found");
                throw new Error("Pokemon not exists in PokeAPI");
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error to find Pokemon:", error.message);
            throw error;
        }
    }
 
}
