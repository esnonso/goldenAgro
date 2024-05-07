import Container from "../Containers/container";
import { NavLink, Outlet } from "react-router-dom";
import "./index.css";

const AdminPortal = () => {
  return (
    <>
      <Container width="100%">
        <Container width="20%" color="crimson" height="100vh" padding="4rem 0">
          <ul className="nav-admin">
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li className="top-nav">Manage All Products</li>
            </NavLink>
            <NavLink to="create-video">
              <li>Manage Orders</li>
            </NavLink>
            <NavLink to="create-video">
              <li>Manage Users</li>
            </NavLink>
            <NavLink to="create-video">
              <li>View Reports</li>
            </NavLink>
          </ul>
        </Container>
        <Container padding="0.5rem" width="75%">
          <Outlet />
        </Container>
      </Container>
    </>
  );
};

export default AdminPortal;
