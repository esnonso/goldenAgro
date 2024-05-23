import { signOut } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "../Containers/container";
import axios from "axios";
import classes from "./index.module.css";
import { PTags } from "../Text";
import { CartContext } from "../Context/cart";
import Modal from "../Modal";
import ChangePasswordForm from "./changePassword";

export default function UserProfile(props) {
  const cartCtx = useContext(CartContext);
  const [user, setUser] = useState("");
  const [passwordForm, showPasswordForm] = useState(false);
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

  const showPasswordFormHandler = () => showPasswordForm(true);
  const hidePasswordFormHandler = () => showPasswordForm(false);

  const logoutHandler = () => {
    cartCtx.emptyCart();
    signOut();
  };

  useEffect(() => {
    fetchUserHandler();
  }, []);

  return (
    <Container margin="5rem 0 0 0" width="100%" flex="column" minHeight="60vh">
      <Container width="100%" justify="flex-end" padding="1rem">
        <button className="button">Logout</button>

        <button className="button" onClick={showPasswordFormHandler}>
          Change Password
        </button>
      </Container>

      <Container margin="1rem 0 0 0" flex="column" padding="1rem">
        <PTags fontSize="20px" margin="1rem 0">
          Profile
        </PTags>
        <Container flex="column">
          <PTags>Name: {user.name}</PTags>
          <PTags>Email: {user.email}</PTags>
          <PTags>Registered: {user.createdAt}</PTags>
        </Container>
      </Container>

      <Container margin="1rem 0 0 0" flex="column" padding="1rem">
        <PTags fontSize="20px" margin="1rem 0">
          Orders
        </PTags>
      </Container>

      {/* OVERLAYS */}
      {passwordForm && (
        <Modal click={hidePasswordFormHandler}>
          <ChangePasswordForm onHide={hidePasswordFormHandler} />
        </Modal>
      )}
    </Container>
  );
}
