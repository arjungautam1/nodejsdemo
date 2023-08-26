const mongoose= require('mongoose')

const studentSchema= new mongoose.Schema({

    name:{
        type : String, 
        required:true, 
    },
    roll:{
        type: String,
        required:true

    },
    status:{
        type:Boolean,
        required:true,
        default:false
    }

})

module.exports=mongoose.model('Student', studentSchema)