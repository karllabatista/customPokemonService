import { PokemonApiPort } from "../domain/ports/api/PokemonApi.js";
import { Pokemon } from "../domain/entities/Pokemon.js";
class ListPokemonsUseCase{

    /**
    * @param {PokemonAPI} repository - Implementação concreta do contrato
    */

    constructor(apiPokemon,repository){
        this.apiPokemon =apiPokemon;
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

        try{
            const pokemonsPaginatedData = await this.apiPokemon.paginatePokemons(page,limit);

            const enrichedPokemon = await Promise.all(
                pokemonsPaginatedData.results.map( async (pokemon) =>{

                    //get each pokemon of results and find your details
                    const detailedPokemon = await this.apiPokemon.fetchPokemonByName(pokemon.name);
                    //console.log(detailedPokemon);

                    //check if each pokemon in pokemonsPaginatedData exists in mongo

                    const pokemonDB = await this.repository.findByName(pokemon.name);
                    // console.log(pokemonDB)

                    return {
                        id: pokemonDB?._id.toString() || null, 
                        name: detailedPokemon.name,         
                        height:detailedPokemon.height,       
                        weight: detailedPokemon.weight,       
                        types: detailedPokemon.types.map(t => t.type.name), 
                        nickname: pokemonDB?.nickname || null,        
                        favorite: pokemonDB?.favorite || false,        
                        powerLevel: pokemonDB?.powerLevel || null,    
                    }
                }) 
            );

            return enrichedPokemon;
        

        }catch(error){
            console.error("[ListPokemonsUseCase] Failed to fetch pokemons");
            throw error;
        }

    }

}
export {ListPokemonsUseCase}