import { Link } from "react-router-dom";
import Container from "../Containers/container";
import "./index.css";

const UserProfile = () => {
  return (
    <div className="container-profile">
      <Container justify="flex-end" padding="0.5rem 0.5rem">
        <Link to="/dashboard">Admin Dashboard</Link>
      </Container>
    </div>
  );
};

export default UserProfile;
