import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button";
import Container from "../../Containers/container";
import AddPosts from "./add";
import { getProductsFromStore as productsRequests } from "../../ApiRequests/products";
import Loader from "../../Loaders/loader";
import DisplayProducts from "./displayProducts";

const AdminProducts = () => {
  const [modal, showModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allproducts, setProducts] = useState([]);

  const showModalHandler = () => showModal((prevState) => !prevState);
  const hideModalHandler = () => showModal(false);

  const styles = {
    textDecoration: "none",
    backgroundColor: "crimson",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2rem",
    margin: "0 1rem",
    fontSize: "small",
    width: "7rem",
  };
  const getProductsHandler = async () => {
    const p = await productsRequests();
    setProducts(p);
  };

  useEffect(() => {
    getProductsHandler()
      .then(setIsLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container flex="column" width="100%">
      <Container justify="space-around" width="100%" margin="0 0 2rem 0">
        <h2 style={{ margin: 0, width: "60%" }}>Manage all products</h2>
        <Container justify="flex-end" width="40%">
          <Button
            text="New"
            width={"7rem"}
            click={showModalHandler}
            height="2rem"
            color="white"
            back="crimson"
          />
          <Link to="/" style={styles}>
            Home
          </Link>
        </Container>
      </Container>
      {allproducts.map((p) => {
        return <DisplayProducts key={p._id} title={p.title} id={p._id} />;
      })}
      {isLoading && <Loader />}
      {modal && <AddPosts onHide={hideModalHandler} />}
    </Container>
  );
};

export default AdminProducts;
