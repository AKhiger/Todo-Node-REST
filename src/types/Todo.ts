import { Response } from "express";

export interface Todo {
    id: string;
    title: string;
    description?: string | null;
    isDone: boolean;
}

export interface TodoCreateInput {
    title: string;
    description?: string | null;
    isDone?: boolean;
}

export interface TodoWhereUniqueInput {
    id?: string;
}

export interface TodoWhereInput {
    AND?: TodoWhereInput | TodoWhereInput[];
    OR?: TodoWhereInput | TodoWhereInput[];
    NOT?: TodoWhereInput | TodoWhereInput[];
    id?: StringFilter;
    title?: StringFilter;
    description?: NullableStringFilter;
    isDone?: BooleanFilter;
}

export interface TodoOrderByWithRelationInput {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isDone?: SortOrder;
}

export interface TodoFindManyArgs {
    where?: TodoWhereInput;
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[];
    take?: number;
    skip?: number;
}

export interface TodoUpdateInput {
    title?: string;
    description?: string | null;
    isDone?: boolean;
}

export interface TodoFindUniqueArgs {
    where: TodoWhereUniqueInput;
}

export interface TodoCreateArgs {
    data: TodoCreateInput;
}

export interface TodoUpdateArgs {
    where: TodoWhereUniqueInput;
    data: TodoUpdateInput;
}

export interface TodoDeleteArgs {
    where: TodoWhereUniqueInput;
}

export interface TodoAggregateArgs {
    where?: TodoWhereInput;
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[];
    take?: number;
    skip?: number;
    _count?: boolean | TodoCountAggregateInputType;
    _min?: TodoMinAggregateInputType;
    _max?: TodoMaxAggregateInputType;
}

export type SortOrder = "asc" | "desc";

export interface StringFilter {
    equals?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: string | StringFilter;
}

export interface NullableStringFilter {
    equals?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
    not?: string | NullableStringFilter | null;
    isNull?: boolean;
}

export interface BooleanFilter {
    equals?: boolean;
    not?: boolean | BooleanFilter;
}

export interface TodoCountAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    isDone?: true;
    _all?: true;
}

export interface TodoMinAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    isDone?: true;
}

export interface TodoMaxAggregateInputType {
    id?: true;
    title?: true;
    description?: true;
    isDone?: true;
}


export type TodoResponse = Response<Todo | TodoCreateInput | TodoUpdateInput | { error: string }>;
export type TodosResponse = Response<Todo[] | { error: string }>;
