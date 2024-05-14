import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/Components/Header";
import CartContextProvider from "@/Components/Context/cart";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <Header>
          <Component {...pageProps} />
        </Header>
      </CartContextProvider>
    </SessionProvider>
  );
}
