import { createPortal } from "react-dom";
import BackDropPortal from "../../Backdrop/backdrop";
import PostForm from "./ProductForm";

const PostFormPortal = (props) => {
  return createPortal(
    <PostForm onClose={props.onHide} />,
    document.getElementById("overlays")
  );
};

const AddPosts = (props) => {
  return (
    <>
      <BackDropPortal />
      <PostFormPortal onHide={props.onHide} />
    </>
  );
};

export default AddPosts;
