const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const mongoose = require("mongoose");

router.put("/:id", async (req, res) => {
  try {
    const { comments } = req.body;
    const {id} = req.params
    const updateTask = new Task({comments})
    await Task.findByIdAndUpdate(id, updateTask);
    res.send({status: "success"});
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
