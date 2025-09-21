import PokemonAPI from "../domain/ports/api/PokemonApi";
class ListPokemonUseCase{

    /**
    * @param {PokemonAPI} repository - Implementação concreta do contrato
    */

    constructor(repository){
        this.repository = repository;
    }


    /**
     * List pokemons per page
     * @param {number} page - Number of pages begginer from 1 
     * @param {number} limit  - Total of pokemons for page
     * @returns {Promise<Array<Object>>} Pokemons List
     * @throws {Error} - If the method will not implemented
     */

    async listPokemons(page,limit){

        if (!Number.isInteger(page) || page < 1){

            throw new Error("Page must be a positive number");

        }

        if (!Number.isInteger(page) || page < 1){

            throw new Error("Limit must be a positive number");

        }

        return await this.repository.listPokemons(page,limit);

    }
}