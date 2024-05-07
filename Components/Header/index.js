import { useState, useContext } from "react";
import { useRouter } from "next/router";
// import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Container from "../Containers/container";
// import Logo from "../Images/logo2.jpeg";
import Bag from "../../Images/cart.png";
import { CartContext } from "../Context/cart";
import Button from "../Button";
import classes from "./header.module.css";
import Link from "next/link";
import Footer from "../Footer";
import Backdrop from "../Backdrop/backdrop";
import { PTags } from "../Text";
import Cart from "../Cart/Cart";
import Modal from "../Modal";

const links = [
  { caption: "Homepage", url: "/" },
  { caption: "About Us", url: "/about" },
  { caption: "Contact Us", url: "/contact" },
];

export default function Header(props) {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  // const { status } = useSession();
  const [cart, showCart] = useState(false);
  const [sidebar, showSidebar] = useState(false);

  const showSidebarHandler = () => showSidebar(true);
  const hideSidebarHandler = () => showSidebar(false);
  const showCartHandler = () => showCart(true);
  const hideCartHandler = () => showCart(false);

  const calculateCartItem = () => {
    let total = 0;
    for (let item of cartCtx.cart) {
      total += item.quantity;
    }
    return total;
  };

  return (
    <Container width="100%" flex="column" height="100%">
      <div className={classes.header}>
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
      </div>
      {/* <div className={classes.motto}>DEVELOPERS LIFE SAVING HOSPITAL</div> */}
      {sidebar && (
        <>
          <Backdrop />
          <div className={classes.sidebar}>
            <Container align="center" width="100%">
              <Container width="80%">
                <h3 style={{ margin: 0 }}>
                  GOLDEN<span>AGRO</span>
                </h3>
              </Container>
              <Container width="20%" justify="flex-end">
                <Button
                  text="X"
                  width="2rem"
                  back={"inherit"}
                  height={"2rem"}
                  color="white"
                  font="larger"
                  type="button"
                  fontWeight="600"
                  click={hideSidebarHandler}
                />
              </Container>
            </Container>

            <ul>
              {links.map((l, i) => (
                <li key={l.url}>
                  <Link href={l.url} onClick={hideSidebarHandler}>
                    {l.caption.toUpperCase()}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={"/login"}>LOGIN</Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <main>{props.children}</main>
      <Footer />

      {/* OVERLAYS */}
      {cart && (
        <Modal click={hideCartHandler}>
          <Cart />
        </Modal>
      )}
    </Container>
  );
}
