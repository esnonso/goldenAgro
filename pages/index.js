import Head from "next/head";
import Homepage from "@/Components/Homepage";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Golden Agro Industries LTD. Buy premium Nigerian rice, wholesale and retail in Nigeria"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />
    </>
  );
}
