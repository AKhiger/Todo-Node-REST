import express from 'express';
import bodyParser from 'body-parser';
import {
    getTodos,
    getTodoById,
    deleteTodo,
    updateTodo,
    setTodo
} from './controllers/Todo.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Async wrapper for handling errors
async function asyncFunctionWrapper(func, ...args) {
    await func(...args).catch((error) => {
        throw new Error(error);
    });
}

// Routes
app.get('/todo/:id', async (req, res) => {
    await asyncFunctionWrapper(getTodoById, res, req);
});

app.get('/todos', async (req, res) => {
    await asyncFunctionWrapper(getTodos, res, req);
});

app.post('/todo', async (req, res) => {
    await asyncFunctionWrapper(setTodo, res, req);
});

app.put('/todo/:id', async (req, res) => {
    await asyncFunctionWrapper(updateTodo, res, req);
});

app.delete('/todo/:id', async (req, res) => {
    await asyncFunctionWrapper(deleteTodo, res, req);
});

// Export app for server.js
export default app;