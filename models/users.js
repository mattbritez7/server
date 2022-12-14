const mongoose = require('mongoose');


const  { Schema } = mongoose;

const UserSchema = new Schema ({
    Name: { type: String, required: true},
    Email: {type: String, required: true},
    Password: {type:String, required: true},
    IsAdmin: {type: Boolean, default: false},
    IsCheck: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false,
  });


module.exports = mongoose.model("Users", UserSchema);