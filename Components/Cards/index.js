import classes from "./index.module.css";

// const phone = window.matchMedia("(max-width: 700px)");
// const tab = window.matchMedia("(min-width: 701px) and ((max-width: 900px)");
// const desktop = window.matchMedia("(min-width: 901px)");

const Cards = (props) => {
  const styles = {
    backgroundColor: props.color,
    padding: "1rem",
    color: props.textColor,
    height: props.height,
  };
  return (
    <div style={styles} className={classes["cards"]}>
      {props.children}
    </div>
  );
};

export default Cards;
