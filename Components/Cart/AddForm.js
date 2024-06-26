import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../Redux/cart-slice";
import classes from "./index.module.css";
import Container from "../Containers/container";
import { PTags } from "../Text";
import Button from "../Button";
import { products } from "../Products";

const AddForm = (props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState(props.size ? props.size : "");

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const increaseQuantityHandler = () => {
    setQuantity((prevState) => +prevState + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity > 0) {
      setQuantity((prevState) => +prevState - 1);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (size === "") return;
    for (let item of products) {
      if (item.size === size) {
        dispatch(
          cartActions.addTocart({
            id: item.id,
            size: item.size,
            quantity: +quantity || 1,
            price: item.price,
          })
        );
      }
    }
    props.onHide();
  };

  return (
    <form width="100%" onSubmit={submitHandler}>
      <PTags fontSize="20px" width="100%" textAlign="center">
        Select Size to Add to Your Cart
      </PTags>
      {!props.size && (
        <Container width="100%" margin="2rem 0">
          <PTags width="50%">Size:</PTags>
          <Container width="50%" justify="flex-end">
            <select
              className={classes["select"]}
              value={size}
              onChange={inputChangeHandler(setSize)}
            >
              <option></option>
              {products.map((p) => (
                <option key={p.id}>{p.size}</option>
              ))}
            </select>
          </Container>
        </Container>
      )}

      {props.size && (
        <Container width="100%" margin="2rem 0">
          <p>Golden Agro premium rice - {size}</p>
        </Container>
      )}

      <Container width="100%" margin="0 0 2rem 0">
        <PTags width="50%">Quantity:</PTags>
        <Container width="50%" justify="flex-end">
          <Button
            text="-"
            back={"#0b6223"}
            width="1.5rem"
            click={decreaseQuantityHandler}
            type="button"
          />
          <input
            type="number"
            className={classes["input"]}
            value={quantity}
            onChange={inputChangeHandler(setQuantity)}
          />
          <Button
            text="+"
            back={"#0b6223"}
            width="1.5rem"
            click={increaseQuantityHandler}
            type="button"
          />
        </Container>
      </Container>

      <Container width="100%" justify="flex-end">
        <Button
          text="+ ADD"
          back={"#0b6223"}
          height={"3rem"}
          width="30%"
          color="white"
          type={"submit"}
        />
      </Container>
    </form>
  );
};

export default AddForm;
