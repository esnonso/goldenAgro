import Head from "next/head";
import { Fragment } from "react";
import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import ResetPasswordForm from "@/Components/ForgotPwd/reset";

export default function ContactPage(props) {
  return (
    <Fragment>
      <Head>
        <title>resetId password</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ResetPasswordForm resetId={props.resetId} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  await connectDatabase();
  const users = await User.find({}, { email: 1, confirmationCode: 2 });
  return {
    fallback: "blocking",
    paths: users.map((u) => ({
      params: {
        resetId: `${process.env.URL}/forgot-password/verify=${u.email}code=${u.confirmationCode}`,
      },
    })),
  };
}

export async function getStaticProps(context) {
  const resetId = context.params.resetId;
  return {
    props: {
      resetId: resetId || "",
      revalidate: 1,
    },
  };
}
