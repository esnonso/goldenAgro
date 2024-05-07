import axios from "axios";
const token = localStorage.getItem("token");

export const productsRequests = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      const color = formData.get("color");
      const quantity = formData.get("quantity");
      const size = formData.get("size");
      const event = {
        title: formData.get("title"),
        brand: formData.get("brand"),
        variety: { color: color, amountInStock: quantity, size: size },
        image: formData.get("image"),
        description: formData.get("desc"),
        features: formData.get("features"),
        price: formData.get("price"),
        category: formData.get("category"),
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/products",
          event,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        alert(response.data.message);
        window.location.reload();
        return response;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
    default: {
      const response = await axios.get("http://localhost:8080/api/products");
      return response.data;
    }
  }
};

export const getProductsFromStore = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    return response.data;
  } catch (err) {
    return err;
  }
};
