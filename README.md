
# Custom Pokemon Service

## What is it?

The Custom Pokemon Service is a service that creates a customized pokemon based in PokeAPI data with extras attributtes saved in database. This extras attributtes are: nickname, powerLevel and favorite. The pokemon result after this combination is a enriched pokemons wit following structure:

```bash
id: ID!
name: String!
height: Int
weight: Int
types: [String!]!
# Atributos extras (MongoDB)
nickname: String
favorite: Boolean
powerLevel: Int
```

## Goal

Develop a GraphQL API in Node.js that:
1. Integrates with [PokeAPI](https://pokeapi.co/).
2. Allows for paginated Pokémon listings, enriched with additional attributes saved in MongoDB.
3. Allows for registering and updating additional Pokémon attributes in MongoDB.
4. Contains unit tests implemented with Jest.

## Tecnical Requirements

- Node.js (minimum v16)
- GraphQL (Apollo Server or Yoga)
- MongoDB (Mongoose or native driver)
- Jest for testing
- Integration with PokeAPI to retrieve official Pokémon data

##

## Instalation

## How to run?

## Future Improvemets






