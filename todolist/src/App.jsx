import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './Home'
import axios from 'axios'



function App() {
  const [todos, setTodo] = useState([])
  let [modal, setModal] = useState(false)
  let [updateTodoText, setUpdateTodoText] = useState()
  let [updationText, setUpdationText] = useState()
  let [updationId, setUpdationId] = useState()
  useEffect(() => { 

    fetchTodos()

  }, [])
  function getTodoText(id) {
    setUpdationId(id)
    axios.get("http://localhost:3001/todo/" + id)
      .then(data => {
        console.log("updateTodoText=", data.data[0].job)
        setUpdateTodoText(data.data[0].job)

      })
  }

  function updateTodo(text) {
    axios.put("http://localhost:3001/todo/" + updationId, { text: text })
      .then(result => {
        console.log(result)
        fetchTodos()
      })
      .catch(err => console.log(err))
    setModal(false)

    console.log(todos)
  }

  let addTodo = ((newTodo) => {
    setTodo([...todos, newTodo])//adding todos to the existing list


  })

  function fetchTodos() {
    axios.get("http://localhost:3001/todos")
      .then(result => {
        setTodo(result.data)

      })
      .catch((err) => console.log(err))
  }

  function deleteTodo(id) {

    console.log("sending id=", id)
    axios.delete("http://localhost:3001/todo/" + id)//axios.delete by default there is no body you have to work with the path or query parameters

      .then(result => {
        console.log(result)
        setTodo(todos.filter(todo => todo._id !== id))
      })
      .catch(err => console.log(err))
  }
  function deleteTodo1(id) {
    fetch("http://localhost:3001/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId: id })
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }
  return (

    <div className="container">
      <div onClick={() => setModal(false)} className={`modalOverlay ${modal ? "showModalOverlay" : ""}`}></div>
      <div className={`modal ${modal ? "showModal" : ""}`}>
        <div className='modalCut'>
          <span onClick={() => setModal(false)}>&times;</span>
        </div>
        <div>
          <textarea value={updateTodoText} onChange={(e) => {
            setUpdationText(e.target.value)
            setUpdateTodoText(e.target.value)
          }}></textarea>
        </div>

        <div>
          <button onClick={() => updateTodo(updationText)}>Update</button>
        </div>

      </div>
      <h1>Todo list</h1>
      <Home onAddTodo={addTodo} />
      {todos.length === 0 ?
        <div><h1>No Record</h1></div>
        :
        todos.map((todo, index) => (
          <div key={index} className="todoDiv">
            <div> {todo.job}

            </div>

            <div>
              <button className='todoBtn' onClick={() => {
                setModal(true)
                getTodoText(todo._id)
              }}>Update</button>
              <button className="todoBtn" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>

          </div>
        ))
      }
    </div>
  )
}


export default App


