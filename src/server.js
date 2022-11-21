import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environment";
import { apiV1 } from "./routes/v1";
import cors from "cors";
import { corsOptions } from "./config/cors";

connectDB()
  .then(() => console.log("Connected successfully to database server"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));

  // Enable request.body data
  app.use(express.json());

  // Use APIs v1
  app.use("/v1", apiV1);

  app.listen(env.APP_POST, env.APP_HOST, () => {
    console.log(
      `Hello Everyone, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
};
