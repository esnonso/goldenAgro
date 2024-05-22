import { createContext, useReducer, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Alert from "../Alert";
import Loader from "../Loaders/loader";

const defaultState = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(defaultState);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      let updatedCart = [...state.cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = updatedCart[existingItemIndex];
      if (existingCartItem) {
        const foundCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };
        updatedCart[existingItemIndex] = foundCartItem;
      } else {
        updatedCart.push(action.payload);
      }
      return { cart: updatedCart };
    }

    case "INCREASE": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.id
      );
      const updatedCart = [...state.cart];
      const existingCartItem = updatedCart[existingItemIndex];
      const foundCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedCart[existingItemIndex] = foundCartItem;
      return { cart: updatedCart };
    }

    case "DECREASE": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.id
      );
      let updatedCart = [...state.cart];
      const existingCartItem = updatedCart[existingItemIndex];

      if (existingCartItem.quantity > 1) {
        const foundCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedCart[existingItemIndex] = foundCartItem;
      } else {
        updatedCart = updatedCart.filter((item) => item.id !== action.id);
      }

      return { cart: updatedCart };
    }

    case "REMOVE": {
      let updatedCart = [...state.cart];
      updatedCart = updatedCart.filter((item) => item.id !== action.id);
      return { cart: updatedCart };
    }

    case "LOADCART": {
      let updatedCart = [...state.cart];
      action.cart.map((item) => {
        updatedCart.push(item);
      });
      return { cart: updatedCart };
    }

    case "EMPTYCART": {
      let updatedCart = [];
      return { cart: updatedCart };
    }
    default:
      return null;
  }
};

const CartContextProvider = (props) => {
  const [ShoppingCart, dispatch] = useReducer(cartReducer, { cart: [] });
  const { status } = useSession();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getItemsInCartHandler = async () => {
    try {
      if (status === "authenticated") {
        const cart = await axios.get("/api/getCart");
        if (cart.data.length > 0) {
          dispatch({
            type: "LOADCART",
            cart: cart.data,
          });
        }
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        const cart = (await JSON.parse(localStorage.getItem("cart"))) || [];
        if (cart.length > 0) {
          dispatch({
            type: "LOADCART",
            cart: cart,
          });
        }
      }
    } catch (error) {
      setError("Error loading cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const updateItemsInCartHandler = async () => {
    try {
      setLoading(true);
      if (status === "authenticated") {
        await axios.post(
          "/api/updateCart",
          { cart: ShoppingCart.cart },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (
          typeof window !== "undefined" &&
          localStorage.getItem("cart") !== null
        )
          localStorage.removeItem("cart");
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        if (localStorage.getItem("cart") === null) {
          localStorage.setItem("cart", JSON.stringify(ShoppingCart.cart));
        } else {
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(ShoppingCart.cart));
        }
      }
      setLoading(false);
      setSuccessMessage("Cart Updated");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch {
      setError("Error updating cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    if (status !== "loading") getItemsInCartHandler();
  }, [status]);

  useEffect(() => {
    if (status !== "loading") updateItemsInCartHandler();
  }, [ShoppingCart.cart]);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const increaseCartItemHandler = (id) => {
    dispatch({ type: "INCREASE", id: id });
  };

  const decreaseCartItemHandler = (id) => {
    dispatch({ type: "DECREASE", id: id });
  };

  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const emptyCartHandler = () => {
    dispatch({ type: "EMPTYCART" });
  };

  const cartCtx = {
    cart: ShoppingCart.cart,
    addToCart: addToCartHandler,
    increaseCartItem: increaseCartItemHandler,
    decreaseCartItem: decreaseCartItemHandler,
    removeFromCart: removeFromCartHandler,
    emptyCart: emptyCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {error && <Alert message={error} status={"error"} />}
      {successMessage && <Alert message={successMessage} status={"success"} />}
      {loading && <Loader message={"Updating Cart"} />}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
