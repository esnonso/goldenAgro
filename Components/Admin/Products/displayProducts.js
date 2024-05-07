import Modal from "../../Modal";
import { PTags } from "../../Text";
import Button from "../../Button";
import Container from "../../Containers/container";
import { useState } from "react";
import axios from "axios";

const DisplayProducts = (props) => {
  const [deleteWarning, ShowDeleteWarning] = useState(false);
  const [actionWarning, ShowActionWarning] = useState(false);

  const showDeleteHandler = () => ShowDeleteWarning(true);
  const hideDeleteHandler = () => ShowDeleteWarning(false);
  const hideActionWarningHandler = () => {
    ShowActionWarning(false);
    window.location.reload();
  };

  const deleteProductHandler = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/products/delete/" + props.id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ShowDeleteWarning(false);
      ShowActionWarning(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container justify="space-between" padding="1rem 0" align="center">
      <p style={{ width: "30%", fontSize: "18px" }}>{props.id}</p>
      <p style={{ width: "30%", fontSize: "18px" }}>{props.title}</p>
      <Button
        text="+add New variety"
        click={() => {
          console.log(props.title);
        }}
        height="2rem"
        back={"white"}
        color="green"
        font="18px"
      />
      <Button
        text="Edit"
        width={"7rem"}
        click={() => {}}
        height="2rem"
        color={"blue"}
        back="white"
        font="18px"
      />
      <Button
        text="Delete"
        width={"7rem"}
        click={showDeleteHandler}
        height="2rem"
        color={"red"}
        back="white"
        font="18px"
      />
      {deleteWarning && (
        <Modal>
          <Container width="100%" padding="1rem" align="center" height="100%">
            <PTags width="70%" fontSize="18px">
              Do you want to delete {props.title} ?
            </PTags>
            <Container width="30%" justify="space-around">
              <Button
                text="Yes"
                font="18px"
                back="white"
                color="green"
                click={deleteProductHandler}
              />
              <Button
                text="No"
                font="18px"
                back="white"
                color="gray"
                click={hideDeleteHandler}
              />
            </Container>
          </Container>
        </Modal>
      )}

      {actionWarning && (
        <Modal>
          <Container width="100%" padding="1rem" align="center" height="100%">
            <PTags width="70%" fontSize="18px">
              Success! Product deleted from store!
            </PTags>
            <Container width="30%" justify="space-around">
              <Button
                text="Close"
                font="18px"
                back="white"
                color="green"
                click={hideActionWarningHandler}
              />
            </Container>
          </Container>
        </Modal>
      )}
    </Container>
  );
};

export default DisplayProducts;
