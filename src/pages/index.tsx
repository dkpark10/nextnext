import type { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { fetchClient } from "@/utils";

interface Props {
  content: string;
}

export default function Home({ content }: Props) {
  return (
    <>
      <Head>
        <title>nextnext</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{content}</div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await fetchClient.get<Props>("/test");

  return {
    props: {
      content: data.content,
    },
  };
};
