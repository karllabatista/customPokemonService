const Pokemon = require("./Pokemon");

describe("Pokemon Entity", () => {


    test("shoud create a Pokemon with valid attributes",()=> {
        
        const pikachu = new Pokemon(1,"Pikachu",4,60,["eletric"]);
        
        expect(pikachu.name).toBe("Pikachu");
        expect(pikachu.height).toBe(4);
        expect(pikachu.weight).toBe(60);
        expect(pikachu.types).toContain("eletric");
    
    });

  
    test("should throw error whem missing required attributes",()=>{

        expect(()=>{
            const pikachu = new Pokemon(1,"Pikachu",60,["eletric"]);
        }).toThrow();

    });

 
    test("should throw error whem types is not provided",()=>{

        expect(()=>{
            const pikachu = new Pokemon(1,"Pikachu",4,60);
        }).toThrow();

    });

} );

