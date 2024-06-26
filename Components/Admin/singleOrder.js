import { useState } from "react";
import Container from "../Containers/container";
import { PTags } from "../Text";
import axios from "axios";

export default function SingleOrder({ item }) {
  const [order, setOrder] = useState(item);
  const [loading, setIsLoading] = useState(false);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const updateOrderHandler = async (status) => {
    if (confirm("Proceed to change the delivery status of this order?")) {
      try {
        setIsLoading(true);
        const res = await axios.post("/api/admin-change-delivery-status", {
          id: order._id,
          status,
        });
        setOrder(res.data.order);
        alert("done");
      } catch (error) {
        alert("An error occured");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const buttonStyle = {
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    font: "inherit",
    border: "1px gray solid",
    marginBottom: "0.5rem",
    width: "8rem",
  };
  return (
    <Container width="100%" padding="1rem" flex="column">
      <PTags fontSize="20px">Details for {order.transaction}</PTags>
      <PTags margin="0.5rem 0" width="100%" textAlign="right">
        <span
          className={`${
            order.delivered === "Pending"
              ? "pending"
              : order.delivered === "Processing"
              ? "processing"
              : order.delivered === "In Transit"
              ? "in-transit"
              : "delivered"
          }`}
          style={{ padding: "0.5rem 1rem", borderRadius: "10px" }}
        >
          {order.delivered}
        </span>
      </PTags>
      {order.items.map((item, index) => (
        <Container
          width="100%"
          justify="space-between"
          key={index + "o"}
          margin="0.5rem 0"
        >
          <PTags>Desc: {item.size} Bag</PTags>
          <PTags>Qty: {item.quantity}</PTags>
          <PTags>Price: ₦{numberWithCommas(+item.price)}</PTags>
        </Container>
      ))}
      <PTags margin="0.5rem 0">
        <b>Total:</b> ₦{numberWithCommas(+order.total)}
      </PTags>
      <PTags margin="0.5rem 0">
        <b>Reference:</b> {order.reference}
      </PTags>
      <PTags margin="0.5rem 0">
        <b>Transaction Number:</b> {order.transaction}
      </PTags>

      <PTags margin="0.5rem 0">
        <b>Delivery Address:</b> {order.address}
      </PTags>

      <hr style={{ height: 0.5, width: "100%", background: "black" }} />

      <PTags fontSize="20px">Change Order Delivery Status</PTags>
      {!loading && (
        <Container
          width="100%"
          margin="1rem 0"
          justify="space-between"
          wrap="wrap"
        >
          <button
            className="pending"
            style={buttonStyle}
            onClick={() => updateOrderHandler("Pending")}
          >
            Pending
          </button>
          <button
            className="processing"
            style={buttonStyle}
            onClick={() => updateOrderHandler("Processing")}
          >
            Processing
          </button>
          <button
            className="in-transit"
            style={buttonStyle}
            onClick={() => updateOrderHandler("In Transit")}
          >
            In Transit
          </button>
          <button
            className="delivered"
            style={buttonStyle}
            onClick={() => updateOrderHandler("Delivered")}
          >
            Delivered
          </button>
        </Container>
      )}
      {loading && <PTags>Changing delivery status...</PTags>}
    </Container>
  );
}
