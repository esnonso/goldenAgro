import { useState } from "react";
import axios from "axios";

import Container from "../Containers/container";
import Alert from "../Alert";
import classes from "./index.module.css";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [failAlert, setFailAlert] = useState("");
  const [loading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setSuccessAlert("");
      setFailAlert("");
      const res = await axios.post(
        "/api/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessAlert(res.data);
    } catch (error) {
      setFailAlert(error.response ? error.response.data : "An error occured");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container
      width="100%"
      margin="5rem 0 0 0"
      justify="center"
      align="center"
      flex="column"
    >
      <form className={classes.form} onSubmit={submitHandler}>
        <Container
          width="100%"
          justify="center"
          padding="0 1rem 1rem 1rem"
          flex="column"
        >
          <label>Enter your email to get a reset link</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className={classes["long"]}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </Container>
        <Container width="100%" justify="flex-end" padding="0 1rem 1rem 1rem">
          <button
            className="button"
            style={{ width: "30%" }}
            disabled={loading}
          >
            Submit
          </button>
        </Container>
      </form>
      {successAlert && <Alert status={"success"} message={successAlert} />}
      {failAlert && <Alert status={"error"} message={failAlert} />}
    </Container>
  );
}
