import { PokemonRepository } from "../../../domain/ports/repositories/PokemonRepository.js";
import { PokemonRepositoryError } from "../../../domain/errors/PokemonRepositoryError.js";
import { Collection } from "mongodb";
import { PokemonError } from "../../../domain/errors/PokemonError.js";

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

           // await this.collection.insertOne(pokemonDoc);

            await this.collection.updateOne(
                { pokemonName: pokemonDoc.pokemonName },
                {
                    $set: {
                        nickname: pokemonDoc.nickname,
                        favorite: pokemonDoc.favorite,
                        powerLevel: pokemonDoc.powerLevel
                    }
                },
                { upsert: true }
            );

            // busca o documento atualizado
            const savedPokemon = await this.collection.findOne({ pokemonName: pokemonDoc.pokemonName });

            return savedPokemon;

            
        }catch(err){
            
            console.error(`[MongoPokemonRepository] Error to save Pokemon: ${err.message}`);
            throw new PokemonRepositoryError(`Error to save Pokemon: ${err.message}`);
        }
    }

    async findByName(pokemonName){

        const existingPokemon = await this.collection.findOne({ pokemonName: pokemonName });

        return existingPokemon;      
        
    }

}

export {MongoPokemonRepository}