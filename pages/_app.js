import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import Header from "@/Components/Header";
import store from "@/Components/Redux";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Header>
          <Component {...pageProps} />
        </Header>
      </Provider>
    </SessionProvider>
  );
}
