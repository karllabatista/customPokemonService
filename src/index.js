import { CreatePokemonWithExtrasAttributesUseCase } from "./uses_cases/createPokemonWithExtrasAttributes.js";
import { PokemonApiHttpClient } from "./infrastructure/ports/api/pokemonApiHttpClient.js";
import { MongoPokemonRepository } from "./infrastructure/ports/repositories/mongoPokemonRepository.js";
import { MongoDBClient } from "./infrastructure/db/dbClient.js";
import dotenv from "dotenv";

// SETTING CONFIGS

//LOAD ENVS
dotenv.config();

// Config db
const mongoClient = new MongoDBClient(process.env.MONGO_URI);
await mongoClient.connect();


// SET PARAMS OF INFRA
const baseUrl ="https://pokeapi.co/api/v2/pokemon";
let collection = mongoClient.getCollection();
let input="pikachu";

// SET PARAMNS OF UC
const apiPokemon = new PokemonApiHttpClient(baseUrl);
const repoPokemon = new MongoPokemonRepository(collection);

// CALL UC
const createPokemonUc = new CreatePokemonWithExtrasAttributesUseCase(apiPokemon,repoPokemon)


await createPokemonUc.execute(input)

//DISCONECT TO BD
await mongoClient.disconnect()