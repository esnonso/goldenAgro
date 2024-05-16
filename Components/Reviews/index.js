import { useState } from "react";
import { useSession } from "next-auth/react";
import Container from "../Containers/container";
import Button from "../Button";
import Alert from "../Alert";
import axios from "axios";

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

const starStyle = {
  fontSize: "20px",
  marginTop: "-6px",
};

export default function ReviewForm(props) {
  const { status } = useSession();
  const stars = Array(5).fill(0);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [alert, showAlert] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function printStarsHandler() {
    return stars.map((star, index) => {
      const currentRating = index + 1;

      return (
        <label key={index}>
          <span
            className="star"
            style={{
              color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              fontSize: "25px",
            }}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setRating(currentRating)}
          >
            &#9733;
          </span>
        </label>
      );
    });
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (status === "unauthenticated")
        throw new Error("You need to login to continue");
      const response = await axios.post(
        "/api/addReview",
        { rating: rating, comment: comment },
        { headers: { "Content-Type": "application/json" } }
      );
      showAlert(true);
      showAlert(response.data);
      setTimeout(() => {
        showAlert(false);
        props.onHide();
      }, 2000);
    } catch (error) {
      setError(error.message || "An error occured");
      setTimeout(() => {
        setError(false);
        props.onHide();
      }, 4000);
    }
  };

  return (
    <form style={formStyle} onSubmit={submitHandler}>
      {alert && <Alert status="success" message={alert} />}
      {error && <Alert status="error" message={error} />}
      <Container width="100%" height="2rem" margin="0 0 2rem 0" flex="column">
        <label htmlFor="message">Rate Us</label>

        <Container>{printStarsHandler()}</Container>
      </Container>
      <Container width="100%" flex="column">
        <label htmlFor="message" style={{ marginBottom: "0.5rem" }}>
          Additional Comment
        </label>
        <textarea
          style={inputStyle}
          rows="5"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
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
