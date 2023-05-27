import type { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { fetchClient } from "@/utils";
import Tiny from "@/components/tiny";
import Image from "next/image";
import { SECOND } from "@/constants";
import weatherSrc from "public/weather.png";

interface NextNextProps {
  name: string;
}

export default function NextNext({ name }: NextNextProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Head>
        <title>nextnext</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>next dynamic page</h1>
        <h6>(캐시 10초 설정되있는 ssr 페이지)</h6>
        <main>server side: {name}</main>
        <button type="button" onClick={() => setToggle((prev) => !prev)}>
          show
        </button>
        <Image src={weatherSrc} alt="날씨" placeholder="blur" priority />
        <h1>1분은 {SECOND * 60}밀리초 1월은</h1>
        {toggle && <Tiny />}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<NextNextProps> = async ({ res }) => {
  const { data } = await fetchClient.get<{ name: string }>("api/random");
  const random = Math.floor(Math.random() * 100);

  /**
   * @desc next에서 문서 리소스는 no-store로 아예 안함~
   * 환경변수에 따라 다른듯.. 프로덕션모드에서 캐시 가능
   */
  res.setHeader("Cache-Control", "public, max-age=10");

  return {
    props: {
      name: `dynamic king ${data.name} - ${random}`,
    },
  };
};
