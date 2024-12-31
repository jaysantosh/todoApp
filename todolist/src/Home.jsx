import { useState } from "react"
import axios from 'axios'

export function Home({onAddTodo}) {
  const [task,setTask]=useState("")
  const [beEmpty,setBeEmpty]=useState(false)
const handleAdd=()=>{
  axios.post("http://127.0.0.1:3001/add",{task:task})
  .then(result=>{
    console.log(result)
    onAddTodo(result.data)
    setTask("")
  
  })
  .catch((error)=>console.log(error))
console.log(task)
setTask("")

// fetch("http://localhost:3001/add",{
//   method:"POST",
//   headers:{
//     "Content-Type":"application/json",
//   },
//   body:JSON.stringify({task:task})
// })
// .then(resp=>resp.json())
// .then(data=>console.log(data))
// .catch(err=>console.log(err))
}


  return (
    <div>
      <input type="text"  placeholder='add a task' id="taskInput" value={task} onChange={(e)=>setTask(e.target.value)}/>
      

      <button type="button" onClick={handleAdd}>Add</button>

   
      
    
    </div>
  )
}

