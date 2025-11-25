import {
    TodoResponse,
    TodosResponse
} from "../types/Todo";

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function sendErrorResponse(res: TodoResponse | TodosResponse, statusCode: number, error: unknown): void {
    res.status(statusCode).json({ error: getErrorMessage(error)  });
}

