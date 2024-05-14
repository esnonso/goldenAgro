import Head from "next/head";
import UserProfile from "@/Components/Profile";

export default function User() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <UserProfile />
    </>
  );
}
