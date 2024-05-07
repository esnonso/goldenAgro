import Head from "next/head";
import { Fragment } from "react";
import Contact from "@/Components/Contact";

export default function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Golden Agro Farms, Buy premium Nigerian rice"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Contact />
    </Fragment>
  );
}
