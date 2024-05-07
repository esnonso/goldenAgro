import classes from "./index.module.css";
import CloseBtn from "../../Images/close-btn.png";
import Image from "next/image";
import Backdrop from "../Backdrop/backdrop";
import Container from "../Containers/container";

export default function Modal(props) {
  const modalOverflowStyle = {
    height: "85vh",
    overflowY: "scroll",
  };
  return (
    <Container width="100%">
      <Backdrop />
      <div className={classes.modal} style={props.long && modalOverflowStyle}>
        <div className={classes["btn-container"]}>
          <button className={classes.btn} onClick={props.click} type="button">
            <Image
              src={CloseBtn}
              alt="home icon by icons 8"
              width={25}
              height={25}
            />
          </button>
        </div>
        {props.children}
      </div>
    </Container>
  );
}
