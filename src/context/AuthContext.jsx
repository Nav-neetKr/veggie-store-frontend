import axios from "axios";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getCart = async () => {
      const response = await axios.get("/api/cart");
      setCart(response.data);
    };

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decodedUsr = jwtDecode(token);
      setUser(decodedUsr.user);
      getCart();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const usrData = {
        email,
        password,
      };

      const response = await axios.post("/api/users/login", usrData);

      const newToken = response.data.token;
      const newRole = response.data.role;
      console.log(response.data.role);
      setRole(newRole);
      setToken(newToken);
      alert("Logged in successfully!");
    } catch (err) {
      console.log("Failed to login: ", err.response.data);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("cart");
    setCart(null);
    setUser(null);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post("/api/cart", {
        productId,
        quantity,
      });
      console.log("Current Cart in Response ", response.data);
      const newCart = response.data;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Added 1 item!");
    } catch (err) {
      console.log("Failed to add to cart: ", err.response.data);
      throw err;
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      console.log("product id: ", productId);
      console.log("quantity: ", quantity);
      const response = await axios.put(`/api/cart/${productId}`, {
        quantity,
      });

      const newCart = response.data;
      console.log(newCart);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Cart Updated!");
    } catch (err) {
      console.log("Quantity could not be updated!");
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/${productId}`);
      const newCart = response.data;
      console.log("The new cart is ", newCart);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (err) {
      console.log("The item could not be deleted.");
      alert("Failed to remove from cart. Please try again!");
    }
  };

  const placeOrder = async () => {
    const response = await axios.post("/api/orders");
    console.log("Place Order call---> ", response.data);
    setCart(null);
    localStorage.removeItem("cart");
    alert("Order Placed");
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      cart,
      user,
      role,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      placeOrder,
    }),
    [token, cart, user, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
