import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {
    getTodos,
    getTodoById,
    deleteTodo,
    updateTodo,
    createTodo
} from './controllers/Todo';

const app: Express = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Async wrapper for handling errors
async function asyncFunctionWrapper(
    func: ( req: Request, res: Response) => Promise<void>,
    ...args: [ Request, Response]
): Promise<void> {
    await func(...args).catch((error: Error) => {
        throw new Error(error.message);
    });
}

// Routes
app.get('/todo/:id', async (req: Request, res: Response): Promise<void> => {
    await asyncFunctionWrapper(getTodoById,req, res);
});

app.get('/todos', async (req: Request, res: Response): Promise<void> => {
    await asyncFunctionWrapper(getTodos, req, res);
});

app.post('/todo', async (req: Request, res: Response): Promise<void> => {
     await asyncFunctionWrapper(createTodo,req, res);
});

app.put('/todo/:id', async (req: Request, res: Response): Promise<void> => {
    await asyncFunctionWrapper(updateTodo, req, res);
});

app.delete('/todo/:id', async (req: Request, res: Response): Promise<void> => {
    await asyncFunctionWrapper(deleteTodo, req, res);
});

// Export app for server.js
export default app;
