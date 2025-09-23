import { PokemonError } from "../errors/PokemonError.js";

function validatorPowerLevel(newPowerLevel){
  if (newPowerLevel < 1 || newPowerLevel >100){

        throw new PokemonError(" The power Level must be between 1 and 100")
    }


}

export {validatorPowerLevel};