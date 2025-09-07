import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { connetDB } from './config/db.js';
import taskRouter from "./routes/task.route.js"
import cors from 'cors'
const app = express();

connetDB();


app.use(express.json());
app.use(cors({
    origin:process.env.ORIGIN  || "http://localhost:5173",
    credentials:true
}))
app.use("/task",taskRouter);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on the port :${port}`)
})