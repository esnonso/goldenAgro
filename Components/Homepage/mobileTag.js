import Container from "../Containers/container";
import Button from "../Button";
import { H1Tags, PTags } from "../Text";

const MobileTag = (props) => {
  return (
    <Container
      flex={"column"}
      padding="2rem 0.5rem"
      radius="5px"
      color="#b0903d"
      opacity="0.9"
      textColor="white"
    >
      <H1Tags margin="0.3rem" fontSize="22px">
        Buy Premium Nigerian Rice
      </H1Tags>
      <PTags margin="0.3rem">20% discount on all products</PTags>
      <Button
        text="Shop now"
        width="60%"
        font="18px"
        padding={"0.2rem 0.5rem"}
        borderRadius={"5px"}
        height={"3rem"}
        margin={"0.9rem 0.3rem"}
        back="#0b6623"
        click={props.showCart}
      />
    </Container>
  );
};

export default MobileTag;
