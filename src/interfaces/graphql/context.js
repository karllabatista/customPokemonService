import { CreatePokemonWithExtrasAttributesUseCase } from "../../uses_cases/createPokemonWithExtrasAttributes.js";
import { PokemonApiHttpClient } from "../../infrastructure/ports/api/pokemonApiHttpClient.js";   
import { MongoPokemonRepository } from "../../infrastructure/ports/repositories/mongoPokemonRepository.js";
import { MongoDBClient } from "../../infrastructure/db/dbClient.js";

import dotenv from "dotenv";

//LOAD ENVS
dotenv.config();
//SET PARAMS POKEMONAPI
const baseUrl ="https://pokeapi.co/api/v2/pokemon";

export const context = async () =>{

    //CONNECT TO MONGO SERVER
    const mongoClient = new MongoDBClient(process.env.MONGO_URI);
    await mongoClient.connect();

    //CONNECT AND USER DB
    const db = mongoClient.useDb();

    const repoPokemon = new MongoPokemonRepository(db);
    const apiPokemon = new PokemonApiHttpClient(baseUrl);

    const createPokemonUc = new CreatePokemonWithExtrasAttributesUseCase(apiPokemon,repoPokemon);
    console.log("entrou aqui");
    //DISCONECT TO BD
    //await mongoClient.disconnect();


    return{
        createPokemonUc,
    };
    

};