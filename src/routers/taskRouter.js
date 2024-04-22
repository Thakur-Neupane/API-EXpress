import express from "express";
// import { idGenerator } from "../utils.js";
import { deleteTask, getTasks, insertTask,updateTask } from "../models/task/TaskModel.js";

const router = express.Router();

let fakeDb = [];

//controllers

//get data
// db queries to get the data
router.get("/", async(req, res) => {
const tasks=await getTasks();
console.log(tasks);

  res.json({
    message: "Here are the tasks",
    tasks,
  });
});

//Post data
router.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    result?._id
      ? res.json({
          message: "New task has been added",
        })
      : res.json({
          message: "Failed to add new data",
        });
  } catch (error) {
    console.log(error);
  }
  // const id = idGenerator()
  // fakeDb.push({ ...req.body, id });
});

//update task
router.patch("/", async(req, res) => {
  try {
    const result = await updateTask(req.body);
  console.log(result);
  result?._id ? res.json({
    messaeg: "Your task has been updated",
  })
  :res.json({
    message:"No change made may be Invalid db request",
  })
  } catch (error) {
console.log(error);
res.status(500).json({
  
  message:"Something went wrong try again later"
});

  
  };
  });
//delete task
router.delete("/",async (req, res) => {
  try {
    const { _id } = req.body;

    const result= await deleteTask(_id)
    result?._id
    ?
   
     res.json({
       messaeg: "Your task has been deleted",
     })
     :res.json({
       message: "Unable to delete try again later"
     })
   
  } catch (error) {
    console.log(error);
res.status(500).json({
  
  message:"Something went wrong try again later"
});

  
};
});
 

export default router;