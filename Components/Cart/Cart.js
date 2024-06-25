import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { cartActions } from "../Redux/cart-slice";
import { uiActions } from "../Redux/ui-slice";
import Container from "../Containers/container";
import CloseBtn from "../../Images/close-btn.png";
import Plus from "../../Images/plus.png";
import Minus from "../../Images/minus.png";
import { PTags } from "../Text";
import classes from "./index.module.css";
import Image from "next/image";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const totalPrice = cart.reduce(
    (acc, item) => acc + +item.quantity * +item.price,
    0
  );

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const increaseCartItemHandler = (id) => {
    dispatch(cartActions.increaseCartItem(id));
  };

  const decreaseCartItemHandler = (id) => {
    dispatch(cartActions.decreaseCartItem(id));
  };

  const removeCartItemHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <Container width="100%" flex="column">
      {router.pathname !== "/checkout" && cart.length !== 0 && (
        <PTags margin="1rem 0 1rem 0" fontSize="20px">
          Cart
        </PTags>
      )}

      {cart.length === 0 && (
        <PTags fontSize="17px">Oops No item in cart!</PTags>
      )}
      {cart.length > 0 && (
        <>
          <Container
            width="100%"
            justify="space-between"
            borderBottom="1px #0B1847 solid"
          >
            <PTags width="35%">
              <b>Item</b>
            </PTags>
            <PTags width="25%">
              <b>Price</b>
            </PTags>
            <PTags width="30%">
              <b>Quantity</b>
            </PTags>
            <PTags width="10%"></PTags>
          </Container>
          {cart.map((item) => (
            <Container
              key={item.id}
              width="100%"
              justify="space-between"
              margin="0.5rem 0 0 0"
              borderBottom="1px #0B1847 solid"
              height="fit-content"
              align="center"
              padding="0.5rem 0"
            >
              <PTags width="35%">{item.size} Bag</PTags>
              <PTags width="25%">₦{numberWithCommas(item.price)}</PTags>
              <Container
                width="30%"
                height="fit-content"
                align="center"
                padding="0 0.1rem"
              >
                <PTags width="5%">{item.quantity}</PTags>
                <Container margin="0 1rem">
                  <button
                    onClick={() => increaseCartItemHandler(item.id)}
                    className={classes["action-btns"]}
                  >
                    <Image
                      src={Plus}
                      alt="home icon by icons 8"
                      width={20}
                      height={20}
                      className={classes.plus}
                    />
                  </button>

                  <button
                    onClick={() => decreaseCartItemHandler(item.id)}
                    className={classes["action-btns"]}
                  >
                    <Image
                      src={Minus}
                      alt="home icon by icons 8"
                      width={20}
                      height={20}
                    />
                  </button>
                </Container>
              </Container>
              <Container width="10%" justify="center">
                <button
                  onClick={() => removeCartItemHandler(item.id)}
                  className={classes["close-btn"]}
                >
                  <Image
                    src={CloseBtn}
                    alt="close-icon"
                    width={20}
                    height={20}
                  />
                </button>
              </Container>
            </Container>
          ))}
          <PTags fontSize="20px" width="100%" textAlign="right" margin="1rem 0">
            Total ₦{numberWithCommas(totalPrice)}
          </PTags>
          {router.pathname !== "/checkout" && (
            <Container width="100%" justify="flex-end">
              <button
                className="button"
                onClick={() => {
                  toggleCartHandler();
                  router.push("/checkout");
                }}
              >
                Checkout
              </button>
            </Container>
          )}
        </>
      )}
    </Container>
  );
}
