import { PokemonError } from "../errors/PokemonError.js";

function validatorPowerLevel(newPowerLevel){
  if (newPowerLevel < 1 || newPowerLevel >100){

        throw new PokemonError(" The power Level must be between 1 and 100")
    }


}
function validatorFavoritePokemons(extistedPokemon,customizedPokemon,totalPokemonsFavorites){
  if (extistedPokemon){
      // exists in bd
      if( !extistedPokemon.favorite && customizedPokemon.favorite==true && totalPokemonsFavorites>=3){

              throw new PokemonError("Already exists three pokemons marked as favorite. Impossible save");
          }

      }else{
          //new pokemom with favorite equals true but  totalPokemonsFavorites>=3
          if (customizedPokemon.favorite && totalPokemonsFavorites>=3 ){
              throw new PokemonError("Already exists three pokemons marked as favorite. Impossible save");
          }
      }

  }
export {validatorPowerLevel,validatorFavoritePokemons};