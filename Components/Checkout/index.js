import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../Redux/cart-slice";
import Container from "../Containers/container";
import Modal from "../Modal";
import Cart from "../Cart/Cart";
import { PTags } from "../Text";
import Button from "../Button";
import classes from "./index.module.css";
import { allState } from "../Objects/states";
import axios from "axios";
import Alert from "../Alert";
import Loader from "../Loaders/loader";

export default function Checkout() {
  const router = useRouter();
  const { status } = useSession();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [lga, setLga] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selState, setSelState] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputChangeHandler = (setState) => (e) => {
    setState(e.target.value);
  };

  const getUserHandler = async () => {
    try {
      const user = await axios.get("/api/getUser");
      setEmail(user.data.email);
      setAddress(user.data.address);
      setName(user.data.name);
      if (!user.data.address) setShowAddressForm(true);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  const showAddressFormHandler = () => setShowAddressForm(true);
  const hideAddressFormHandler = () => setShowAddressForm(false);

  const addressFormSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "/api/address",
        { address: `${street} ${city} ${selState}` },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMessage(res.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setError("An error occured, try again!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    try {
      setLoading(true);
      await axios.post("/api/addOrder", {
        status: reference.status,
        reference: reference.reference,
        message: reference.message,
        transaction: reference.transaction,
        total: totalPrice,
        items: cart,
        email: email,
        name: name,
        address: address,
      });
      dispatch(cartActions.emptyCart());
      setSuccessMessage("Payment confirmed!");
    } catch (err) {
      setError(
        "An error occured confirming transaction, contact support if your account was debited"
      );
    } finally {
      setLoading(false);
      //setSucess(false);
      setTimeout(() => {
        router.replace("/profile");
      }, 3000);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + +item.quantity * +item.price,
    0
  );

  const componentProps = {
    email: email,
    amount: totalPrice * 100,
    metadata: {
      phone: "1234566",
    },
    publicKey: "pk_test_8d1c1609aa0234dad50909270ea58cca4cc39fd1",
    text: "Proceed to Payment",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: () => {
      setError("Transaction closed by user!");
      setTimeout(() => {
        setError("");
      }, 2000);
    },
  };

  return (
    <Container flex="column" minHeight="80vh" margin="5rem 0 0 0">
      <Container width="100%" padding="1rem" flex="column">
        <PTags
          fontSize="25px"
          width="100%"
          padding="0 0 0.5rem 0"
          textAlign="center"
        >
          Checkout
        </PTags>

        <Container
          margin="1rem 0"
          width="100%"
          justify="space-between"
          align="center"
        >
          <PTags>
            <b>Pickup Address: </b> {address}
          </PTags>
          <Button
            text="Edit"
            padding={"0.2rem 0.5rem"}
            color="#011F4B"
            click={showAddressFormHandler}
          />
        </Container>

        <PTags fontSize="20px" margin="1rem 0 1rem 0">
          Confirm Your Order
        </PTags>

        <Cart />

        {address !== "" && cart.length > 0 && (
          <Container with="100%" justify="flex-end">
            <PaystackButton {...componentProps} className="button" />
          </Container>
        )}
      </Container>

      {/* OVERLAYS */}
      {error && <Alert status={"error"} message={error} />}

      {successMessage && <Alert status={"success"} message={successMessage} />}

      {loading && <Loader message={"Processsing "} />}

      {showAddressForm && (
        <Modal click={hideAddressFormHandler}>
          <form onSubmit={addressFormSubmitHandler}>
            <Container width="100%" margin="1rem 0 0 0" flex="column">
              <label>Street Address</label>
              <input
                className={classes["input"]}
                type="text"
                value={street}
                onChange={inputChangeHandler(setStreet)}
              />
            </Container>

            <Container width="100%" margin="1rem 0 0 0" flex="column">
              <label>City/ Area</label>
              <input
                className={classes["input"]}
                type="text"
                value={city}
                onChange={inputChangeHandler(setCity)}
              />
            </Container>

            <Container width="100%" margin="1rem 0 0 0" flex="column">
              <label>State</label>

              <select
                className={classes["input"]}
                value={selState}
                onChange={inputChangeHandler(setSelState)}
              >
                <option>select</option>
                {allState.map((state, index) => (
                  <option key={`${index}state`}>{state.state}</option>
                ))}
              </select>
            </Container>

            <Container width="100%" margin="1rem 0 0 0" flex="column">
              <label>Local Goverment Area</label>

              <select
                className={classes["input"]}
                value={lga}
                onChange={inputChangeHandler(setLga)}
              >
                <option>select</option>
                {allState.map((state) => {
                  if (state.state === selState) {
                    return state.lgas.map((s, i) => (
                      <option key={`${i}lga`}>{s}</option>
                    ));
                  }
                })}
              </select>
            </Container>

            <Container width="100%" justify="flex-end" margin="1rem 0">
              <button className="button">Change</button>
            </Container>
          </form>
        </Modal>
      )}
    </Container>
  );
}
