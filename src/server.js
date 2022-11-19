import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environment";

connectDB()
  .then(() => console.log("Connected successfully to database server"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.get("/test", async (req, res) => {
    res.end("<h1>Hello World</h1><hr />");
  });

  app.listen(env.APP_POST, env.APP_HOST, () => {
    console.log(
      `Hello Everyone, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
};
