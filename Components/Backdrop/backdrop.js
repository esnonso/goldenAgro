import classes from "./backdrop.module.css";

const BackDrop = (props) => {
  return <div className={classes["backdrop"]} onClick={props.click}></div>;
};

export default BackDrop;
