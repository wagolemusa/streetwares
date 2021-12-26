// import cors from "cors";
// import { join } from 'path';
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import passport from "passport";
// import { json } from "body-parser";
import { DB, PORT} from "./constants/index.js"
const app = express();



dotenv.config();


const main = async () => {
    try {
      // Connect with the database
      await mongoose.connect(DB, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
      });
      consola.success("DATABASE CONNECTED...");
      // Start application listening for request on server
      app.listen(PORT, () => consola.success(`Sever started on port ${PORT}`));
    } catch (err) {
      consola.error(`Unable to start the server \n${err.message}`);
    }
  };
  
  main();