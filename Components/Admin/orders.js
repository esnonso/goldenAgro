import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";
import AdminPortalLayout from "./layout";
import Loader from "../Loaders/loader";
import classes from "./index.module.css";
import SingleOrder from "./singleOrder";
import Modal from "../Modal";
import ContainerFlexColumn from "../Containers/container-flex-column";

const perPage = 10;

export default function DashboardOrders() {
  const router = useRouter("/");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [filter, setSelectedFilter] = useState("");

  const fetchOrdersHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/admin-orders?page=" + page);
      setOrders(res.data.orders);
      setTotalOrders(res.data.total);
      setIsLoading(false);
    } catch (error) {
      alert("An error occured getting orders");
      router.push("/");
    }
  };

  const fetchFilteredOrder = async (category) => {
    try {
      setIsLoading(true);
      setPage(1);
      const res = await axios.post(
        "/api/admin-orders?page=" + 1,
        { category },
        { headers: { "Content-Type": "application/json" } }
      );
      setOrders(res.data.orders);
      setTotalOrders(res.data.total);
      setIsLoading(false);
    } catch (error) {
      alert("An error occured getting orders");
      router.push("/");
    }
  };

  useEffect(() => {
    fetchOrdersHandler();
  }, [page]);

  const hideSelectedOrderHandler = () => setSelectedOrder("");

  const increasePageHandler = () => {
    if (page * perPage < totalOrders) setPage((prevState) => prevState + 1);
  };

  const decreasePageHandler = () => {
    if (page > 1) setPage((prevState) => prevState - 1);
  };

  return (
    <>
      <AdminPortalLayout>
        <div className={classes.container}>
          <ContainerFlexColumn width="100%" justify="space-between">
            <h1>All Orders</h1>

            <Container align="center" padding="0.5rem">
              <PTags margin="0 1rem 0 0">Filter</PTags>
              <select
                className={classes.select}
                value={filter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option></option>
                <option>Pending</option>
                <option>Processing</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
              <button
                className={classes["select-btn"]}
                onClick={() => fetchFilteredOrder(filter)}
              >
                Go!
              </button>
            </Container>
          </ContainerFlexColumn>

          {orders.length < 1 && (
            <PTags fontSize="20px">You don not have orders from clients</PTags>
          )}

          {orders.map((order) => {
            return (
              <ContainerFlexColumn
                width="100%"
                key={order._id}
                justify="space-between"
                margin="0.5rem 0"
                align="center"
                color="#FAFAFA"
                padding="0.5rem"
              >
                <Container flex="column" align="flex-start">
                  <PTags>{order.transaction}</PTags>
                  <small>
                    Created: {new Date(order.createdAt).toUTCString()}
                  </small>
                </Container>

                <PTags margin="0.5rem 0 1rem 0">
                  <span
                    className={`${
                      order.delivered === "Pending"
                        ? "pending"
                        : order.delivered === "Processing"
                        ? "processing"
                        : order.delivered === "In Transit"
                        ? "in-transit"
                        : "delivered"
                    }`}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {order.delivered}
                  </span>
                </PTags>
                <button
                  className={classes.btn}
                  onClick={() => setSelectedOrder(order)}
                >
                  view
                </button>
              </ContainerFlexColumn>
            );
          })}

          {totalOrders > 0 && (
            <Container width="100%" justify="center">
              <Button
                text="Previous"
                margin="0.5rem"
                click={decreasePageHandler}
                back="white"
                border="none"
                color="black"
              />
              {Array(Math.ceil(totalOrders / perPage))
                .fill(0)
                .map((b, i) => (
                  <Button
                    text={i + 1}
                    key={i + "b"}
                    margin="0.5rem"
                    back={i + 1 === page ? "" : "gray"}
                    border="none"
                    color="white"
                  />
                ))}
              <Button
                text="Next"
                margin="0.5rem"
                click={increasePageHandler}
                back="white"
                border="none"
                color="black"
              />
            </Container>
          )}
        </div>
      </AdminPortalLayout>
      {selectedOrder && (
        <Modal click={hideSelectedOrderHandler}>
          <SingleOrder item={selectedOrder} />
        </Modal>
      )}

      {loading && <Loader message={"Loading Orders"} />}
    </>
  );
}
