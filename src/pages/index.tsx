import type { GetServerSideProps } from "next";
import Error from "next/error";
import Image from "next/image";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, dehydrate, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { logger } from "@/utils/logger";
import { getTodo, createTodo } from "@/services";
import { Todo } from "global-type";

export default function NextNext() {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isError, refetch } = useQuery(["todo"], getTodo);

  const todoInputRef = useRef<HTMLInputElement[]>([]);

  const { mutate } = useMutation((newTodo: Todo) => createTodo(newTodo), {
    onError: (err, variables, context) => {},
    onSuccess: async () => {
      (inputRef.current as HTMLInputElement).value = " ";
      await queryClient.invalidateQueries(["todos"]);
    },
  });

  const onClick = () => {
    const id = (data?.todoList.length as number) + 1;

    mutate({
      title: inputRef.current?.value as string,
      isCompleted: false,
      id: `todo-${id}`,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const editTodo = (todoId: Todo["id"], idx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    /**
     * empty
     */
  };

  const deleteTodo = () => {};

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
  }, []);

  return (
    <>
      <Head>
        <title>nextnext</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Next Next</h1>
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
            {data?.todoList.map((todo, idx) => (
              <div className="todo-item" key={todo.id}>
                <div className="todo-title">
                  <input type="checkbox" />
                  <input
                    type="text"
                    ref={(el) => {
                      if (el !== null) {
                        todoInputRef.current[idx] = el;
                        todoInputRef.current[idx].value = todo.title;
                      }
                    }}
                    name={todo.id}
                  />
                </div>
                <div className="todo-controller">
                  <button type="button" className="update" onClick={editTodo(todo.id, idx)}>
                    수정
                  </button>
                  <button type="button" className="delete" onClick={deleteTodo}>
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["todo"], getTodo);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
