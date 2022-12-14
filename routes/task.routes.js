const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const mongoose = require("mongoose")

router.get("/alltasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks)
  } catch (error) {
    console.error(error);
  }
});

router.get("/pending", async (req, res) => {
  try {
    const tasks = await Task.find({status: "Pendiente"});
    res.send(tasks)
  } catch (error) {
    console.error(error);
  }
});

router.get("/aprobate", async (req, res) => {
  try {
    const tasks = await Task.find({status: "Aprobado"});
    res.send(tasks)
  } catch (error) {
    console.error(error);
  }
});

router.get("/delivered", async (req, res) => {
  try {
    const tasks = await Task.find({status: "Entregado"});
    res.send(tasks)
  } catch (error) {
    console.error(error);
  }
});

router.post("/createtask", async (req, res) => {
  try {
    const {
      user,
      date,
      status,
      product,
      price,
      comments,
      day,
      name,
      dni,
      dateOfBirthday,
      directionOfCommerce,
      betweenStreets,
      directionHouse,
      location,
      phone1,
      phone2,
    } = req.body;

    const task = new Task({
      user,
      date,
      status,
      product,
      price,
      day,
      comments,
      name,
      dni,
      dateOfBirthday,
      directionOfCommerce,
      betweenStreets,
      directionHouse,
      location,
      phone1,
      phone2,
    });

    await task.save();

    res.status(200).json({ status: "task save", task });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            dni,
            dateOfBirthday,
            directionOfCommerce,
            betweenStreets,
            directionHouse,
            location,
            phone1,
            phone2,
          } = req.body;
          const newTask = new Task({
            name,
            dni,
            dateOfBirthday,
            directionOfCommerce,
            betweenStreets,
            directionHouse,
            location,
            phone1,
            phone2,
          });
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: "success"})}
    catch (error) { console.log(error)}
})

router.get('/:id', async (req, res) => {
    const { id: id } = req.params;
    try{
        const task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(206).send({message: 'Task not found'})
        }
        if (!mongoose.Types.ObjectId.isValid({ _id: id })) 
        return res.status(200).json([task]);
    }
    catch (error) {
        console.log(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id: id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: `No task with id :${id}` 
        });
        const task = await Task.findOneAndDelete({ _id: id });
        res.status(200).json(task);
       } catch (error) {
        console.log(error);
       }
})

router.put("/edit-status/:id", async (req, res) => {
  try {
    const { id: id } = req.params;
    const { status } = req.body;
    const newTask = { status };
    await Task.findByIdAndUpdate(id, newTask);
    return res.status(200).json({msg: id, msg2: newTask});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
