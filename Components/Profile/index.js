import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "../Containers/container";
import axios from "axios";
import classes from "./index.module.css";
import { PTags } from "../Text";
import Button from "../Button";

export default function UserProfile(props) {
  const [user, setUser] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const fetchUserHandler = async () => {
    try {
      const response = await axios.post("/api/getUser");
      setUser(response.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchUserHandler();
  }, []);

  return (
    <Container
      margin="5rem 0 0 0"
      width="100%"
      padding="1rem"
      flex="column"
      minHeight="60vh"
    >
      <Container width="100%" justify="flex-end">
        <Link href="/" onClick={() => signOut()} className={classes["link"]}>
          Logout
        </Link>
      </Container>

      <Container margin="1rem 0 0 0">
        <Container flex="column">
          <PTags>Name: {user.name}</PTags>
          <PTags>Email: {user.email}</PTags>
          <PTags>Joined: {user.createdAt}</PTags>
        </Container>
      </Container>
    </Container>
  );
}
