
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Database {

    constructor(user, password) {


        this._user = user;
        this._password = password;
        // Stringa di connessione per MongoDB Atlas service
        this.uri = `mongodb+srv://${user}:${password}@cluster0.plgk0ji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        // https://cloud.mongodb.com 
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        this.client = new MongoClient(this.uri, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            }
        });
    }


    async run() {
        // https://cloud.mongodb.com
        try {
          // Connect the client to the server	(optional starting in v4.7)
          await this.client.connect();
          // Send a ping to confirm a successful connection
          await this.client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
          // Ensures that the client will close when you finish/error
          await this.client.close();
        }
      }
}