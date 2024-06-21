import Container from "../Containers/container";
import classes from "./index.module.css";

export default function DiagonalLines() {
  return (
    <Container width="100" flex="column" margin="4rem 0 0 0">
      <div
        className={`${classes["diagonal-lines"]} ${classes["diagonal-one"]}`}
      ></div>
      <div
        className={`${classes["diagonal-lines"]} ${classes["diagonal-two"]}`}
      ></div>
      <div
        className={`${classes["diagonal-lines"]} ${classes["diagonal-three"]}`}
      ></div>
      <div
        className={`${classes["diagonal-lines"]} ${classes["diagonal-four"]}`}
      ></div>
      <div
        className={`${classes["diagonal-lines"]} ${classes["diagonal-five"]}`}
      ></div>
    </Container>
  );
}
