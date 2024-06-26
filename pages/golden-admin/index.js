import Head from "next/head";
import { Fragment } from "react";
import DashboardHome from "@/Components/Admin";

export default function AdminPortalHome() {
  return (
    <Fragment>
      <Head>
        <title>Admin Portal</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardHome />
    </Fragment>
  );
}
