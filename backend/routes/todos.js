import express from 'express'
import {createTodos,deleteTodos,readTodos, updateTodos} from '../controller/todos.js'

const router = express.Router();
router.get("/",readTodos);
router.post('/',createTodos);
// for update list use id of that list
router.patch('/:id',updateTodos);

router.delete("/:id",deleteTodos);

export default router;