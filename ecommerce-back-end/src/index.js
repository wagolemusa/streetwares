import cors from "cors";
import { join } from 'path';
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import passport from "passport";
import bodyParser from "body-parser";
import { DB, PORT} from "./constants"

const  { json } = bodyParser;
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
// app.use(express.static(join(__dirname, "./uploads")));

dotenv.config();

// import routers
import userRoutes from './routes/user'
import userAdmin from './routes/admin/auth'
import CategoryRoutes from "./routes/category";


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
  

  app.use('/users', userRoutes);
  app.use('/api', CategoryRoutes);
  app.use('/api', userAdmin);
  
  main();