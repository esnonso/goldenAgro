import Container from "../Containers/container";
import Image from "next/image";
import ContainerFlexColumn from "../Containers/container-flex-column";
import Button from "../Button";
import Twitter from "../../Images/twitter.png";
import In from "../../Images/linked.png";
import Insta from "../../Images/insta.png";
import { PTags } from "../Text";
import classes from "./index.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <Container
      flex="column"
      width="100%"
      margin="6rem 0 0 0"
      padding="4rem 1rem"
      color="#b0903d"
      textColor="white"
    >
      <ContainerFlexColumn>
        <div className={classes["support"]}>
          <PTags
            textAlign="left"
            margin="0 0 1rem 0"
            fontWeight="600"
            color="#0b6623"
          >
            SUPPORT
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 0.3rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            FAQS
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 0.3rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            Track order
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 1rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            Contact us
          </PTags>
        </div>

        <div className={classes["stelm_beauty"]}>
          <PTags
            textAlign="left"
            margin="0 0 1rem 0"
            fontWeight="600"
            color="#0b6623"
          >
            GOLDEN AGRO
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 0.3rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            <Link href="/">Home</Link>
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 0.3rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            <Link href="/about">About Us</Link>
          </PTags>
          <PTags
            textAlign="left"
            margin="0 0 0.3rem 0"
            fontSize="14px"
            color="#CCCCCC"
          >
            <Link href="/contact">Contact Us</Link>
          </PTags>
        </div>

        <div className={classes["newsletter"]}>
          <PTags
            textAlign="left"
            margin="0 0 1rem 0"
            fontWeight="600"
            color="#0b6623"
          >
            Subscribe to our news letter
          </PTags>
          <form>
            <input type="text" />
            <Button
              text="Subscribe"
              width="fit-content"
              height={"2.5rem"}
              padding={"0 2rem"}
              border={"1px white solid"}
              color={"white"}
              back="#0b6623"
            />
          </form>
        </div>
      </ContainerFlexColumn>
      <div className={classes["social"]}>
        <Image src={Twitter} alt="" width={25} height={25} />
        <Image src={In} alt="" width={25} height={25} />
        <Image src={Insta} alt="" width={25} height={25} />
      </div>
      <Container margin="0.2rem 0 1rem 0" justify="center">
        <small style={{ color: "#36454f" }}>
          Golden Agro Industries LTD all rights reserved. 2023
        </small>
      </Container>
    </Container>
  );
};

export default Footer;
