import Head from "next/head";
import { Fragment } from "react";
import DashboardUsers from "@/Components/Admin/users";

export default function AdminPortalUsers() {
  return (
    <Fragment>
      <Head>
        <title>AdminPortal Users</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardUsers />
    </Fragment>
  );
}
