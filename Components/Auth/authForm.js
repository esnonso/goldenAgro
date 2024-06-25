import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import { cartActions } from "../Redux/cart-slice";
import Container from "../Containers/container";
import { PTags } from "../Text/index";
import classes from "./index.module.css";
import axios from "axios";
import Link from "next/link";

const AuthForm = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const { status } = useSession();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setErr("");
    setIsSubmitting(true);
    const event = props.register
      ? { email, password, lastname, firstname }
      : { email, password };

    const url = props.register
      ? "/api/register"
      : "http://localhost:8080/api/user/login";

    try {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) throw new Error("Invalid email address");
      if (props.register) {
        if (firstname.length < 2)
          throw new Error("First name should be up to 3 characters");
        if (password.length < 7)
          throw new Error("Passwordshould be up to 7 characters");
        if (lastname.length < 2)
          throw new Error("Last name should be up to 3 characters");
        if (!agree) throw new Error("Agree to terms and conditions");
        if (password !== cpassword) throw new Error("Passwords do not match");

        await axios.post(url, event, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage(
          "Sucess! A verification email has been sent to your email address"
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setCPassword("");
        setCPassword("");

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      } else {
        if (email === "" || password === "") {
          setErr("Fill all inputs");
          return;
        }
        //SIGNIN
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.error) throw new Error(res.error);
        else {
          const foundCart = await axios.post(
            "/api/updateCartLogin",
            { cart: cart },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(foundCart.data.cart);
          dispatch(cartActions.replaceCart(foundCart.data.cart));
          localStorage.removeItem("cart");
        }

        router.replace("/");
      }
    } catch (err) {
      setIsSubmitting(false);
      if (err.response) {
        setErr(err.response.data || "An error occured");
      } else {
        setErr(err.message || "An error occured");
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
    <form className={classes["auth-form"]} onSubmit={submitHandler}>
      {props.register && (
        <PTags textAlign="center" fontSize="25px" margin="0 0 1rem 0">
          Sign Up
        </PTags>
      )}
      {!props.register && (
        <PTags textAlign="center" fontSize="25px" margin="0 0 1rem 0">
          Sign In
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
          {err}
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
            className={classes["short"]}
            value={firstname}
            onChange={inputChangeHandler(setFirstName)}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastname"
            className={classes["short"]}
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
          className={classes["long"]}
          onChange={inputChangeHandler(setEmail)}
          value={email}
        />
      </Container>
      <Container width="100%" justify="center" padding="0 1rem 1rem 1rem">
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={classes["long"]}
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
              className={classes["long"]}
              value={cpassword}
              onChange={inputChangeHandler(setCPassword)}
            />
          </Container>
          <Container width="100%" padding="0 1rem 0.5rem 1rem">
            <Link href="/login" style={{ fontSize: "12px" }}>
              Click to sign in
            </Link>
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

      {!props.register && (
        <Container width="100%" padding="0 1rem 0.5rem 1rem">
          <Link
            href="/register"
            style={{ textDecoration: "none", fontSize: "12px" }}
          >
            Click to register
          </Link>{" "}
        </Container>
      )}

      <Container width="100%" padding="0 1rem 2rem 1rem">
        <button className={classes["button"]} disabled={isSubmitting}>
          {props.register ? "Sign Up" : "Sign In"}
        </button>
      </Container>
    </form>
  );
};

export default AuthForm;
