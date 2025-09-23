
import { Pokemon } from "../domain/entities/Pokemon.js";
import { PokemonApiPort } from "../domain/ports/api/PokemonApi.js";
import { PokemonRepository } from "../domain/ports/repositories/PokemonRepository.js";
import { PokemonError } from "../domain/errors/PokemonError.js";
import { validatorPowerLevel } from "../domain/validators/PokemonValidator.js";
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


        
            //create a customizedPokemon
            let customizedPokemon = new Pokemon(inputDTO.pokemonName,
                                            inputDTO.nickname,
                                            inputDTO.favorite,
                                            inputDTO.powerLevel        
                                );

            
            //find if pokemons exists and  check details

            //check pokemon power level
            const existing = await this.repositoryPokemon.findByName(customizedPokemon.pokemonName);


            let newPowerLevel = null;
            if (existing){

                newPowerLevel = customizedPokemon.powerLevel + existing.powerLevel;

                //validate power level
                validatorPowerLevel(newPowerLevel);
              
                customizedPokemon.powerLevel =  newPowerLevel;
            }


            let totalPokemonsFavorites = await this.repositoryPokemon.countFavorites();
  
            if (existing){
                // exists in bd
                if( !existing.favorite && customizedPokemon.favorite==true && totalPokemonsFavorites>=3){

                    throw new PokemonError("Already exists three pokemons marked as favorite. Impossible save");

                }

            }else{
                //new pokemom with favorite equals true but  totalPokemonsFavorites>=3

                if (customizedPokemon.favorite && totalPokemonsFavorites>=3 ){
                    throw new PokemonError("Already exists three pokemons marked as favorite. Impossible save");
                }
            }

            //save this pokemon
            const pokemonDB = await this.repositoryPokemon.save(customizedPokemon);
            
            //merge data to enrichedPokemon 
            
           const enrichedPokemon = {
                id: pokemonDataApi.id,
                name: pokemonDataApi.name,         
                height: pokemonDataApi.height,       
                weight: pokemonDataApi.weight,       
                types: pokemonDataApi.types.map(t => t.type.name), 
                nickname: pokemonDB.nickname,        
                favorite: pokemonDB.favorite,        
                powerLevel: pokemonDB.powerLevel,    
                        
            };
         
            return enrichedPokemon
        } catch (error){

            if (error instanceof PokemonError) {
                // se for erro de regra de negócio, imprime e propaga direto
                console.error(`[CreatePokemonWithExtrasAttributesUseCase] Pokemon business rule failed: ${error.message}`);
                throw error;
            }else{
                console.error("[CreatePokemonWithExtrasAttributesUseCase] Failed  create a customized Pokemon");
                throw error; // se quiser propagar o erro para cima
            }

           
        }                        
    
    }
}

export {CreatePokemonWithExtrasAttributesUseCase}