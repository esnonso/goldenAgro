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
        <PTags>
          <b>Phone</b>
          <ul>
            <li>Sales Enquiry: 08123456789</li>
            <li>Customer care: 08123456789</li>
          </ul>
        </PTags>
        <PTags>
          <b>Email</b>
          <ul>
            <li>goldenagro@gmail.com</li>
          </ul>
        </PTags>
        <PTags>
          <b>Address</b>
          <ul>
            <li>No 2 Gwagwalada road Mile 2</li>
          </ul>
        </PTags>
        <PTags>
          <b>Business Hours</b>
          <ul>
            <li>Monday to Friday: 8:00am - 5:00pm</li>
            <li>Saturdays: 7:00am - 3:00pm</li>
          </ul>
        </PTags>

        <PTags fontSize="20px" fontWeight="600" margin="1rem 0 0.5rem 0">
          Wholesale enquiries
        </PTags>
        <PTags>
          Interested in partnering with GoldenAgro for wholesale opportunities?
          We welcome inquiries from retailers, distributors, and businesses
          looking to offer our premium Nigerian rice to their customers. Please
          reach out to us using the contact information provided above, and one
          of our representatives will be in touch with you shortly to discuss
          partnership opportunities.
        </PTags>
      </Container>
    </Container>
  );
}
