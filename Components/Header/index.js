import { useState, useContext } from "react";
import Image from "next/image";
import Container from "../Containers/container";
import Bag from "../../Images/cart.png";
import { CartContext } from "../Context/cart";
import classes from "./header.module.css";
import Link from "next/link";
import Footer from "../Footer";
import { PTags } from "../Text";
import Cart from "../Cart/Cart";
import Modal from "../Modal";
import Sidebar from "./sidebar";

export default function Header(props) {
  const cartCtx = useContext(CartContext);
  const [cart, showCart] = useState(false);
  const [sidebar, showSidebar] = useState(false);

  const showSidebarHandler = () => showSidebar(true);
  const hideSidebarHandler = () => showSidebar(false);
  const showCartHandler = () => showCart(true);
  const hideCartHandler = () => showCart(false);

  const calculateCartItem = () =>
    cartCtx.cart.reduce((acc, item) => acc + item.quantity, 0);

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
          <Container>
            <Image
              src={Bag}
              alt="logo-cross"
              width={25}
              height={25}
              className={classes.cart}
              onClick={showCartHandler}
            />
            <PTags fontSize="25px" margin="0 0 0 0.25rem">
              {calculateCartItem()}
            </PTags>
          </Container>

          <button className={classes["hamburger"]} onClick={showSidebarHandler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </header>
      <main>{props.children}</main>

      <Footer />

      {/* OVERLAYS */}
      {sidebar && <Sidebar onHide={hideSidebarHandler} />}

      {cart && (
        <Modal click={hideCartHandler}>
          <Cart />
        </Modal>
      )}
    </Container>
  );
}
