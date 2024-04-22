import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;

//connect mongodb

import { connectMongo } from "./src/routers/config/mongoDbconfig.js";
connectMongo();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routers
import taskRouter from "./src/routers/taskRouter.js";

app.use("/api/v1/tasks", taskRouter);

//run the server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});