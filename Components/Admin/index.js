import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import AdminPortalLayout from "./layout";
import Loader from "../Loaders/loader";
import classes from "./index.module.css";

export default function DashboardHome() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [unVerifiedUsers, setUnverifiedUsers] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [transitOrders, setTransitOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [loading, setIsLoading] = useState(true);

  const fetchDetailsHandler = async () => {
    try {
      const response = await axios.get("/api/admin-home");
      const { users, orders } = response.data;
      setAllUsers(users.length);
      let userCounter = { true: 0, false: 0 };
      for (let val of users) {
        userCounter[val.confirmed] = userCounter[val.confirmed] + 1;
      }
      setVerifiedUsers(userCounter.true);
      setUnverifiedUsers(userCounter.false);
      setAllOrders(orders.length);
      let orderCounter = {
        Pending: 0,
        Processing: 0,
        "In Transit": 0,
        Delivered: 0,
      };
      for (let val of orders) {
        orderCounter[val.delivered] = orderCounter[val.delivered] + 1;
      }
      setPendingOrders(orderCounter.Pending);
      setProcessingOrders(orderCounter.Processing);
      setDeliveredOrders(orderCounter.Delivered);
      setTransitOrders(orderCounter["In Transit"]);
    } catch (error) {
      alert("An error occured!");
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsHandler();
  }, []);
  return (
    <AdminPortalLayout>
      <div className={classes.container}>
        <h1>Users</h1>
        <div className={classes["item-container"]}>
          <div className={classes.item}>
            <p>Users</p>
            <p>
              <b>{allUsers}</b>
            </p>
          </div>
          <div className={classes.item}>
            <p>Verified users</p>
            <p>
              <b>{verifiedUsers}</b>
            </p>
          </div>
          <div className={classes.item}>
            <p>Unverified users</p>
            <p>
              <b>{unVerifiedUsers}</b>
            </p>
          </div>
        </div>

        <h1>Orders</h1>
        <div className={classes["item-container"]}>
          <div className={classes.item}>
            <p>Orders</p>
            <p>
              <b>{allOrders}</b>
            </p>
          </div>

          <div className={classes.item}>
            <p>Pending Orders</p>
            <p>
              <b>{pendingOrders}</b>
            </p>
          </div>

          <div className={classes.item}>
            <p>Processing Orders</p>
            <p>
              <b>{processingOrders}</b>
            </p>
          </div>

          <div className={classes.item}>
            <p>Orders In transit</p>
            <p>
              <b>{transitOrders}</b>
            </p>
          </div>

          <div className={classes.item}>
            <p>Delivered Orders</p>
            <p>
              <b>{deliveredOrders}</b>
            </p>
          </div>
        </div>
      </div>
      {loading && <Loader message={"Loding Dashbaord"} />}
    </AdminPortalLayout>
  );
}
