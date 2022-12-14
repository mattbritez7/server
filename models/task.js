const mongoose = require('mongoose');

const  { Schema } = mongoose;

const TaskSchema = new Schema ({ 
    user: { type: String, required: true},
    date: { type: String, required: true},
    status: {type: String, required: true},
    product: { type: String, required: true},
    price: { type: String, required: true},
    day: { type: String, required: true},
    name: { type: String, required: true},
    dni: { type: String, required: true},
    dateOfBirthday: { type: String, required: true},
    directionOfCommerce: { type: String, required: true},
    betweenStreets: { type: String, required: true},
    directionHouse: { type: String, required: true},
    location: { type: String, required: true},
    phone1: { type: String, required: true},
    phone2: { type: String, required: true},
    comments: { type: String, required: false},
});

module.exports = mongoose.model("Task", TaskSchema);