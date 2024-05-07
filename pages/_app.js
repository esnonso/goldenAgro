import "@/styles/globals.css";
import Header from "@/Components/Header";
import CartContextProvider from "@/Components/Context/cart";

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </CartContextProvider>
  );
}
