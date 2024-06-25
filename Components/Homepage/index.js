import { useState, useEffect } from "react";

import Image from "next/image";
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
import DiagonalLines from "../Lines";
import { products } from "../Products";

const Homepage = () => {
  const [cartForm, showCartForm] = useState(false);
  const [reviewForm, showReviewForm] = useState(false);
  const [quantityForm, showQuantityForm] = useState(false);
  const [size, setSize] = useState("");

  const showCartFormHandler = () => showCartForm(true);
  const hideCartFormHandler = () => showCartForm(false);

  const showReviewFormHandler = () => showReviewForm(true);
  const hideReviewFormHandler = () => showReviewForm(false);

  const hideQtyFormHandler = () => setSize("");

  useEffect(() => {
    if (size) showQuantityForm(true);
    else showQuantityForm(false);
  }, [size]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Container flex="column" width="100%" margin="3.5rem 0 0 0">
      <Container width="100%">
        <div className={classes["word"]}>
          <H1Tags margin="0.3rem">Buy Premium Nigerian Rice</H1Tags>
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

      <DiagonalLines />

      <PTags margin="5rem 0 1rem 1rem" fontSize="22px">
        Planning an event?
      </PTags>

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
            <span className={classes["star"]}>★ </span> With our quality premium
            non-sticky rice
          </Container>
          <Container margin="1rem 0 0 0">
            <span className={classes["star"]}>★ </span> Make perfect rice
            delicacies for your guests
          </Container>
          <Container margin="1rem 0 0 0">
            <span className={classes["star"]}>★ </span> Grace your event with
            our premium rice
          </Container>
        </Container>
      </div>

      <Container
        width="100%"
        justify="space-between"
        margin="5rem 0 0 0"
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
            <span className={classes["star"]}>★ </span>
            <PTags>Breakfast is the most important meal of the day</PTags>
          </Container>
          <Container margin="0.5rem 0 0 0">
            <span className={classes["star"]}>★ </span>
            <PTags>
              Golden Agro premium rice contains Vitamin D from healthy bones
            </PTags>
          </Container>
          <Container margin="0.5rem 0 0 0">
            <span className={classes["star"]}>★ </span>
            <PTags>
              Give yourself and family a nutritous and premium breakfast
            </PTags>
          </Container>
        </Container>
      </div>

      <DiagonalLines />

      <div className={classes["top-categories"]}>
        <PTags margin="5rem 0 0 1rem" fontSize="22px">
          Top Categories
        </PTags>
      </div>

      <div className={classes["products-container"]}>
        {products.map((p) => (
          <div className={classes["products-div"]} key={p.id}>
            <Image
              src={p.image}
              alt="rice bag"
              className={classes["rice-bag-img"]}
            />
            <PTags width="100%" margin="0 0 0.5rem 0">
              Golden Agro premium rice - {p.size}
            </PTags>
            <PTags width="100%" margin="0 0 0.5rem 0">
              <b>₦ {numberWithCommas(p.price)}</b>
            </PTags>
            <Container
              // color="#0b6623"
              textColor="white"
              height="3rem"
              width="100%"
              align="center"
              padding="0 0.5rem"
            >
              <Button
                text="+Add To Cart"
                // width="30%"
                back={"#0b6623"}
                height={"2.5rem"}
                padding={"0 2rem"}
                color="white"
                font="inherit"
                border="none"
                click={() => setSize(p.size)}
              />
            </Container>
          </div>
        ))}
      </div>

      <DiagonalLines />

      <Container margin="5rem 0" padding="0 1rem" flex="column" width="100%">
        <PTags textAlign="center" width="100%" fontSize="25px">
          What our customers say about Us
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

      {quantityForm && (
        <Modal click={hideQtyFormHandler}>
          <AddForm onHide={hideQtyFormHandler} size={size} />
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
