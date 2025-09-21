class PokemonAPI{

    /**
     * List pokemons per page
     * @param {number} page - Number of pages begginer from 1 
     * @param {number} limit  - Total of pokemons for page
     * @throws {Error} - If the method will not implemented
     */

    listPokemons(page,limit){

       throw new Error("Method 'listPokemons' must be implemented.");
    }

}

export default PokemonAPI;