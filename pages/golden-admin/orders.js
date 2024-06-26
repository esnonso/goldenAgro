import Head from "next/head";
import { Fragment } from "react";
import DashboardOrders from "@/Components/Admin/orders";

export default function AdminPortalOrders() {
  return (
    <Fragment>
      <Head>
        <title>AdminPortal Orders</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardOrders />
    </Fragment>
  );
}
