import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/Components/Loaders/loader";
import { connectDatabase } from "@/Mongodb";
import Container from "@/Components/Containers/container";
import User from "@/Mongodb/Models/user";
import axios from "axios";
import Link from "next/link";
import { PTags } from "@/Components/Text";
import Alert from "@/Components/Alert";

export default function AboutPage(props) {
  const router = useRouter();
  const [veryfying, verificationDone] = useState(true);
  const [failure, setFailure] = useState("");

  const verifyEmailHandler = async () => {
    try {
      const email = props.verification.split("=")[1].replace("code", "");
      const code = props.verification.split("=")[2];
      await axios.post("/api/verifyEmail", {
        email: email,
        confirmationCode: code,
      });
      alert("Email verification succesful");
      router.replace("/login");
    } catch (error) {
      setFailure(error.response ? error.response.data : "An Error occured");
      verificationDone(false);
    }
  };

  useEffect(() => {
    verifyEmailHandler();
    console.log("n");
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Verify Email</title>
        <meta
          name="description"
          content="Golden Agro Farms, Buy premium Nigerian rice"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container margin="5rem 0 0 0" height="40vh" padding="2rem 1rem">
        {veryfying && <Loader message={"Veryfying Email"} />}
        {failure && (
          <div className="email-error">
            <PTags fontSize="20px">Error!</PTags>
            <p>{failure}</p>
          </div>
        )}
      </Container>
    </Fragment>
  );
}

export async function getStaticPaths() {
  await connectDatabase();
  const users = await User.find({}, { email: 1, confirmationCode: 2 });
  return {
    fallback: "blocking",
    paths: users.map((u) => ({
      params: {
        verificationId: `${process.env.URL}/verify=${u.email}code=${u.confirmationCode}`,
      },
    })),
  };
}

export async function getStaticProps(context) {
  const verificationId = context.params.verificationId;
  return {
    props: {
      verification: verificationId || "",
      revalidate: 1,
    },
  };
}
