import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import HomeIcon from "../../Images/home.png";
import UsersIcon from "../../Images/users.png";
import OrderIcon from "../../Images/cart.png";
import Container from "../Containers/container";
import classes from "./index.module.css";
import Loader from "../Loaders/loader";

export default function AdminPortalLayout(props) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setIsLoading] = useState(true);

  const fetchUserHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/getUser");
      if (response.data.role !== "Administrator") router.replace("/");
      setIsLoading(false);
    } catch (error) {
      router.replace("/");
    }
  };

  useEffect(() => {
    fetchUserHandler();
  }, []);
  return (
    <Container width="100%" margin="5rem 0 0 0">
      <nav className={classes.nav}>
        <Link
          href="/golden-admin"
          className={
            pathname === "/golden-admin"
              ? `${classes.navLink} ${classes["navLink-active"]}`
              : classes.navLink
          }
        >
          <Image
            src={HomeIcon}
            alt="home icon from icons8"
            height={35}
            width={35}
          />
        </Link>
        <Link
          href="/golden-admin/orders"
          className={
            pathname === "/golden-admin/orders"
              ? `${classes.navLink} ${classes["navLink-active"]}`
              : classes.navLink
          }
        >
          <Image
            src={OrderIcon}
            alt="cart icon from icons8"
            height={35}
            width={35}
          />
        </Link>
        <Link
          href="/golden-admin/users"
          className={
            pathname === "/golden-admin/users"
              ? `${classes.navLink} ${classes["navLink-active"]}`
              : classes.navLink
          }
        >
          <Image
            src={UsersIcon}
            alt="users icon from icons8"
            height={35}
            width={35}
          />
        </Link>
      </nav>

      {props.children}
      {loading && <Loader message={"Loading Dashboard"} />}
    </Container>
  );
}
