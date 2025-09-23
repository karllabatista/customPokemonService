import { CreatePokemonWithExtrasAttributesUseCase } from "../../../uses_cases/createPokemonWithExtrasAttributes.js";
import { PokemonFactory } from "../../../infrastructure/factory/pokemonFactory.js";
export const pokemonResolver ={

    Mutation:{

        createPokemonAttributes: async (_, { input }, { createPokemonUc }) => {
            try {
                const inputDTO = PokemonFactory.fromInput(input);
                console.log("[Resolver] DTO:", inputDTO);
                return await createPokemonUc.execute(inputDTO);
            } catch (err) {
                console.error("[Resolver] Error creating Pokemon:", err);
                throw new Error(err.message); // Apollo vai mostrar o erro
            }
        }
    },
    
    
    Query:{

        pokemons: async(_,{input},{listPokemonsUc}) =>{

            try{
                //TODO DTO
                return await listPokemonsUc.execute(input);
            }catch(err){
                console.error("[Resolver ListPokemons] Error to fetch pokemons:", err);
                throw new Error(err.message); // Apollo vai mostrar o erro
            }

        }

    }
}



