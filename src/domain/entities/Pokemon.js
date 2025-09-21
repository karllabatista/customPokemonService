
class Pokemon{


    powerLevelUp(){

        if (this.powerLevel >=100){
            throw new Error("Pokemon power level must be between 1 and 100");
        } 

        this.powerLevel +=1;
 
    }

    markAsFavorite(){
        this.favorite = true;
    }

}

module.exports = Pokemon;