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

            // busca o pokemon existente primeiro
            const existing = await this.collection.findOne({ pokemonName: pokemonDoc.pokemonName });
            const newPowerLevel = existing ? existing.powerLevel + pokemonDoc.powerLevel : pokemonDoc.powerLevel;

            if (newPowerLevel < 1 || newPowerLevel > 100) {
                throw new PokemonError("The power Level must be between 1 and 100 after update");
            }

            await this.collection.updateOne(
                { pokemonName: pokemonDoc.pokemonName },
                {
                    $set: {
                        nickname: pokemonDoc.nickname,
                        favorite: pokemonDoc.favorite,
                        powerLevel: newPowerLevel
                    }
                },
                { upsert: true }
            );

            // busca o documento atualizado
            const savedPokemon = await this.collection.findOne({ pokemonName: pokemonDoc.pokemonName });

            return savedPokemon;

            
        }catch(err){
            console.error(`[MongoPokemonRepository] Error to save Pokemon: ${err.message}`);
            throw new PokemonRepositoryError(`Error to save Pokemon`);
        }
    }

}

export {MongoPokemonRepository}