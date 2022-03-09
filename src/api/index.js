import axios from 'axios'

// fetch data using axios library crud operation perform

const url = "http://localhost:5000/todos";


export const readTodos = ()=> axios.get(url);
export const createTodos = newTodo => axios.post(url,newTodo);
export const updateTodos = (id,updateTodos) => axios.patch(`${url}/${id}`,updateTodos);

export const deleteTodos = id => axios.delete(`${url}/${id}`);