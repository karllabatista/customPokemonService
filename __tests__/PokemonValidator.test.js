import { validatorPowerLevel, validatorFavoritePokemons } from "../src/domain/validators/PokemonValidator.js";
import { PokemonError } from "../src/domain/errors/PokemonError.js";

describe("validatorPowerLevel", () => {
  test("should not throw error when power level is within range", () => {
    expect(() => validatorPowerLevel(50)).not.toThrow();
    expect(() => validatorPowerLevel(1)).not.toThrow();
    expect(() => validatorPowerLevel(100)).not.toThrow();
  });

  test("should throw error when power level is less than 1", () => {
    expect(() => validatorPowerLevel(0)).toThrow(PokemonError);
    expect(() => validatorPowerLevel(-5)).toThrow(" The power Level must be between 1 and 100");
  });

  test("should throw error when power level is greater than 100", () => {
    expect(() => validatorPowerLevel(101)).toThrow(PokemonError);
    expect(() => validatorPowerLevel(999)).toThrow(" The power Level must be between 1 and 100");
  });
});

describe("validatorFavoritePokemons", () => {
  test("should not throw error when adding a favorite Pokémon and there are less than 3 favorites", () => {
    const existing = null;
    const customized = { favorite: true };
    const totalFavorites = 2;

    expect(() => validatorFavoritePokemons(existing, customized, totalFavorites)).not.toThrow();
  });

  test("should throw error when trying to add a new favorite Pokémon when there are already 3 favorites", () => {
    const existing = null;
    const customized = { favorite: true };
    const totalFavorites = 3;

    expect(() => validatorFavoritePokemons(existing, customized, totalFavorites))
      .toThrow("Already exists three pokemons marked as favorite. Impossible save");
  });

  test("should not throw an error when saving an existing Pokémon that remains unfavorite", () => {
    const existing = { favorite: false };
    const customized = { favorite: false };
    const totalFavorites = 3;

    expect(() => validatorFavoritePokemons(existing, customized, totalFavorites)).not.toThrow();
  });

  test("should throw error when trying to update an existing Pokémon to favorite when there are already 3 favorites", () => {
    const existing = { favorite: false };
    const customized = { favorite: true };
    const totalFavorites = 3;

    expect(() => validatorFavoritePokemons(existing, customized, totalFavorites))
      .toThrow("Already exists three pokemons marked as favorite. Impossible save");
  });

  test("should not throw error when updating existing Pokémon that was already favorited", () => {
    const existing = { favorite: true };
    const customized = { favorite: true };
    const totalFavorites = 3;

    expect(() => validatorFavoritePokemons(existing, customized, totalFavorites)).not.toThrow();
  });
});
