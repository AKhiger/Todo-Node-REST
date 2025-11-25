import express from 'express';
import bodyParser from 'body-parser';
import {
    getTodos,
    getTodoById,
    deleteTodo,
    updateTodo,
    createTodo
} from './controllers/Todo.ts';

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
    await asyncFunctionWrapper(getTodoById,  req, res);
});

app.get('/todos', async (req, res) => {
    await asyncFunctionWrapper(getTodos, req, res);
});

app.post('/todo', async (req, res) => {
    await asyncFunctionWrapper(createTodo,req, res);
});

app.put('/todo/:id', async (req, res) => {
    await asyncFunctionWrapper(updateTodo, req, res);
});

app.delete('/todo/:id', async (req, res) => {
    await asyncFunctionWrapper(deleteTodo, req, res);
});

// Export app for server.js
export default app;