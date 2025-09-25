import {PokemonApiHttpClient} from "../src/infrastructure/ports/api/pokemonApiHttpClient.js";
import { PokemonError } from "../src/domain/errors/PokemonError.js";
import { expect, jest } from '@jest/globals';
describe("PokemonApiHttpClient",()=> {

    test("should call API with correct url", async () => {
        const baseUrl = "https://pokeapi.co/api/v2/pokemon";
        const fetchFnMock = jest.fn().mockResolvedValue(
            {
                ok: true,
                json: jest.fn().mockResolvedValue({ name: "pikachu" }),
            }
        );
        const pokemon = "pikachu";

        const client = new PokemonApiHttpClient(baseUrl, fetchFnMock);

        await client.fetchPokemonByName(pokemon);

        expect(fetchFnMock).toHaveBeenCalledWith(`${baseUrl}/${pokemon}`);
    });

    test("should retuns data response with success",async()=>{

        const baseUrl = "https://pokeapi.co/api/v2/pokemon";
        mockData ={"name":"pikachu","height":4}
        const fetchFnMock= jest.fn().mockReturnValue(
            {
                ok: true,
                json: jest.fn().mockReturnValue(mockData)
            }
        );
        const pokemon = "pikachu";

        const client = new PokemonApiHttpClient(baseUrl,fetchFnMock);

        result = await client.fetchPokemonByName(pokemon);

        expect(fetchFnMock).toHaveBeenCalledWith(`${baseUrl}/pikachu`);
        
        expect(result).toEqual(mockData);
    });

});