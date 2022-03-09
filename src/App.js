import{readTodos,createTodos,updateTodos,deleteTodos} from './functions/index'
import Preloader from "./components/Preloader";
import React,{useEffect, useState} from "react"; 
 
 
function App() {

  const [todo, setTodo] = useState({title:"",content:""})
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0)

// find current id of notes
  useEffect(() => {
  let currentTodo =  currentId!=0?todos.find(todo=>todo._id === currentId): {title:"",content:""}
  setTodo(currentTodo);
  }, [currentId])
  


  // fetch data from dagabase
  useEffect(() => {
     const fetchData = async()=>{
       const result =  await readTodos();
      //  console.log(result);
      setTodos(result);
     }
     fetchData();
  }, [todos,currentId])



  // cleare the text after submit the todo list
  const clear = () =>{
    setCurrentId(0);
    setTodo({title:"",content:""})
  }

// this useeffect for the esc button on key bord 
  useEffect(() => {
   const clearField = (e) => {
     if(e.keyCode === 27){
       clear();
     }
   }
   window.addEventListener('keydown',clearField)
   return () => window.removeEventListener('keydown',clearField);
  }, [ ])
  
// handle submit on submit button
  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    // after update todo the resubmit this todo using below code
    if(currentId === 0)
    {
     const result = await createTodos(todo);
     setTodos([...todos,result]);
  
    clear()
    // console.log(result)
    // alert("todo save")
    }
    else{
       const result= await updateTodos(currentId,todo)
       setTodos(...todos,result);
      clear()
    }

  }


  // find todo id and delete it after click on the delete icon
  const removeTodo = async (id)=>{
    await deleteTodos(id);
    const todoCopy = [...todos];
    todoCopy.filter(todo=>todo._id !== id);
    setTodos(todoCopy);
  }
  

  return (
    <div className="container">
     <div className="row">
       {/* <pre>{JSON.stringify(todo)}</pre> */}
       <h3>Todo App created using MERN</h3>
    <form className="col s12" onSubmit={onSubmitHandler}>
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">notes</i>
          <input id="title" type="text" className="validate" value={todo.title} onChange={e=>setTodo({...todo,title:e.target.value})}/>
          <label htmlFor="icon_prefix">Title</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">description</i>
          <input id="description" type="text" className="validate" value={todo.content} onChange={e=>setTodo({...todo,content:e.target.value})}/>
          <label htmlFor="description">Content</label>
        </div>
      </div>
      <div className="row rignt">
         <button className="waves-effect waves-light btn ">Submit</button>
        </div>
      </form>
      {/* use map for the render list item */}
  {
    !todos ?<Preloader /> : todos.length > 0 ? <ul className="collection">
    {todos.map((todo)=>{
      return(
       <li key={todo._id}
      //  onClick for the update functionality grap id of the list
       onClick={()=>setCurrentId(todo._id)}
       className="collection-item"><div><h5>{todo.title}</h5>
       <p>{todo.content}
       {/* use onClick for the remove the existing item after click on the delete icon */}
       <a href="#!" className="secondary-content" onClick={()=>removeTodo(todo._id)} ><i className="material-icons">delete</i>
       </a>
       </p>
       </div></li>
       )

    })}
    
  </ul> : <div><h3>Please Insert Todo</h3></div>
  }
    

    
  </div>
    </div>
  );
}

export default App;
