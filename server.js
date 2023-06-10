const express = require("express");
const connectDb= require("./Config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors")


connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/task",require("./routes/task"))

const port = process.env.PORT || 5000;

console.log("hello word");


app.listen(port,()=>{
    console.log(`${port} connected`);
})