import Head from "next/head";
import { Fragment } from "react";
import About from "@/Components/About";

export default function AboutPage() {
  return (
    <Fragment>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <About />
    </Fragment>
  );
}
