import { CreatePokemonWithExtrasAttributesUseCase } from "../../../uses_cases/createPokemonWithExtrasAttributes.js";

export const pokemonResolver ={

    Mutation:{

        createPokemonAttributes: async (_,args,{createPokemonUc}) =>{

            return await createPokemonUc.execute(args)

        }
    }
};