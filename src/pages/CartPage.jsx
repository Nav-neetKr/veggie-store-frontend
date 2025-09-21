import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Typography,
} from "@mui/material";

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useAuth();

  console.log("Cart Items: ", cart.items);
  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <List>
          {cart.items.map((it) => {
            console.log(it);
            console.log("Id: ", it._id);
            return (
              <Box key={it.product._id}>
                <ListItem>
                  <ListItemText
                    primary={it.product.name}
                    secondary={`Quantity: ${parseInt(
                      it.quantity,
                      10
                    )} x $${parseInt(it.product.price, 10).toFixed(2)}`}
                  />
                  <ListItemAvatar>
                    <Avatar src={it.product.imageUrl} alt="Vegetable Image" />
                  </ListItemAvatar>
                  <input
                    type="number"
                    value={it.quantity}
                    onChange={(e) =>
                      updateCartQuantity(
                        it.product._id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <Button
                    color="error"
                    onClick={async () => removeFromCart(it.product._id)}
                  >
                    Remove
                  </Button>
                </ListItem>
              </Box>
            );
          })}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography component="h6">
            {`Total Price $${cart.items.reduce((sum, cur) => {
              return sum + cur.product.price * cur.quantity;
            }, 0)}`}
          </Typography>
          <Link to="/checkout">
            <Button variant="contained">Proceed to Checkout</Button>
          </Link>
        </Box>
      </Box>
    );
  }
}
