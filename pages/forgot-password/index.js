import Head from "next/head";
import { Fragment } from "react";
import ForgotPasswordForm from "@/Components/ForgotPwd";

export default function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Forgot password</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ForgotPasswordForm />
    </Fragment>
  );
}
