const express=require("express")
const app=express()
var cors = require('cors')
app.use(express.json())
const mongoose=require("mongoose")
 
app.use(cors())

let schema=mongoose.Schema({
    title:{type:String},
    duration:{type:String},
    date:{type:String}

})


let usermodel=mongoose.model("time",schema)

app.get("/user",async(req,res)=>{
    let data=await usermodel.find()
    res.send(data)
})

app.post("/add",(req,res)=>{
    let data=new usermodel(req.body)
    data.save()
    res.send(data)
})


app.listen(4500,()=>{

    mongoose.connect("mongodb+srv://mazhariqbal:iqbal@cluster0.hrvyke3.mongodb.net/nxm201project?retryWrites=true&w=majority")
    console.log("connected")
})