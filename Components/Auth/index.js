import { createPortal } from "react-dom";
import BackDropPortal from "../Backdrop/backdrop";
import AuthForm from "./authForm";
import "./index.css";

const AuthFormPortal = (props) => {
  return createPortal(
    <AuthForm onHide={props.onHide} register={props.register} />,
    document.getElementById("overlays")
  );
};

const AuthenticationForm = (props) => {
  return (
    <>
      <BackDropPortal />
      <AuthFormPortal onHide={props.onHide} register={props.register} />
    </>
  );
};

export default AuthenticationForm;
