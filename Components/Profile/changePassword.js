import { useState } from "react";
import Container from "../Containers/container";
import { PTags } from "../Text";
import classes from "./index.module.css";
import axios from "axios";

export default function ChangePasswordForm(props) {
  const [pwd, changePwd] = useState("");
  const [newPwd, changeNewPwd] = useState("");
  const [confirmPwd, changeConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setDisabled(true);
      setError("");
      setSuccess("");
      if (pwd === "" || newPwd === "" || confirmPwd === "")
        throw new Error("Fill All inputs");
      if (newPwd !== confirmPwd) throw new Error("Passwords do not match");
      const res = await axios.post(
        "/api/changePassword",
        { pwd, newPwd },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess(res.data);
      setTimeout(() => {
        props.onHide();
      }, 2000);
    } catch (error) {
      setError(!error.response ? error.message : error.response.data);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <PTags fontSize="20px" width="100%" textAlign="center">
        Change Password
      </PTags>
      {error && (
        <Container
          width="100%"
          color="#F8D7DA"
          textColor="#721C24"
          justify="center"
          margin="0.5rem 0 0 0"
          padding="0.5rem 0"
          radius="5px"
        >
          <small> {error}</small>
        </Container>
      )}
      {success && (
        <Container
          width="100%"
          color="#D4EDDA"
          textColor="#155724"
          justify="center"
          margin="0.5rem 0 0 0"
          padding="0.5rem 0"
          radius="5px"
        >
          <small> {success}</small>
        </Container>
      )}
      <Container width="100%" padding="1rem" flex="column">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          className={classes.input}
          value={pwd}
          onChange={inputChangeHandler(changePwd)}
        />
      </Container>

      <Container width="100%" padding="1rem" flex="column">
        <label htmlFor="New Password">New Password</label>
        <input
          type="password"
          className={classes.input}
          value={newPwd}
          onChange={inputChangeHandler(changeNewPwd)}
        />
      </Container>

      <Container width="100%" padding="1rem" flex="column">
        <label htmlFor="confirm NewPassword">Confirm New Password</label>
        <input
          type="password"
          className={classes.input}
          value={confirmPwd}
          onChange={inputChangeHandler(changeConfirmPwd)}
        />
      </Container>

      <Container width="100%" justify="flex-end" padding="1rem">
        <button className="button" disabled={disabled}>
          Change Password
        </button>
      </Container>
    </form>
  );
}
