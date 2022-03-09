import mongoose from 'mongoose'
import Todo from '../models/todo.js';



// read
export const readTodos = async(req,res)=>{
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({error:error.massage})
    }
}
// write
export const createTodos = async(req,res)=>{
    const todo = await Todo(req.body);
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({error:error.massage})
    }
}
// update

export const updateTodos= async(req,res)=>{
    try{
    const {id} = req.params;
    const{title,content} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("the id is not valid");
    }
    const todo = {title,content,_id:id};
    await Todo.findByIdAndUpdate(id,todo,{new:true});
    res.json(todo);
}catch(error) {
    res.status(409).json({error:error.massage})
}
}


// delete

export const deleteTodos= async(req,res)=>{
    try{
    const {id} = req.params;
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("the id is not valid");
    }
   
    await Todo.findByIdAndRemove(id);
    res.json({message:"Todo delete"});
}catch(error) {
    res.status(409).json({error:error.massage})
}
}