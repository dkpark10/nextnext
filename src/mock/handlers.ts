/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";
import { Todo } from "global-type";

const todoList = [
  {
    title: "next 공부하기",
    isCompleted: false,
    id: 1,
  },
  {
    title: "react query 공부하기",
    isCompleted: true,
    id: 2,
  },
  {
    title: "성공하기",
    isCompleted: true,
    id: 3,
  },
  {
    title: "부동산, 주식, 현금 다합쳐서 500억 이상 벌기",
    isCompleted: false,
    id: 4,
  },
  {
    title: "불로 불사 하기",
    isCompleted: true,
    id: 5,
  },
] as Todo[];

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL as string}/todo`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ todoList }));
  }),

  rest.post(`${process.env.NEXT_PUBLIC_BASE_URL as string}/todo`, async (req, res, ctx) => {
    const body = await req.json<Todo>();

    todoList.push(body);
    return res(ctx.status(201), ctx.json(todoList));
  }),
];
