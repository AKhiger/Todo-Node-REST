import {PrismaService} from "../services/index.js";
import prisma from '../db/database.js';

const prismaServiceInstance = new PrismaService(prisma);

const modelName = "todo"

async function getTodos(res) {
    const todos = await prismaServiceInstance.readAll(modelName)
    return res.json(todos);
}

async function getTodoById(res, req) {
    try {
        const {id} = req.params || req.query
        if (!id) return res.status(400).json({error: 'Id is required'});
        const todo = await prismaServiceInstance.readOne(modelName, {where:{id}}
        )
        return res.json(todo);
    }
    catch (error) {
        return res.status(404).json({error: error.message});
    }
}


async function setTodo(res, req) {
    try {
        const {title, description, isDone} = req.body;
        if (!title) throw new Error('Title is required')
        const newTodo = await prismaServiceInstance.create(modelName, {
            title,
            description,
            isDone: isDone || false,
        });
        return res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({error: 'Create operation failed: ' + error.message});
    }

}


async function updateTodo(res, req) {
    try {
        const {id} = req.params || req.query || req.url;
        const {title, description, isDone} = req.body;
        if (!id) throw new Error('Id is required')
        if (!title) throw new Error('Title is required')
        const updatedTodo = await prismaServiceInstance.update(modelName, {id},
            {title, description, isDone}
        )
        return res.json(updatedTodo);
    } catch (error) {
        //throw new Error(error)
        return res.status(404).json({error: error.message});
    }


}

async function deleteTodo(res, req) {
    try {
        const {id} = req.params || req.query;
        const deletedTodo = await prismaServiceInstance.delete(modelName, {id})
        return res.json(deletedTodo);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

export {getTodos, getTodoById, deleteTodo, updateTodo, setTodo};