import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
  Divider,
} from "@mui/material";

export function OrderHistoryPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        console.log("Orders ", response.data);
        setOrders(response.data);
      } catch (err) {
        console.log("Could not get orders", err.message);
        alert("Unable to fetch message!");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return <p>Fetching you orders....</p>;
  }

  console.log(orders);

  if (!orders || orders.length === 0) {
    return <p>You have not placed any orders yet</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" gutterBottom>
        Order History Page
      </Typography>
      {orders.map((it) => (
        <Paper key={it._id} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{it._id}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            OrderId:{it._id} OrderDate:{it.orderDate}
          </Typography>
          <Typography variant="h5">
            Amount:
            {it.totalAmount}
          </Typography>
          <List dense>
            {it.items.map((itt) => (
              <ListItem key={itt._id}>
                <ListItemText
                  primary={itt.product.name}
                  secondary={`${itt.quantity} - ${itt.price}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
}
