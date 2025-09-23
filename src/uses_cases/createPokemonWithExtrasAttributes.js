
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

            //bussiness rule btw 1 and 100 - first  checked
            // if (inputDTO.powerLevel <1 || inputDTO.powerLevel > 100){

            //     throw new PokemonError(" The power Level must be between 1 and 100")

            // }

        
            //create a customizedPokemon
            let customizedPokemon = new Pokemon(inputDTO.pokemonName,
                                            inputDTO.nickname,
                                            inputDTO.favorite,
                                            inputDTO.powerLevel        
                                );

            
            //find if pokemons exists and  check details

            //check pokemon power level
            const existing = await this.repositoryPokemon.findByName(customizedPokemon.pokemonName);

            // se retorna algo entao pokemon exists
            ///pega power level do banco e soma com novo power
            ///aplica regra de negocio
            ////se passar na regra 
            ////manda pra funcao de save
            ////nessa funcao resove como salva

            let newPowerLevel = null;
            if (existing){

                newPowerLevel = customizedPokemon.powerLevel + existing.powerLevel;

                //business rule power level
                if (newPowerLevel < 1 || newPowerLevel >100){
                    throw new PokemonError(" The power Level must be between 1 and 100")
                }

                customizedPokemon.powerLevel =  newPowerLevel;
            }

            // Só podem existir no máximo 3 Pokémons marcados como favoritos no
            // MongoDB.
            // Se o usuário tentar adicionar um 4º favorito, a mutation deve retornar erro.

            //passou da regra 1
            // vamos para regra 2
            // do favorite
            // vai no banco e conta total de favorite com true
            // se o total de favorite > 3
            //nao manda o pokemon c para o save

            let totalPokemonsFavorites = await this.repositoryPokemon.countFavorites();
            //console.log("favorite type:", typeof customizedPokemon.favorite, customizedPokemon.favorite);

            // //business rule  favorite >3
            if (totalPokemonsFavorites >= 3){

                throw new PokemonError("Already exists three pokemons marked as favorite. Impossible save");
            }
                    
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