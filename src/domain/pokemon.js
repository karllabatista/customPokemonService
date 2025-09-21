
class Pokemon{

    constructor(id,name,height,weight,types,nickname = null,favorite=false,powerLevel=1){

        if (!id ||!name|| !height|| !weight){

            throw new Error("Invalid attributes to Pokemon")

        }

        if (!Array.isArray(types) || types.length === 0) {
            throw new Error("Pokemon must have at least one type");
        }

        this.id = id;
        this.name = name;
        this.height=height;
        this.weight = weight;
        this.types = types;
        this.nickname = nickname; //optional
        this.favorite = favorite; //optional
        this.powerLevel = powerLevel; //optional

        
    }

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
