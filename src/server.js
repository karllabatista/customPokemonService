import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./interfaces/graphql/schemas/index.js";
import { pokemonResolver } from "./interfaces/graphql/resolvers/pokemonResolver.js";
import { context } from "./interfaces/graphql/context.js";


const server = new ApolloServer({ typeDefs,  resolvers: pokemonResolver  });

const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 4000 } });

console.log(`Servidor rodando em: ${url}`);