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
            console.error("[PokemonApiHttpClient] Error to find Pokemon:", error.message);
        }
    }

    async paginatePokemons(page,limit){

        // offset = posição_inicial
        // limit = quantos_pokemons_deseja
        try {
            
            //calculate offset using page
            const offset = (page-1) * limit;
            const response = await this.fetchFn(`${this.baseUrl}?limit=${limit}&offset=${offset}`);

            const data = await response.json();
            return data;
            
        } catch (error) {

            console.error("[PokemonApiHttpClient] Error to retrieve pokemons:", error.message);
            throw new PokemonError("[PokemonApiHttpClient] Error to retrieve pokemons");
            
        }
        
    }
 
}
export { PokemonApiHttpClient };