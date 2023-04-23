import type { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/utils";
import { Todo } from "global-type";

interface NextNextProps {
  todoList: Array<Todo>;
}

export default function NextNext({ todoList }: NextNextProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation(
    (newTodo: Todo) => {
      return fetchClient.post<Todo, Todo>("/todo", newTodo);
    },
    {
      onError: (err, variables, context) => {
        console.log("error", err, variables, context);
      },
      onSuccess: (d, variables, context) => {
        console.log("success", d, variables, context);
      },
    },
  );

  const onClick = () => {
    const id = todoList.length + 1;

    mutate({
      title: inputRef.current?.value as string,
      isCompleted: false,
      id,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const deleteTodo = () => {};

  return (
    <>
      <Head>
        <title>nextnext</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>next next</h1>
        <main>
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="input-container">
                <input type="text" ref={inputRef} />
                <button type="button" onClick={onClick}>
                  추가
                </button>
              </div>
            </form>
            {todoList.map((todo) => (
              <div className="todo-item" key={todo.id}>
                {todo.title}
                <div className="todo-controller">
                  <input type="checkbox" />
                  <button type="button" onClick={deleteTodo}>
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await fetchClient.get<NextNextProps>("/todo");

  return {
    props: {
      todoList: data.todoList,
    },
  };
};
