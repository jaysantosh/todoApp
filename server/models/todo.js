let mongoose=require('mongoose')

let todoSchema=new mongoose.Schema({
    job:String,
    status:String
})

let todoModel=mongoose.model("todolist",todoSchema)

module.exports=todoModel