import { useState } from "react";

import Container from "../Containers/container";
import classes from "./index.module.css";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  return (
    <Container width="100%" margin="5rem 0 0 0" justify="center">
      <form className={classes.form}>
        <Container
          width="100%"
          justify="center"
          padding="0 1rem 1rem 1rem"
          flex="column"
        >
          <label>Enter your email to get a reset link</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            className={classes["long"]}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Container>
        <Container width="100%" justify="flex-end" padding="0 1rem 1rem 1rem">
          <button className="button" style={{ width: "30%" }}>
            Submit
          </button>
        </Container>
      </form>
    </Container>
  );
}
