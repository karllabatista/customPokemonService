import {PokemonApiPort} from "../../../domain/ports/api/PokemonApi.js";
import {PokemonError} from "../../../domain/errors/PokemonError.js";

class PokemonApiHttpClient extends PokemonApiPort{

    constructor(baseUrl,fetchFn = fetch){
        super();
        this.baseUrl = baseUrl;
        this.fetchFn = fetchFn;
    }

    async fetchPokemonByName(pokemonName) {

        try {
            const response = await this.fetchFn(`${this.baseUrl}/${pokemonName}`);
            
            if (!response.ok) {
                throw new PokemonError("Pokemon not exists in PokeAPI");
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error to find Pokemon:", error.message);
            throw error;
        }
    }
 
}
export { PokemonApiHttpClient };