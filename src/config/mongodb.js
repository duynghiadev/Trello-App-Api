import { MongoClient } from "mongodb";
import { env } from "*/config/environment";

let dbInstance = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // connect client to server
  await client.connect();

  // Assign clientDB the client to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// Get database instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to Database first");
  return dbInstance;
};
