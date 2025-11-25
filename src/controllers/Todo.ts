import { Request } from "express";
import { PrismaService } from "../services/index";
import {
    Todo,
    TodoFindManyArgs,
    TodoCreateInput,
    TodoUpdateInput,
    TodoWhereUniqueInput,
    TodoResponse,
    TodosResponse
} from "../types/Todo";


import prismaClient from '../db/database';
import { sendErrorResponse } from "../utils";

const modelName = "todo"

const prismaService = new PrismaService(prismaClient);

export async function getTodos(req: Request, res: TodosResponse): Promise<void> {
    try {
        const options: TodoFindManyArgs = req.query;
        const todos: Todo[] = await prismaService.readAll(modelName, options);
        res.status(200).json(todos);
    } catch (error) {
        sendErrorResponse(res, 500, error);
    }
}

export async function getTodoById(req: Request, res: TodoResponse): Promise<void> {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Id is required" });
            return;
        }

        const todo: Todo | null = await prismaService.readOne(modelName, { where: { id } });
        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        res.status(200).json(todo);
    } catch (error) {
        sendErrorResponse(res, 500, error);
    }
}

export async function createTodo(req: Request, res: TodoResponse): Promise<void> {
    try {
        const { title, description, isDone }: TodoCreateInput = req.body;

        if (!title) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        const newTodo: TodoCreateInput = await prismaService.create(modelName, {
            title,
            description,
            isDone: isDone ?? false,
        });
        res.status(201).json(newTodo);
    } catch (error) {
        sendErrorResponse(res, 500, error);
    }
}

export async function updateTodo(req: Request, res: TodoResponse): Promise<void> {
    try {
        const { id }: TodoWhereUniqueInput = req.params;
        const { title, description, isDone }: TodoUpdateInput = req.body;

        if (!id) {
            res.status(400).json({ error: "Id is required" });
            return;
        }
        if (!title) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        const updatedTodo: Todo = await prismaService.update(modelName, { id }, { title, description, isDone });
        res.status(200).json(updatedTodo);
    } catch (error) {
        sendErrorResponse(res, 500, error);
    }
}

export async function deleteTodo(req: Request, res: TodoResponse): Promise<void> {
    try {
        const { id }: TodoWhereUniqueInput = req.params;
        if (!id) {
            res.status(400).json({ error: "Id is required" });
            return;
        }

        const deletedTodo: Todo = await prismaService.delete(modelName, { id });
        res.status(200).json(deletedTodo);
    } catch (error) {
        sendErrorResponse(res, 500, error);
    }
}