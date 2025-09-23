
import { Pokemon } from "../domain/entities/Pokemon.js";
import { PokemonApiPort } from "../domain/ports/api/PokemonApi.js";
import { PokemonRepository } from "../domain/ports/repositories/PokemonRepository.js";
import { PokemonError } from "../domain/errors/PokemonError.js";
class CreatePokemonWithExtrasAttributesUseCase{


    constructor(apiPokemon,repositoryPokemon){

        if (!(apiPokemon instanceof PokemonApiPort)){

            throw new Error(`${apiPokemon} is not instance of PokemonApiPort`);

        }

        if (!(repositoryPokemon instanceof PokemonRepository)){

            throw new Error(`${apiPokemon} is not instance of PokemonApiPort`);

        }


        this.apiPokemon = apiPokemon;
        this.repositoryPokemon = repositoryPokemon;

    }

    async execute(inputDTO){


        try{
        
            // find data about pokemon in PokeAPI
            const pokemonDataApi = await this.apiPokemon.fetchPokemonByName(inputDTO.pokemonName);

            //bussiness rule btw 1 and 100
            if (inputDTO.powerLevel <1 || inputDTO.powerLevel > 100){

                throw new PokemonError(" The power Level must be between 1 and 100")

            }

        
            //create a customizedPokemon
            let customizedPokemon = new Pokemon(inputDTO.pokemonName,
                                            inputDTO.nickname,
                                            inputDTO.favorite,
                                            inputDTO.powerLevel        
                                );

                                
            //save this pokemon
            const pokemonDB = await this.repositoryPokemon.save(customizedPokemon);
            
            //merge data to enrichedPokemon 
            
           const enrichedPokemon = {
                name: pokemonDataApi.name,         
                height: pokemonDataApi.height,       
                weight: pokemonDataApi.weight,       
                types: pokemonDataApi.types.map(t => t.type.name), 
                nickname: pokemonDB.nickname,        
                favorite: pokemonDB.favorite,        
                powerLevel: pokemonDB.powerLevel,    
                id: pokemonDB._id.toString()         
            };
            //console.log(enrichedPokemon);
            return enrichedPokemon
        } catch (error){
            console.error("[CreatePokemonWithExtrasAttributesUseCase] Failed  create a customized Pokemon");
            throw error; // se quiser propagar o erro para cima
        }                        
    

    }
}

export {CreatePokemonWithExtrasAttributesUseCase}