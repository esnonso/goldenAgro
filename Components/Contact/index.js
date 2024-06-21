import Container from "../Containers/container";
import { H1Tags, PTags } from "../Text";
import classes from "./index.module.css";

export default function Contact() {
  return (
    <Container flex="column" width="100%" margin="5rem 0 0 0">
      <div className={classes["contact-header"]}>
        <H1Tags>Get in touch with us</H1Tags>
      </div>

      <Container margin="1rem" padding="1rem" flex="column">
        <PTags fontSize="20px" fontWeight="600" margin="1rem 0 0.5rem 0">
          Contact Information
        </PTags>
        <Container flex="column">
          <b>Phone</b>
          <ul>
            <li>Sales Enquiry: 08034906617</li>
            <li>Customer care: 08155157575</li>
          </ul>
        </Container>
        <Container flex="column">
          <b>Email</b>
          <ul>
            <li>admin@goldenagro.ng</li>
            <li>Goldenagroindltd@gmail.com</li>
            <li>support@goldenagroind.com</li>
          </ul>
        </Container>
        <Container flex="column">
          <b>Address</b>
          <ul>
            <li>
              No 5 Divine Grace close, Rumuodara, PortHarcourt, Rivers State,
              Nigeria.
            </li>
          </ul>
        </Container>
        <Container flex="column">
          <b>Business Hours</b>
          <ul>
            <li>Monday to Friday: 8:00am - 5:00pm</li>
            <li>Saturdays: 7:00am - 3:00pm</li>
          </ul>
        </Container>

        <PTags fontSize="20px" fontWeight="600" margin="1rem 0 0.5rem 0">
          Wholesale enquiries
        </PTags>
        <div className={classes.wholesale}>
          <PTags>
            Interested in partnering with GoldenAgro for wholesale
            opportunities? We welcome inquiries from retailers, distributors,
            and businesses looking to offer our premium Nigerian rice to their
            customers. Please reach out to us using the contact information
            provided above, and one of our representatives will be in touch with
            you shortly to discuss partnership opportunities.
          </PTags>
        </div>
      </Container>
    </Container>
  );
}
