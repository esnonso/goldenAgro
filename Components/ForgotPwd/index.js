import { useState } from "react";

import Container from "../Containers/container";
import classes from "./index.module.css";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  return (
    <Container width="100%" margin="5rem 0 0 0">
      <form className={classes.form}></form>
    </Container>
  );
}
