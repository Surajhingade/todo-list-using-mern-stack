import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors';
import todosRoutes from './routes/todos.js'


const app = express();
dotenv.config();
app.use(express.json({extended : true}))
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/todos',todosRoutes)

// database connection  localhost and server

// local database link
const mongoUrl = "mongodb://localhost:27017/crudusingaxios0?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// mongo atlas link
// const mongoUrl = "mongodb+srv://Suraj:Suraj@7620@cluster0.hwwbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{useUnifiedTopology:true}).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
}) 
 



app.get("/",(req,res)=>{
    res.send("Welcome To Shark Tank");
})

const port = process.env.PORT || 5000;







app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})