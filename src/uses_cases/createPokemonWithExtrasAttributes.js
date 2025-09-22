
import { Pokemon } from "../domain/entities/Pokemon.js";
import { PokemonApiPort } from "../domain/ports/api/PokemonApi.js";
import { PokemonRepository } from "../domain/ports/repositories/PokemonRepository.js";

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


        const enrichedPokemon = "";

        // find data about pokemon in PokeAPI
        const pokemonDataApi = await this.apiPokemon.fetchPokemonByName(inputDTO.pokemonName);
        console.log(pokemonDataApi);

        //create a customizedPokemon
        customizedPokemon = new Pokemon(inputDTO.pokemonName,
                                        inputDTO.nickname,
                                        inputDTO.favorite,
                                        inputDTO.powerLevel        
                            );

        //save this pokemon
        const pokemonDB = this.repositoryPokemon.save(customizedPokemon);


        //merge data to enrichedPokemon 
        //...............

    }
}

export {CreatePokemonWithExtrasAttributesUseCase}