const mongoose = require('mongoose');
// const { stringify } = require('nodemon/lib/utils');

const employeeSchema = new mongoose.Schema({
    userid : {
        type:String,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    }
})

const Data = new mongoose.model("Data", employeeSchema)

module.exports = Data;