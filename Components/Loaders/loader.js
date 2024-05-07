import Container from "../Containers/container";

const Loader = () => {
  return (
    <Container
      width="100%"
      height="100%"
      justify="center"
      align="center"
      opacity="0.7"
    >
      <div className="loader"></div>
    </Container>
  );
};

export default Loader;
