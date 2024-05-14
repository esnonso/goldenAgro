import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Alert from "../Alert";

const defaultState = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
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
    default:
      return null;
  }
};

const CartContextProvider = (props) => {
  const [ShoppingCart, dispatch] = useReducer(cartReducer, { cart: [] });
  const { status } = useSession();
  const [error, setError] = useState("");

  const getItemsInCartHandler = async () => {
    try {
      if (status === "authenticated") {
        const cart = await axios.get("/api/getCart");
        dispatch({
          type: "LOADCART",
          cart: cart.data,
        });
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        const cart = (await JSON.parse(localStorage.getItem("cart"))) || [];
        dispatch({
          type: "LOADCART",
          cart: cart,
        });
      }
      return;
    } catch (error) {
      setError("Error loading cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const upadeteItemsInCartHandler = async () => {
    try {
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
      }
      if (typeof window !== "undefined" && status === "unauthenticated") {
        if (localStorage.getItem("cart") === null) {
          localStorage.setItem("cart", JSON.stringify(ShoppingCart.cart));
        } else {
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(ShoppingCart.cart));
        }
      }
    } catch {
      setError("Error updating cart");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    getItemsInCartHandler();
  }, [status]);

  useEffect(() => {
    upadeteItemsInCartHandler();
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

  const cartCtx = {
    cart: ShoppingCart.cart,
    addToCart: addToCartHandler,
    increaseCartItem: increaseCartItemHandler,
    decreaseCartItem: decreaseCartItemHandler,
    removeFromCart: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {error && <Alert message={error} status={"error"} />}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
