import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "../Containers/container";
import axios from "axios";
import classes from "./index.module.css";
import { PTags } from "../Text";
import Modal from "../Modal";
import ChangePasswordForm from "./changePassword";
import Button from "../Button";
import Loader from "../Loaders/loader";
import Alert from "../Alert";
import UserOrders from "./userOrder";

const perPage = 5;

export default function UserProfile(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [passwordForm, showPasswordForm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const hideSelectedOrderHandler = () => setSelectedOrder("");

  const fetchOrdersHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/fetchOrders?page=" + page);
      setOrders(res.data.orders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("An error occured getting orders, try again");
      fetchUserHandler();
    }
  };

  const fetchUserHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/getUser");
      setUser(response.data);
      const res = await axios.get("/api/fetchOrders?page=" + page);
      setOrders(res.data.orders);
      setTotalOrders(res.data.total);
      setIsLoading(false);
    } catch (error) {
      setError("An error occured loading profile, try again");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  };

  const showPasswordFormHandler = () => showPasswordForm(true);
  const hidePasswordFormHandler = () => showPasswordForm(false);

  useEffect(() => {
    fetchUserHandler();
  }, []);

  useEffect(() => {
    fetchOrdersHandler();
  }, [page]);

  const increasePageHandler = () => {
    if (page * perPage < totalOrders) setPage((prevState) => prevState + 1);
  };

  const decreasePageHandler = () => {
    if (page > 1) setPage((prevState) => prevState - 1);
  };

  return (
    <Container margin="5rem 0 0 0" width="100%" flex="column" minHeight="60vh">
      <Container width="100%" justify="flex-end" padding="1rem">
        <button className="button" onClick={showPasswordFormHandler}>
          Change Password
        </button>
      </Container>

      <Container width="100%" padding="0 1rem">
        <hr className={classes.hr} />
      </Container>

      <Container margin="0.5rem 0 0 0" flex="column" padding="0 1rem">
        <PTags fontSize="20px" margin="1rem 0">
          Profile
        </PTags>
        <Container flex="column">
          <PTags>Name: {user.name}</PTags>
          <PTags>Email: {user.email}</PTags>
          <PTags>Registered: {new Date(user.createdAt).toUTCString()}</PTags>
        </Container>
      </Container>

      <Container width="100%" padding="0 1rem">
        <hr className={classes.hr} />
      </Container>

      <Container margin="0.5rem 0 0 0" flex="column" padding="0 1rem">
        <PTags fontSize="20px" margin="1rem 0">
          Orders
        </PTags>

        <Container width="100%" flex="column">
          {orders.map((order) => {
            return (
              <Container
                width="100%"
                key={order._id}
                justify="space-between"
                margin="0.5rem 0"
                align="center"
              >
                <Container width="60%" flex="column">
                  <PTags>{order.transaction}</PTags>
                  <small>
                    Created: {new Date(order.createdAt).toUTCString()}
                  </small>
                </Container>
                <PTags>{order.delivered}</PTags>
                <button
                  className={classes.btn}
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </Container>
            );
          })}

          {totalOrders > 0 && (
            <Container width="100%" justify="center">
              <Button
                text="Previous"
                margin="0.5rem"
                click={decreasePageHandler}
              />
              {Array(Math.ceil(totalOrders / perPage))
                .fill(0)
                .map((b, i) => (
                  <Button
                    text={i + 1}
                    key={i + "b"}
                    margin="0.5rem"
                    back={i + 1 === page ? "" : "gray"}
                  />
                ))}
              <Button text="Next" margin="0.5rem" click={increasePageHandler} />
            </Container>
          )}
        </Container>
      </Container>

      <Container width="100%" padding="0 1rem">
        <hr className={classes.hr} />
      </Container>

      {/* OVERLAYS */}
      {passwordForm && (
        <Modal click={hidePasswordFormHandler}>
          <ChangePasswordForm onHide={hidePasswordFormHandler} />
        </Modal>
      )}

      {loading && <Loader message={"Loading"} />}

      {error && <Alert status={"error"} message={error} />}

      {selectedOrder && (
        <Modal click={hideSelectedOrderHandler}>
          <UserOrders order={selectedOrder} />
        </Modal>
      )}
    </Container>
  );
}
