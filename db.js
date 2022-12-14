const {DB, USER, PASSWORD} = require('dotenv').config().parsed
const mongoose = require('mongoose');

const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.cv2me.mongodb.net/${DB}?retryWrites=true&w=majority`

//connect database mongodb

mongoose.connect(uri)
.then(() => console.log('Connect database'))
.catch(err => console.error(err))





module.exports = mongoose;