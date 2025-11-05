import { attachDatabasePool } from "@vercel/functions";
import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  appName: "olj.job.feed",
  maxIdleTimeMS: 5000,
};

export const client = new MongoClient(uri, options);

// Attach the client to ensure proper cleanup on function suspension.
attachDatabasePool(client);

// Get the database instance for Better Auth
export async function getDatabase(dbName?: string) {
  return client.db(dbName || process.env.MONGODB_DB || "job-feed");
}
