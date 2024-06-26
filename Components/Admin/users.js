import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";
import AdminPortalLayout from "./layout";
import Loader from "../Loaders/loader";
import classes from "./index.module.css";
import ContainerFlexColumn from "../Containers/container-flex-column";

const perPage = 10;

export default function DashboardUsers() {
  const router = useRouter("/");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const fetchOrdersHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/admin-users?page=" + page);
      setUsers(res.data.users);
      setTotalUsers(res.data.total);
      setIsLoading(false);
    } catch (error) {
      alert("An error occured getting Users");
      router.push("/");
    }
  };

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
    <>
      <AdminPortalLayout>
        <div className={classes.container}>
          <ContainerFlexColumn width="100%" justify="space-between">
            <h1>All Users</h1>
          </ContainerFlexColumn>

          {users.map((user) => {
            return (
              <ContainerFlexColumn
                width="100%"
                key={user._id}
                justify="space-between"
                margin="0.5rem 0"
                align="center"
                color="#FAFAFA"
                padding="0.5rem"
              >
                <Container
                  width="70%"
                  flex="column"
                  margin="0 0 1rem 0"
                  align="flex-start"
                  justify="center"
                >
                  <PTags margin="0.5rem 0">{user.name}</PTags>
                  <PTags>{user.email}</PTags>
                  <small>
                    Joined: {new Date(user.createdAt).toUTCString()}
                  </small>
                </Container>

                <Container align="center">
                  <PTags>
                    <span
                      className={`${user.confirmed ? "pending" : "delivered"}`}
                      style={{
                        padding: "0.5rem ",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                      }}
                    >
                      {user.confirmed ? "Verified" : "Unverified"}
                    </span>
                  </PTags>
                </Container>
              </ContainerFlexColumn>
            );
          })}

          {totalUsers > 0 && (
            <Container width="100%" justify="center">
              <Button
                text="Previous"
                margin="0.5rem"
                click={decreasePageHandler}
                back="white"
                border="none"
                color="black"
              />
              {Array(Math.ceil(totalUsers / perPage))
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

      {loading && <Loader message={"Loading Users"} />}
    </>
  );
}
