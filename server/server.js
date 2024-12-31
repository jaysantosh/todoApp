let express=require('express')
let mongoose=require('mongoose')
let cors=require('cors')
let todoModel=require('./models/todo')

let app=express()
mongoose.connect("mongodb://localhost:27017/todoApp")
app.use(cors())
app.use(express.json())

app.post("/add",async (req,resp)=>{
    let {task}=req.body
    console.log(task)
    let data=new todoModel({
        job:task,
        status:"pending"
    })
    let result=await data.save()
    resp.json(result)
})

app.get("/todos",async (req,resp)=>{
    let todos=await todoModel.find()
    console.log(todos)
    console.log("request aaya")
    resp.json(todos)
})

app.delete("/todo/:id",async(req,resp)=>{
    
    let id=req.params.id
    console.log("todoId=",id)
    let result=await todoModel.deleteOne({_id:id})
    console.log(result)
    resp.json({success:true})
})
app.get("/todo/:id",async(req,resp)=>{
    let id=req.params.id
    console.log(req.params.id)
    let result=await todoModel.find({_id:id})
    console.log(result)
    resp.json(result)
})
app.put("/todo/:id",async(req,resp)=>{
   let {id}=req.params
   let text=req.body.text
    console.log(id)
    console.log("updation text",req.body.text)
    let result=await todoModel.updateOne({_id:id},{$set:{job:text}})
    console.log(result)
    resp.json(result)
    console.log("put request aaya")
})
app.listen(3001,()=>{
    console.log("app is running at port 3001")
})