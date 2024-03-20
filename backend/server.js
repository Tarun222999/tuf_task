import express  from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import mySqlPool from "./config/db.js";
import router from "./routes/coderoutes.js";
import cors from 'cors'
dotenv.config({path:''})
const app=express();

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use('/api/v1/code',router)

const PORT=8000


mySqlPool.query('SELECT 1').then(()=>{

    console.log('Mysql db connected')
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
})




