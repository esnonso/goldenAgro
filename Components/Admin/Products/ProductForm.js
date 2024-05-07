import "../index.css";
import { H1Tags } from "../../Text";
import Button from "../../Button";
import Container from "../../Containers/container";
import { Form } from "react-router-dom";

const PostForm = (props) => {
  return (
    <Form method="POST" className="product-form">
      <Container justify="flex-end">
        <Button
          text="X"
          color="red"
          width="2rem"
          height="3rem"
          border="none"
          back="white"
          font="larger"
          type="button"
          click={props.onClose}
        />
      </Container>
      <H1Tags textAlign="center" margin="0.2rem 0" fontSize="20px">
        Add Products
      </H1Tags>
      <div className="form-control-post">
        <label>Title</label>
        <input type="text" name="title" />
      </div>

      <div className="form-control-post">
        <label>Brand</label>
        <input type="text" name="category" />
      </div>

      <div className="form-control-post">
        <label>Category</label>
        <input type="text" name="category" />
      </div>

      <div className="form-control-post">
        <label>Price</label>
        <input type="text" name="price" />
      </div>

      <div className="form-control-post">
        <label>Size</label>
        <input type="text" name="size" />
      </div>

      <div className="form-control-post">
        <label>Color</label>
        <input type="text" name="color" />
      </div>

      <div className="form-control-post">
        <label>Amount in Stock</label>
        <input type="number" name="amount-in-stock" />
      </div>

      <div className="form-control-post">
        <label>Image url</label>
        <input type="text" />
      </div>

      <div className="form-control-post">
        <label>Description</label>
        <input type="text" name="desc" />
      </div>

      <div className="form-control-post">
        <label>Features</label>
        <textarea type="text" name="features"></textarea>
      </div>

      <div className="form-control-post">
        <Button
          text="Add"
          color="black"
          back={"white"}
          width="10rem"
          height="3rem"
          border="1px black solid"
          font="large"
          type="submit"
        />
      </div>
    </Form>
  );
};

export default PostForm;
