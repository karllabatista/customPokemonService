import { CreatePokemonWithExtrasAttributesUseCase } from "../../uses_cases/createPokemonWithExtrasAttributes.js";
import { PokemonApiHttpClient } from "../../infrastructure/ports/api/pokemonApiHttpClient.js";   
import { MongoPokemonRepository } from "../../infrastructure/ports/repositories/mongoPokemonRepository.js";
import { MongoDBClient } from "../../infrastructure/db/dbClient.js";
import { ListPokemonsUseCase } from "../../uses_cases/listPokemons.js";
import dotenv from "dotenv";


//LOAD ENVS
dotenv.config();
//SET PARAMS POKEMONAPI
const baseUrl ="https://pokeapi.co/api/v2/pokemon";

// Conexão única com Mongo
const mongoClient = new MongoDBClient(process.env.MONGO_URI);
await mongoClient.connect();
const db = mongoClient.useDb();

// Instancia uma vez os objetos
const repoPokemon = new MongoPokemonRepository(db);
const apiPokemon = new PokemonApiHttpClient(baseUrl);
const createPokemonUc = new CreatePokemonWithExtrasAttributesUseCase(apiPokemon, repoPokemon);
const listPokemonsUc = new ListPokemonsUseCase(apiPokemon,repoPokemon);

export const context = async () => {
  return {
    createPokemonUc,
    listPokemonsUc,
  };
};