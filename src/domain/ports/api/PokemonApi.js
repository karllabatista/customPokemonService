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

    async paginatePokemons(page,limit){

       throw new Error("Method 'paginatePokemons' must be implemented.");
    }


    async fetchPokemonByName(pokemonName){

        throw new Error("Method 'fetchPokemonByName' must be implemented.");

    }


}
export {PokemonApiPort};