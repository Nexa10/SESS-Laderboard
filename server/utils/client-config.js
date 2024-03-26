import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = `mongodb+srv://${process.env.REACT_APP_MONGO_USERNAME}:${process.env.REACT_APP_MONGO_PASSWORD}@cluster0.lu9g8kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

export default client;