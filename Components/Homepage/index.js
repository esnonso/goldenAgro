import { useState } from "react";
import Container from "../Containers/container";
import Button from "../Button";
import MobileTag from "./mobileTag";
import { H1Tags, PTags } from "../Text";
import ContainerFlexColumn from "../Containers/container-flex-column";
import classes from "./index.module.css";
import Reviews from "./reviews";
import ReviewForm from "../Reviews";
import AddForm from "../Cart/AddForm";
import Modal from "../Modal";

const Homepage = () => {
  const [cartForm, showCartForm] = useState(false);
  const [reviewForm, showReviewForm] = useState(false);

  const showCartFormHandler = () => showCartForm(true);
  const hideCartFormHandler = () => showCartForm(false);

  const showReviewFormHandler = () => showReviewForm(true);
  const hideReviewFormHandler = () => showReviewForm(false);

  return (
    <Container flex="column" width="100%" margin="3.5rem 0 0 0">
      <Container width="100%">
        <div className={classes["word"]}>
          <H1Tags margin="0.3rem">Premium Nigerian Rice</H1Tags>
          <PTags margin="0.3rem" width="70%">
            20% discount on all products
          </PTags>
          <Button
            text="Shop now"
            width="30%"
            font="larger"
            padding={"0.2rem 0.5rem"}
            height={"3rem"}
            margin={"0.9rem 0.3rem"}
            back={"#0b6623"}
            click={showCartFormHandler}
          />
        </div>
        <div className={classes["banner"]}>
          <div className={classes["mobile-tag"]}>
            <MobileTag showCart={showCartFormHandler} />
          </div>
        </div>
      </Container>

      <div className={classes["head-tag-home"]}>
        <PTags margin="7rem 0 1rem 1rem" fontSize="22px">
          Planning for an event?
        </PTags>
      </div>

      <div className={classes["advert"]}>
        <div className={classes["advert-img"]}>
          <Container
            height="100%"
            width="100%"
            textColor="white"
            flex="column"
            align="center"
            justify="center"
            padding="0 1rem"
          >
            <PTags textAlign="center" margin="2rem 0" fontSize="20px">
              Give your guests top notch service with our premium rice
            </PTags>
            <Button
              text="Shop Now"
              width="fit-content"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              border={"1px white solid"}
              click={showCartFormHandler}
            />
          </Container>
        </div>
        <Container flex="column" justify="center" padding="0 1rem">
          <Container margin="1rem 0 0 0">
            <span className={classes["star"]}>★</span> With our quality premium
            rice
          </Container>
          <Container margin="1rem 0 0 0">
            <span className={classes["star"]}>★</span> Make perfect rice
            delicacies for your guests
          </Container>
          <Container margin="1rem 0 0 0">
            <span className={classes["star"]}>★</span> Grace your event with our
            premium rice
          </Container>
        </Container>
      </div>

      <Container
        width="100%"
        justify="space-between"
        margin="7rem 0 1rem 0"
        padding="0 1rem"
      >
        <PTags textAlign="left" fontSize="25px">
          Morning Ritual
        </PTags>
        {/* <PTags textAlign="left" fontSize="17px">
          Shop Now →
        </PTags> */}
      </Container>

      <div className={classes["advert-two"]}>
        <div className={classes["advert-two-img"]}>
          <Container
            height="100%"
            width="100%"
            textColor="white"
            flex="column"
            align="center"
            justify="center"
          >
            {/* <PTags margin="0 0 1rem 0" fontSize="20px">
              Golden Agro Family Meal
            </PTags> */}

            {/* <Button
              text="Buy now"
              width="fit-content"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              border={"1px white solid"}
              click={showCartFormHandler}
            /> */}
          </Container>
        </div>
        <Container flex="column" align="center" justify="center">
          <Container margin="0.5rem 0 0 0">
            <span className={classes["star"]}>★</span>
            <PTags>Breakfast is the most important meal of the day</PTags>
          </Container>
          <Container margin="0.5rem 0 0 0">
            <span className={classes["star"]}>★</span>
            <PTags>
              Golden Agro premium rice contains Vitamin D from healthy bones
            </PTags>
          </Container>
          <Container margin="0.5rem 0 0 0">
            <span className={classes["star"]}>★</span>
            <PTags>
              Give yourself and family a nutritous and premium breakfast
            </PTags>
          </Container>
        </Container>
      </div>

      <div className={classes["top-categories"]}>
        <PTags margin="7rem 0 0 1rem" fontSize="22px">
          Top Categories
        </PTags>
      </div>

      <ContainerFlexColumn margin="0 0 1rem 0" padding="0 2%" wrap="wrap">
        <div className={classes["small-bag"]}>
          <Container
            color="#0b6623"
            textColor="white"
            opacity="0.8"
            height="3rem"
            width="100%"
            align="center"
            padding="0 0.5rem"
          >
            <Button
              text="+Add To Cart"
              width="100%"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              font="20px"
              click={showCartFormHandler}
            />
          </Container>
        </div>
        <div className={classes["medium-bag"]}>
          <Container
            color="#0b6623"
            textColor="white"
            opacity="0.8"
            height="3rem"
            width="100%"
            align="center"
            padding="0 0.5rem"
          >
            <Button
              text="+Add To Cart"
              width="100%"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              font="20px"
              click={showCartFormHandler}
            />
          </Container>
        </div>
        <div className={classes["average-bag"]}>
          <Container
            color="#0b6623"
            textColor="white"
            opacity="0.8"
            height="3rem"
            width="100%"
            align="center"
            padding="0 0.5rem"
          >
            <Button
              text="+Add To Cart"
              width="100%"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              font="20px"
              click={showCartFormHandler}
            />
          </Container>
        </div>
        <div className={classes["big-bag"]}>
          <Container
            color="#0b6623"
            textColor="white"
            opacity="0.8"
            height="3rem"
            width="100%"
            align="center"
            padding="0 0.5rem"
          >
            <Button
              text="+Add To Cart"
              width="100%"
              back={"#0b6623"}
              height={"2.5rem"}
              padding={"0 2rem"}
              color="white"
              font="20px"
              click={showCartFormHandler}
            />
          </Container>
        </div>
      </ContainerFlexColumn>

      <Container margin="7rem 0" padding="0 1rem" flex="column" width="100%">
        <PTags textAlign="center" width="100%" fontSize="25px">
          Customer Reviews
        </PTags>

        <Reviews />

        <Container width="100%" justify="center">
          <Button
            text="Leave a Review"
            font="20px"
            padding="1rem 3rem"
            width="20rem"
            back="#0b6623"
            color="white"
            borderRadius={"5px"}
            click={showReviewFormHandler}
          />
        </Container>
      </Container>

      {/* OVERLAYS */}
      {cartForm && (
        <Modal click={hideCartFormHandler}>
          <AddForm onHide={hideCartFormHandler} />
        </Modal>
      )}

      {reviewForm && (
        <Modal click={hideReviewFormHandler}>
          <ReviewForm onHide={hideReviewFormHandler} />
        </Modal>
      )}
    </Container>
  );
};

export default Homepage;
