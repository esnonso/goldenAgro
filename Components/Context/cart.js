import { createContext, useReducer } from "react";

const defaultState = {
  cart: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
};

export const CartContext = createContext(defaultState);

const cartReducer = (state, action) => {
  let cart = [];
  let total;
  switch (action.type) {
    case "ADD": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id && item.size === action.item.size
      );

      if (existingItemIndex < 0) {
        cart = [...state.cart, action.item];
        total = state.total + +action.item.price * +action.item.quantity;
      } else {
        cart = [...state.cart];
        const foundCartItem = { ...cart[existingItemIndex] };
        foundCartItem.quantity += +action.item.quantity;
        cart[existingItemIndex] = foundCartItem;
        total = state.total + action.item.quantity * action.item.price;
      }
      return { cart, total };
    }

    case "REMOVE": {
      return { cart, total };
    }
    default:
      return null;
  }
};

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const cartCtx = {
    cart: state.cart,
    total: state.total,
    addToCart: addToCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
