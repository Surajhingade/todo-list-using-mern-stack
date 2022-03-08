import mongoose from 'mongoose'
import Todo from '../models/todo.js';




export const readTodos = async(req,res)=>{
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({error:error.massage})
    }
}

export const createTodos = async(req,res)=>{
    const todo = await Todo(req.body);
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({error:error.massage})
    }
}