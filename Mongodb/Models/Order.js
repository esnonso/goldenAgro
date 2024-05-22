import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    items: { type: Array, required: true },
    reference: String,
    status: String,
    transaction: String,
    message: String,
    total: { type: String, required: true },
    delivered: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
