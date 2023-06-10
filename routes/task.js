const express = require("express");
const router =express.Router();
const Task = require("../models/task")


//create new task
router.post("/",async(req,res)=>{
    const task = new Task({
        title:req.body.title,
        description:req.body.description
    })
    try{
      const newTask = await task.save();
      res.status(201).json({newTask})
    }catch (err) {
     res.status(400).json({"error":err.message})
    }
})



//get all task
router.get("/",async(req,res)=>{
 
  try{
    const task = await Task.find();
    res.status(200).json({task})
  }catch (err) {
   res.status(400).json({"error":err.message})
  }
})

//-----find task


async function getTask(req,res,next){
  let task;
try{
 task = await Task.findById(req.params.id);
 if(task==null){
  return res.status(404).json({meassage:"task not found"})
 }
}catch (err){
  res.status(500).json({"error":err.message})
}
res.task =task;
next();
}
//-get specific task-------------------------------------------------
router.get("/:id",getTask,(req,res)=>{
res.json(res.task)
})

//--update

router.patch("/:id",getTask,async(req,res)=>{

  
    res.task.title = req.body.title;
    res.task.description = req.body.description;
 
  
  try{
   const updateTask =await res.task.save();
   res.json(updateTask);
  }catch (err){
    res.status(500).json({"error":err.message})
  }
})


//---dalete
router.delete("/:id",getTask,async(req,res)=>{

  try{
   await res.task.deleteOne();
   res.json({meassage:"deleted"})
  }catch (err){
    res.status(500).json({"error":err.message})
  }
})


module.exports = router;