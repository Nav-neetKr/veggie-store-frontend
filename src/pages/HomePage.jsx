import { useState, useEffect, Component } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function HomePage() {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token, addToCart, placeOrder } = useAuth();

  console.log(vegetables);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const response = await axios.get("/api/vegetables");
        setVegetables(response.data.data);
      } catch (error) {
        console.log("Failed to get veggies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVegetables();
  }, []);

  if (loading || !token) {
    return <p>Loading vegetables...</p>;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Our Fresh Vegetables
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vegetables.map((veg) => (
            <TableRow key={veg._id}>
              <TableCell>
                <img src={veg.imageUrl} alt={veg.name} width="50" />
              </TableCell>
              <TableCell>{veg.name}</TableCell>
              <TableCell>${veg.price.toFixed(2)}</TableCell>
              <TableCell>{veg.stock}</TableCell>
              <TableCell align="right">
                <Button onClick={() => addToCart(veg._id, 1)}>
                  Add to Cart
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button component={Link} to="/cart">
        Proceed to cart
      </Button>
    </Container>
  );
}

export default HomePage;
