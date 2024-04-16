import express from "express";
import { idGenerator } from "../utils.js";
import { insertTask } from "../models/task/TaskModel.js";
const router = express.Router();

let fakeDb = [];

//controllers

//get data
router.get("/", (req, res) => {
  res.json({
    message: "Here are the tasks",
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
router.patch("/", (req, res) => {
  const { id, type } = req.body;
  console.log(id, type);
  fakeDb = fakeDb.map((item) => {
    if (item.id === id) {
      return { ...item, type }; // item.type == type
    }
    return item;
  });

  res.json({
    messaeg: "Your task has been updated",
  });
});
//delete task
router.delete("/", (req, res) => {
  const { id } = req.body;

  fakeDb = fakeDb.filter((item) => item.id !== id);

  res.json({
    messaeg: "Your task has been updated",
  });
});

export default router;