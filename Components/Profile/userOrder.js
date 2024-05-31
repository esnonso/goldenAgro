import Container from "../Containers/container";
import { PTags } from "../Text";

export default function UserOrders({ order }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Container width="100%" padding="1rem" flex="column">
      <PTags fontSize="20px">Details for {order.transaction}</PTags>
      {order.items.map((item, index) => (
        <Container
          width="100%"
          justify="space-between"
          key={index + "o"}
          margin="0.5rem 0"
        >
          <PTags>Desc: {item.size}</PTags>
          <PTags>Qty: {item.quantity}</PTags>
          <PTags>Price: ₦{numberWithCommas(+item.price)}</PTags>
        </Container>
      ))}
      <PTags margin="0.5rem 0">
        <b>Total:</b> ₦{numberWithCommas(+order.total)}
      </PTags>
      <PTags margin="0.5rem 0">
        <b>Delivery Status:</b> {order.delivered}
      </PTags>
      <PTags>
        <b>Delivery Address:</b> {order.address}
      </PTags>
    </Container>
  );
}
