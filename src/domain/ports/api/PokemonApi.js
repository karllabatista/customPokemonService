/**
 * Contract for consumption of the Pokemon API  
 * @interface
 */

class PokemonApiPort{

    /**
     * List pokemons per page
     * @param {number} page - Number of pages begginer from 1 
     * @param {number} limit  - Total of pokemons for page
     * @returns {Promise<Array<Object>>} Pokemons List
     * @throws {Error} - If the method will not implemented
     */

    async listPokemons(page,limit){

       throw new Error("Method 'listPokemons' must be implemented.");
    }


    async fetchPokemonByName(pokemonName){

        throw new Error("Method 'fetchPokemonByName' must be implemented.");

    }


}

export default PokemonApiPort;