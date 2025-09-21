import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@mui/material";

export function AdminProductList() {
  const [vegetables, setVegetables] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (productId) => {
    if (window.confirm("Do you want to remove the product?")) {
      try {
        await axios.delete(`/api/vegetables/${productId}`);
        setVegetables((vegetables) =>
          vegetables.filter((it) => it._id != productId)
        );

        alert("Product deleted successfully!");
      } catch (err) {
        console.log("Failed to delete the vegetable", err);
        alert("Failed to delete the product!");
        throw err;
      }
    }
  };

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const response = await axios.get("/api/vegetables");
        setVegetables(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch vegetable list!");
        throw err;
      }
    };
    fetchVegetables();
  }, []);

  if (loading) {
    return <p>Loading your vegetables...</p>;
  }

  if (!vegetables) {
    return <p>No vegetable in the list!</p>;
  }

  return (
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
        {vegetables.map((it) => (
          <TableRow key={it._id}>
            <TableCell>
              <img src={it.imageUrl} alt={it.name} width="50" />
            </TableCell>
            <TableCell>{it.name}</TableCell>
            <TableCell>${it.price.toFixed(2)}</TableCell>
            <TableCell>{it.stock}</TableCell>
            <TableCell align="right">
              <Button component={Link} to={`/admin/products/edit/${it._id}`}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDelete(it._id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
