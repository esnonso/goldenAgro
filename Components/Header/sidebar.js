import { useSession } from "next-auth/react";
import Link from "next/link";
import Container from "../Containers/container";
import Button from "../Button";
import Backdrop from "../Backdrop/backdrop";
import classes from "./header.module.css";

const links = [
  { caption: "Homepage", url: "/" },
  { caption: "About Us", url: "/about" },
  { caption: "Contact Us", url: "/contact" },
];

export default function Sidebar(props) {
  const { status } = useSession();
  return (
    <>
      <Backdrop click={props.onHide} />
      <div className={classes.sidebar}>
        <Container align="center" width="100%">
          <Container width="80%">
            <h3 style={{ margin: 0 }}>
              GOLDEN<span>AGRO</span>
            </h3>
          </Container>
          <Container width="20%" justify="flex-end">
            <Button
              text="X"
              width="2rem"
              back={"inherit"}
              height={"2rem"}
              color="white"
              font="larger"
              type="button"
              fontWeight="600"
              click={props.onHide}
            />
          </Container>
        </Container>

        <ul>
          {links.map((l, i) => (
            <li key={l.url}>
              <Link href={l.url} onClick={props.onHide}>
                {l.caption.toUpperCase()}
              </Link>
            </li>
          ))}
          {status === "authenticated" ? (
            <li>
              <Link href={"/profile"} onClick={props.onHide}>
                MY PROFILE
              </Link>
            </li>
          ) : (
            <li>
              <Link href={"/login"} onClick={props.onHide}>
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
