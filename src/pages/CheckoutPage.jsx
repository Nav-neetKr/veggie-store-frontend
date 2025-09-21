import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Box, TextField, Button } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export function CheckoutPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { token, placeOrder } = useAuth();

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await placeOrder();
      navigate("/order-history");
    } catch (err) {
      alert("Failed to place order. Please try again!");
      throw err;
    }
  };

  const createOrder = async () => {
    try {
      const url = "/api/paypal/create-order";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(url, {}, config);
      const orderId = response.data.orderId;
      console.log("Created Order Id: ", orderId);
      return orderId;
    } catch (err) {
      console.log("Error creating PayPal order ", err);
      alert("Could not initiate PayPal checkout!");
    }
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Checkout Page
        </Typography>
        <Box component="form" onSubmit={(e) => handleSubmit(e)}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="address"
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <PayPalButtons
            type="submit"
            fullWidth
            variant="contained"
            createOrder={createOrder}
            sx={{ mt: 3, mb: 2 }}
          >
            Place Order
          </PayPalButtons>
        </Box>
      </Container>
    </PayPalScriptProvider>
  );
}
