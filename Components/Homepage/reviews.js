import { useState, useEffect } from "react";
import Container from "../Containers/container";
import Cards from "../Cards";
import { PTags } from "../Text";
import Button from "../Button";
import { useScreenSize } from "../Hooks/useScreenSize";
import UserIcon from "../../Images/def.jpg";
import Image from "next/image";

const Reviews = () => {
  const stars = Array(5).fill(0);
  const [count, setCount] = useState(0);
  const [screenSize, setScreenSize] = useScreenSize();
  const [chunkedreviews, setChunkedreviews] = useState([]);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 700px)");
    const tab = window.matchMedia(
      "(min-width: 701px) and ((max-width: 1016px)"
    );
    const desktop = window.matchMedia("(min-width: 1016px)");
    if (reviews) {
      if (reviews.length >= 3) {
        if (phone.matches && reviews.length >= 3) {
          const joinedArr = [];
          for (var i = 0; i < 3; i++) {
            joinedArr.push([reviews[i]]);
          }
          setChunkedreviews(joinedArr);
        }
        if (tab.matches && reviews.length >= 6) {
          const joinedArr = [];
          for (i = 0; i < 6; i++) {
            const lastItem = joinedArr[joinedArr.length - 1];
            if (!lastItem || lastItem.length === 2) {
              joinedArr.push([reviews[i]]);
            } else {
              lastItem.push(reviews[i]);
            }
          }
          setChunkedreviews(joinedArr);
        }
        if (desktop.matches && reviews.length >= 9) {
          const joinedArr = [];
          for (i = 0; i < 9; i++) {
            const lastItem = joinedArr[joinedArr.length - 1];
            if (!lastItem || lastItem.length === 3) {
              joinedArr.push([reviews[i]]);
            } else {
              lastItem.push(reviews[i]);
            }
          }
          setChunkedreviews(joinedArr);
        }
      }
    }
  }, [screenSize]);
  const increaseCountHandler = () => {
    if (count < 2) {
      setCount((prevState) => prevState + 1);
    }
  };

  const decreaseCountHandler = () => {
    if (count > 0) {
      setCount((prevState) => prevState - 1);
    }
  };

  const imageStyle = {
    border: "1px #0b6623 solid",
    padding: "1rem",
    borderRadius: "50%",
    backgroundColor: "#0b6623",
  };

  return (
    <Container width="100%" flex="column" margin="2rem 0">
      <Container marginTop="4rem">
        <Container align="center">
          <Button
            text="&#60;"
            font="20px"
            height={"fit-content"}
            click={decreaseCountHandler}
            color={"#0b6623"}
          />
        </Container>
        <Container alignItems="center" width="90%" margin="0 auto 0 auto">
          {chunkedreviews.length > 0 &&
            chunkedreviews[count].map((item) => (
              <Cards key={item._id} height="20rem">
                <Image
                  src={UserIcon}
                  alt="user-icon"
                  width={50}
                  height={50}
                  style={imageStyle}
                />
                <PTags margin="1rem 0 0 0">
                  {stars.map((s, i) => {
                    if (i < item.rating)
                      return (
                        <span key={i} style={{ color: "#b0903d" }}>
                          ★
                        </span>
                      );
                    else return <span key={i}>☆</span>;
                  })}
                </PTags>

                <PTags
                  fontSize="18px"
                  width="100%"
                  padding="0.4rem 0 0 0"
                  textAlign="center"
                >
                  <b>{item.name}</b>
                </PTags>
                <PTags
                  fontSize="18px"
                  width="100%"
                  padding="0.4rem 0 0 0"
                  textAlign="center"
                >
                  "{item.comment}"
                </PTags>
              </Cards>
            ))}
        </Container>

        <Container align="center">
          <Button
            text="&#62;"
            font="20px"
            height={"fit-content"}
            click={increaseCountHandler}
            color={"#0b6623"}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Reviews;

const reviews = [
  {
    _id: 1,
    name: "Starboy Nwoke",
    rating: 5,
    comment: "Freshfold is the best for all",
  },
  {
    _id: 2,
    name: "Lethita One",
    rating: 4,
    comment: "Good drycleaning service",
  },
  {
    _id: 3,
    name: "Big Fish",
    rating: 4.5,
    comment: "Recommended dry cleaning service for all",
  },
  {
    _id: 4,
    name: "Ben Carson",
    rating: 5,
    comment: "Ethical dry cleaning service for all",
  },
  {
    _id: 5,
    name: "Nonny Sharman",
    rating: 5,
    comment: "Good drycleaners. Expert service",
  },
  {
    _id: 6,
    name: "Ben Bonus",
    rating: 3,
    comment: "Took time to deliver",
  },
  {
    _id: 7,
    name: "Roncho R",
    rating: 1,
    comment: "Poor customer service",
  },
  {
    _id: 8,
    name: "Ricky Mort",
    rating: 5,
    comment: "I love these guys",
  },
  {
    _id: 9,
    name: "Rebing John",
    rating: 5,
    comment: "Freshfold is the best for all and recommended for all",
  },
];
