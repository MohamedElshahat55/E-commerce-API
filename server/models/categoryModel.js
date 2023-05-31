const mongoose = require('mongoose');

//---------------CREATE-CATEGORY-SCHEMA------------------ \\

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name required'],
        minlength:3,
        maxlength:30,
        unique:true
    },
    slug:{
        type:String,
        required:[true,'slug required'],
    }
},{
    timestamps:true
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category