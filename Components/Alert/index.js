import classes from "./index.module.css";
import CloseBtn from "../../Images/close-btn.png";
import Image from "next/image";
import Container from "../Containers/container";

export default function Alert(props) {
  return (
    <Container width="100%">
      <div
        className={
          props.status === "error"
            ? classes["error-alert"]
            : classes["success-alert"]
        }
      >
        <div className={classes["text-container"]}>
          <p>{props.message}</p>
        </div>
      </div>
    </Container>
  );
}
