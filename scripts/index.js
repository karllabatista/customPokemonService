import { CreatePokemonWithExtrasAttributesUseCase } from "../src/uses_cases/createPokemonWithExtrasAttributes.js";
import { PokemonApiHttpClient } from "../src/infrastructure/ports/api/pokemonApiHttpClient.js";
import { MongoPokemonRepository } from "../src/infrastructure/ports/repositories/mongoPokemonRepository.js";
import { MongoDBClient } from "../src/infrastructure/db/dbClient.js";
import dotenv from "dotenv";

// SETTING CONFIGS

//LOAD ENVS
dotenv.config();
//SET PARAMS POKEMONAPI
const baseUrl ="https://pokeapi.co/api/v2/pokemon";


const run = async ()=>{
    //CONNECT TO MONGO SERVER
    const mongoClient = new MongoDBClient(process.env.MONGO_URI);
    await mongoClient.connect();

    //CONNECT AND USER DB
    const db = mongoClient.useDb();

    let input={
            pokemonName: "ditto",
            nickname: "pika-pik",
            favorite: true,
            powerLevel: 2
    }

    const repoPokemon = new MongoPokemonRepository(db);
    const apiPokemon = new PokemonApiHttpClient(baseUrl);

    const createPokemonUc = new CreatePokemonWithExtrasAttributesUseCase(apiPokemon,repoPokemon)
    
    try{
        const result = await createPokemonUc.execute(input)
        console.log(result);

    }catch (error) {
        console.error('Erro to create Pokemon:', error);
    }
    
   

    //DISCONECT TO BD
    await mongoClient.disconnect()

};

run();




