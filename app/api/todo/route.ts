import { NextResponse } from "next/server";
import { Todo } from "@/schema/todo";

const todoList: Array<Todo> = [
  {
    title: "next 공부하기",
    isCompleted: false,
    id: "d17f5df1-bb8c-4912-9a9b-e829c114237f ",
  },
  {
    title: "react query 공부하기",
    isCompleted: false,
    id: "0adfcd9f-d4ed-4c62-a8e3-ea97cabe5ced ",
  },
  {
    title: "성공하기",
    isCompleted: false,
    id: "526a9c68-25fd-48b2-8d78-87cf2ce3f8c3",
  },
  {
    title: "부동산, 주식, 현금 다합쳐서 500억 이상 벌기",
    isCompleted: false,
    id: "a0d45e10-9bce-40f1-8d6a-0975ff6b0d01",
  },
  {
    title: "불로 불사 하기",
    id: "1641abd5-7da7-4051-9821-77d44c225cd7",
    isCompleted: false,
  },
];

export function GET(_: Request) {
  return NextResponse.json(todoList);
}
