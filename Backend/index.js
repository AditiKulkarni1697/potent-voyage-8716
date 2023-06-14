

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config();
const {connection} = require("./db");
const { userRoute } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("B26_Time-Trace_Project")
})

app.use("/user", userRoute)

app.listen(process.env.PORT || 3000 , async()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    try {
        await connection
        console.log("Connect to DataBase")
    } catch (error) {
        console.log(error.message)
        console.log("Cannot connect to DataBase")
    }
})


