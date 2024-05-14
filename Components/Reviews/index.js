import { useState } from "react";
import Container from "../Containers/container";
import Button from "../Button";
import Alert from "../Alert";

const formStyle = {
  width: "100%",
};

const inputStyle = {
  font: "inherit",
  border: "1px gray solid",
  borderRadius: "5px",
  marginBottom: "1rem",
  padding: "0.2rem",
};

export default function ReviewForm(props) {
  const [alert, showAlert] = useState(false);
  const [reviews, setReviews] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    showAlert(true);
    setTimeout(() => {
      showAlert(false);
      props.onHide();
    }, 2000);
  };

  return (
    <form style={formStyle} onSubmit={submitHandler}>
      {alert && <Alert status="success" message="Thanks for your review!" />}
      <Container width="100%" flex="column">
        <label htmlFor="message">
          Say something About Us <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          style={inputStyle}
          required
          rows="10"
          value={reviews}
          onChange={(e) => {
            setReviews(e.target.value);
          }}
        ></textarea>
      </Container>
      <Container width="100%" justify="flex-end">
        <Button
          text="Sumbit"
          back={"#0b6223"}
          height={"3rem"}
          width="30%"
          color="white"
          type={"submit"}
        />
      </Container>
    </form>
  );
}
