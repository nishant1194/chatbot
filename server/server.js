import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import FAQRoute from "./routes/Faq.js";
const app = express();
const PORT = 6004;

app.use(cors());
app.use(bodyParser.json());

const connectDB = async() =>{
    try {
     await mongoose.connect("mongodb+srv://nishantkumar32435:justBaatAi@cluster0.fkoyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
     console.log("connected")
        
    } catch (error) {
        console.log(error)
    }
} 
connectDB();
app.use('/chat-bot' ,FAQRoute )
app.use('*' , (req,res)=>{
    res.json({status:"ok"});
})


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// justBaatAi