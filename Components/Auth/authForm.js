import { useState, useContext } from "react";
import { Form } from "react-router-dom";
import Container from "../Containers/container";
import { PTags } from "../Text/index";
import Button from "../Button";
import "./index.css";
import axios from "axios";
import { AuthContext } from "../Context/auth";

const AuthForm = (props) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const authCtx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErr("");
    const event = props.register
      ? { email, password, lastname, firstname }
      : { email, password };

    const url = props.register
      ? "http://localhost:8080/api/user/register"
      : "http://localhost:8080/api/user/login";

    try {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (props.register) {
        if (firstname.length < 2)
          throw new Error("First name should be up to 3 characters");
        if (lastname.length < 2)
          throw new Error("Last name should be up to 3 characters");
        if (!agree) throw new Error("Agree to terms and conditions");
        if (password !== cpassword) throw new Error("Passwords do not match");
      }
      if (!email.match(validRegex)) throw new Error("Invalid email address");
      if (password.length < 7)
        throw new Error("Passwordshould be up to 7 characters");

      const response = await axios.post(url, event, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!props.register) {
        authCtx.login(response.data);
        window.location.reload();
      } else {
        setMessage(
          "Sucess! A verification email has been sent to your email address"
        );
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setCPassword("");
      setCPassword("");

      setTimeout(() => {
        props.onHide();
      }, 10000);
    } catch (err) {
      if (err.response) {
        setErr(err.response.data.error);
      } else {
        setErr(err.message);
      }
    }
  };

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const agreementHandler = (e) => {
    setAgree(e.target.checked);
  };

  return (
    <Form className="auth-form" onSubmit={submitHandler}>
      <Container width="100%" justify="flex-end">
        <Button
          text="X"
          width="2rem"
          back={"white"}
          height={"2rem"}
          color="black"
          font="inherit"
          type="button"
          click={props.onHide}
        />
      </Container>
      {props.register && (
        <PTags textAlign="center" fontSize="25px" margin="0 0 1rem 0">
          Register
        </PTags>
      )}
      {!props.register && (
        <PTags textAlign="center" fontSize="25px" margin="0 0 1rem 0">
          Login
        </PTags>
      )}
      {err && (
        <PTags
          padding="0.3rem 0 0.3rem 1rem"
          back="#F8D7DA"
          color="#721C24"
          width="90%"
          margin="0 auto 1rem auto"
          textAlign="center"
          fontSize="14px"
          radius="5px"
        >
          Error: {err}
        </PTags>
      )}
      {message && (
        <PTags
          padding="0.3rem 0 0.3rem 1rem"
          back="#D4EDDA"
          color="#155724"
          width="90%"
          margin="0 auto 1rem auto"
          textAlign="center"
          fontSize="14px"
          radius="5px"
        >
          {message}
        </PTags>
      )}
      {props.register && (
        <Container width="100%" justify="space-between" padding="1rem">
          <input
            type="text"
            placeholder="First name"
            name="firstname"
            className="short"
            value={firstname}
            onChange={inputChangeHandler(setFirstName)}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastname"
            className="short"
            onChange={inputChangeHandler(setLastName)}
            value={lastname}
          />
        </Container>
      )}
      <Container width="100%" justify="center" padding="0 1rem 1rem 1rem">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="long"
          onChange={inputChangeHandler(setEmail)}
          value={email}
        />
      </Container>
      <Container width="100%" justify="center" padding="0 1rem 1rem 1rem">
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="long"
          value={password}
          onChange={inputChangeHandler(setPassword)}
        />
      </Container>
      {props.register && (
        <>
          <Container width="100%" justify="center" padding="0 1rem 1rem 1rem">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password"
              className="long"
              value={cpassword}
              onChange={inputChangeHandler(setCPassword)}
            />
          </Container>
          <Container width="100%" padding="1rem 1rem 1rem 1rem">
            <input
              type="checkbox"
              placeholder="Email"
              name="firstname"
              value={agree}
              onChange={agreementHandler}
            />
            <small>I agree to all terms and conditions</small>
          </Container>
        </>
      )}

      <Container width="100%" padding="0 1rem 2rem 1rem">
        <Button
          text="submit"
          width="fit-content"
          back={"crimson"}
          height={"2rem"}
          padding={"0 2rem"}
          color="white"
          borderRadius={"5px"}
        />
      </Container>
    </Form>
  );
};

export default AuthForm;
