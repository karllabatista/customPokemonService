import {gql} from 'graphql-tag'

export const pokemonTypeDefs = gql`
type Pokemon {
id: ID!
name: String!
height: Int
weight: Int
types: [String!]!
nickname: String
favorite: Boolean
powerLevel: Int
}

input PokemonAttributesInput {
pokemonName: String!
nickname: String
favorite: Boolean
powerLevel: Int
}

type Query{
    getPokemons:[Pokemon!]!

}
type Mutation{
    
createPokemonAttributes(input: PokemonAttributesInput!): Pokemon!
}

`;

