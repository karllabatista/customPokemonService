import { PokemonRepository } from "../../../domain/ports/repositories/PokemonRepository.js";
import { PokemonRepositoryError } from "../../../domain/errors/PokemonRepositoryError.js";
import { Collection } from "mongodb";

class MongoPokemonRepository extends PokemonRepository{
    /**
     * Implementation of MongoDB Client as Pokemon Repository
     * @param {Db} db - MongoDB database instance
     * @param {string} collectionName - Collection name
     */

    constructor(db,collectionName = "pokemons"){
        super();
        this.collection = db.collection(collectionName);
        
    }
    
    async save(customizedPokemon){
        /**
         * Save a Pokemon with attributes
         * @param {Pokemon} - A pokemon object 
         * @throws {PokemonRepositoryError} When DB operation fails
         * 
         * */

        try{

            const pokemonDoc = {
                pokemonName: customizedPokemon.pokemonName, 
                nickname: customizedPokemon.nickname,
                favorite: customizedPokemon.favorite,
                powerLevel: customizedPokemon.powerLevel
            };

            await this.collection.insertOne(pokemonDoc); // if collection doesn not exists, 
                                                        //create to first insert
            
            return pokemonDoc;
            
        }catch(err){
            console.error(`[MongoPokemonRepository] Error to save Pokemon: ${err.message}`);
            throw new PokemonRepositoryError(`Error to save Pokemon`);
        }
    }

}

export {MongoPokemonRepository}