import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { uiActions } from "../Redux/ui-slice";
import { cartActions } from "../Redux/cart-slice";
import Container from "../Containers/container";
import Bag from "../../Images/cart.png";
import classes from "./header.module.css";
import Footer from "../Footer";
import Cart from "../Cart/Cart";
import Modal from "../Modal";
import Sidebar from "./sidebar";
import Alert from "../Alert";
import Loader from "../Loaders/loader";

let initialState = true;

export default function Header(props) {
  const dispatch = useDispatch();
  const { status } = useSession();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const showSidebar = useSelector((state) => state.ui.sidebarIsVisible);
  const cart = useSelector((state) => state.cart.items);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateCartItem = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };
  //LOAD CART DATA FROM DATABASE
  const getItemsInCartHandler = async () => {
    try {
      if (status === "authenticated") {
        const foundCart = await axios.get("/api/getCart");
        if (foundCart.data.length > 0) {
          dispatch(cartActions.replaceCart(foundCart.data));
        }
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        const foundCart =
          (await JSON.parse(localStorage.getItem("cart"))) || [];

        if (foundCart.length > 0) {
          dispatch(cartActions.replaceCart(foundCart));
        }
      }
    } catch (error) {
      setError("Error loading cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated")
      getItemsInCartHandler();
  }, [status]);

  //UPDATE ITEMS IN CART
  const updateItemsInCartHandler = async () => {
    try {
      setLoading(true);
      if (status === "authenticated") {
        await axios.post(
          "/api/updateCart",
          { cart: cart },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.removeItem("cart");
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      setLoading(false);
      setSuccessMessage("Cart updated");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch {
      setLoading(false);
      setError("Error updating cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      if (initialState) {
        initialState = false;
        return;
      }
      updateItemsInCartHandler();
    }
  }, [cart, status]);

  return (
    <Container width="100%" flex="column" height="100%">
      <header className={classes.header}>
        <Container align="center">
          <Link href="/" className={classes.logo}>
            GOLDEN<span style={{ color: "#0b6623" }}>AGRO</span>
          </Link>

          {/* <Image src={Logo} alt="logo-cross" width={35} height={35} /> */}
        </Container>
        <Container align="center">
          <button onClick={toggleCartHandler} className={classes["cart-btn"]}>
            <Image
              src={Bag}
              alt="logo-cross"
              width={25}
              height={25}
              className={classes.cart}
            />

            <span className={classes["cart-span"]}>{calculateCartItem()}</span>
          </button>

          <button
            className={classes["hamburger"]}
            onClick={toggleSidebarHandler}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </header>
      <main>{props.children}</main>

      <Footer />

      {/* OVERLAYS */}
      {showSidebar && <Sidebar onHide={toggleSidebarHandler} />}

      {showCart && (
        <Modal click={toggleCartHandler}>
          <Cart />
        </Modal>
      )}

      {error && <Alert message={error} status={"error"} />}
      {successMessage && <Alert message={successMessage} status={"success"} />}
      {loading && <Loader message={"Updating Cart"} />}
    </Container>
  );
}
