import Head from "next/head";
import { Fragment } from "react";
import AuthForm from "@/Components/Auth/authForm";

export default function Register() {
  return (
    <Fragment>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Golden Agro Farms, Buy premium Nigerian rice"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <AuthForm register={"register"} />
    </Fragment>
  );
}
