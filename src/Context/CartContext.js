import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

const createAxiosInstance = () => {
  const token = localStorage.getItem("userToken");
  return axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1",
    headers: {
      token: token,
    },
  });
};

const axiosInstance = createAxiosInstance();

async function addToCart(id) {
  try {
    const response = await axiosInstance.post("/cart", { productId: id });
    return response;
  } catch (error) {
    return error;
  }
}

async function getLoggedUserCart() {
  try {
    const response = await axiosInstance.get("/cart");
    return response;
  } catch (error) {
    return error;
  }
}

async function removeCartItem(productId) {
  try {
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return response;
  } catch (error) {
    return error;
  }
}

async function clearAllItems() {
  try {
    const response = await axiosInstance.delete("/cart");
    return response;
  } catch (error) {
    return error;
  }
}

async function updateProductQuantity(productId, count) {
  try {
    const response = await axiosInstance.put(`/cart/${productId}`, { count });
    return response;
  } catch (error) {
    return error;
  }
}

export default function CartContextProvider(props) {
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateProductQuantity,
        clearAllItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
