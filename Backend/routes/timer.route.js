const express = require("express");
const timerRoute = express.Router();
const { TimerModel } = require("../models/timer.model");
const mongoose=require("mongoose")

timerRoute.post("/", async (req, res) => {
  try {
    const { startTime, endTime, taskId } = req.body;
   

    const time = new TimerModel({ startTime, endTime, taskId });
    await time.save();
    res.status(200).send("time setted");
  } catch (error) {
    console.log(error);
  }
});

timerRoute.get("/data/:start/:end",async(req,res)=>{

   let {start,end}=req.params
   let userId=req.userId
   console.log(userId)
   
   const startDate = new Date(start);
   startDate.setUTCHours(0, 0, 0, 0);
   
   const endDate = new Date(end);
   endDate.setUTCHours(23, 59, 59, 999);
console.log(startDate,endDate)

const data = await TimerModel.aggregate([
  {
    $match: {
      startTime: {
        $gte: startDate,
        $lte: endDate,
      },
    },
  },
  {
    $lookup: {
      from: "tasks",
      localField: "_id",
      foreignField: "timerId",
      as: "task",
    },
  },
  {
    $sort: { startTime: 1 },
  },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
      totalDuration: { $sum: "$duration" },
      timers: { $push: "$$ROOT" },
    },
  },
]);

console.log(data);





console.log(data);











  res.send(data)

})

timerRoute.get("/data",async(req,res)=>{

  let data=await TimerModel.find()
  res.send(data)
})

module.exports = { timerRoute };
