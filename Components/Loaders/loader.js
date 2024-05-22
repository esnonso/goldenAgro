import BackDrop from "../Backdrop/backdrop";
import Container from "../Containers/container";
import classes from "./loader.module.css";

const Loader = ({ message }) => {
  return (
    <>
      <BackDrop />
      <div className={classes["container"]}>
        <p>{message}</p>
        <div className={classes["loader"]}></div>
      </div>
    </>
  );
};

export default Loader;
