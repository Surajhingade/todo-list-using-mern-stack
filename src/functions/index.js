import * as api from '../api/index'
  

// api import from api/index 

// handle readTodos on client side 

export const readTodos = async () =>{
    try {
        const {data}= await api.readTodos();
        return data;

    } catch (error) {
        console.log(error)
    }
}

// handle createTodos on client side 
export const createTodos = async (todo) =>{
    try {
        const {data}= await api.createTodos(todo);
        return data;

    } catch (error) {
        console.log(error)
    }
}

// handle updateTodos on client side 
export const updateTodos = async (id,todo) =>{
    try {
        const {data}= await api.updateTodos(id,todo);
        return data;

    } catch (error) {
        console.log(error)
    }
}

// handle deleteTodos on client side 
export const deleteTodos = async (id) =>{
    try {
        const data =  await api.deleteTodos(id);
        return data;
    } catch (error) {
        console.log(error)
    }
}