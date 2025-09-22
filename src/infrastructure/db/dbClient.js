import { MongoClient } from "mongodb";
import dotenv from "dotenv";

class MongoDBClient{
    /**
     * Manages the communicate between client and MongoDB 
     *
     */

    constructor(mongo_uri){
        /**
         * @param {} mongo_uri - It is the connection string address of pokemon collection
         *                      loadded by env variables
         *  @throws {Error} - When mongo URI is not setted
         */

        if (!mongo_uri){
            throw new Error("MongoDB URI is required to start MongoDBClient");

        }

        this.client = new MongoClient(mongo_uri);
        
    }

    async connect(){

        if (!this.client.topology?.isConnected()){
            await this.client.topology?.isConnected()
            console.info("Connected to mongo");
        }else{
            console.info("Already connect to Mongo");
        }
        
        return this.client
    
    }

    getCollection(){
        const pokemonCollection = client.db().collection("pokemons");

        return pokemonCollection
    }

    async disconnect(){
        // TODO MANAGE OPEN/CLOSE CONNECT
        await this.client.close();
    }


};

export {MongoDBClient}
// async function main(){

//     dotenv.config();
//     const mongoClient = new MongoClient(process.env.MONGO_URI);

//     await mongoClient.connect();
//     console.log("✅ Conexão com MongoDB estabelecida!");
//     await mongoClient.close();

// }

// main();
