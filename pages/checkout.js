import Head from "next/head";
import Checkout from "@/Components/Checkout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Golden Agro</title>
        <meta
          name="FreshFold Laundry services"
          content="Express Laundry services in Lagos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Checkout />
    </>
  );
}
