import { useState, useEffect } from "react";
import Container from "../Containers/container";
import Cards from "../Cards";
import { PTags } from "../Text";
import Button from "../Button";
import { useScreenSize } from "../Hooks/useScreenSize";
import UserIcon from "../../Images/def.jpg";
import Image from "next/image";
import axios from "axios";

const Reviews = () => {
  const stars = Array(5).fill(0);
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(0);
  const [screenSize, setScreenSize] = useScreenSize();
  const [chunkedreviews, setChunkedreviews] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getReviewsHandler = async () => {
    try {
      const allReviews = await axios.get("/api/getReviews");
      if (allReviews.data.length >= 9) setReviews(allReviews.data);
      else setReviews(dummyReviews);
    } catch {
      setReviews(dummyReviews);
    }
  };

  useEffect(() => {
    getReviewsHandler();
  }, []);

  useEffect(() => {
    setCount(0);
    const phone = window.matchMedia("(max-width: 700px)");
    const tab = window.matchMedia(
      "(min-width: 701px) and ((max-width: 1016px)"
    );
    const desktop = window.matchMedia("(min-width: 1016px)");
    if (reviews) {
      if (reviews.length >= 9) {
        if (phone.matches && reviews.length >= 9) {
          const joinedArr = [];
          for (var i = 0; i < 9; i++) {
            joinedArr.push([reviews[i]]);
          }
          setMax(8);
          setChunkedreviews(joinedArr);
        }
        if (tab.matches && reviews.length >= 8) {
          const joinedArr = [];
          for (i = 0; i < 8; i++) {
            const lastItem = joinedArr[joinedArr.length - 1];
            if (!lastItem || lastItem.length === 2) {
              joinedArr.push([reviews[i]]);
            } else {
              lastItem.push(reviews[i]);
            }
          }
          setMax(3);
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
          setMax(2);
          setChunkedreviews(joinedArr);
        }
      }
    }
  }, [screenSize, reviews]);

  const increaseCountHandler = () => {
    if (count < max) {
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
          />
        </Container>
        <Container alignItems="center" width="90%" margin="0 auto 0 auto">
          {chunkedreviews.length > 0 &&
            chunkedreviews[count].map((item) => (
              <Cards key={item._id} height="fit-content">
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
                  <b>{item.user.name}</b>
                </PTags>
                <PTags width="100%" padding="0.4rem 0 0 0" textAlign="justify">
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
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Reviews;

const dummyReviews = [
  {
    _id: 1,
    user: { id: 2, name: "Uchenna Otuonye" },
    rating: 5,
    comment:
      "This is a great quality rice & perfect for my daily use. The grains boil to a firm consistency that go well with any gravy. The aroma is great.",
  },
  {
    _id: 2,
    user: { id: 1, name: "Utoh Raphael Chijioke" },
    rating: 5,
    comment:
      "Golden Agro Industries Ltd is the most reliable rice producer in Nigeria! The grains are finest, sweeter and nourishing. I guarantee their product for best price, quality and quantity...",
  },
  {
    _id: 3,
    user: { id: 25, name: "Geraldine Barde" },
    rating: 4.5,
    comment:
      "Excellent rice quality; no stone, no stain, super clean and the very best in the market. Different package of rice available to suit the number of families for a given time. Thank you Golden Agro for standing out 👍 👍 👍",
  },
  {
    _id: 4,
    user: { id: 35, name: "CHUKWUEBUKA IJEOMA" },
    rating: 5,
    comment:
      "Golden Agro Industries Limited.. is trademark of excellence.. Their products are unique and exceptional..  They have a solid business and investment plan which enables them meet up with all customer demands and expectations.. Highly Remarkable.",
  },
  {
    _id: 5,
    user: { id: 51, name: "Okonkwo Joseph" },
    rating: 5,
    comment:
      "He is very honest and delivers promptly. The last order I got from him to my customers made them longing for more. Please keep up the good work.",
  },
  {
    _id: 6,
    user: { id: 63, name: "IBEH CHIDERA BOB" },
    rating: 5,
    comment:
      "The best rice you can ever think of buying. Thank me later. Kudos Golden Agro 👍",
  },
  {
    _id: 7,
    user: { id: 7, name: "Henry Ehikioya" },
    rating: 5,
    comment:
      "I love the rice because it's long grains and very neat. Besides that, it cooks fast.",
  },
  {
    _id: 8,
    user: { id: 8, name: "augustine pablo ajuzie" },
    rating: 5,
    comment:
      "Golden agro is a tested and trusted company. 3years and still enjoying there services. There rice is superb.👍",
  },
  {
    _id: 9,
    user: { id: 9, name: "Eleje Ephraim" },
    rating: 5,
    comment:
      "na this rice we use for our grandfather celebration of life. The rice go well scatter.",
  },
];
