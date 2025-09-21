import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Box, TextField } from "@mui/material";

export function EditProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    stock: 0,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getVegetable = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/vegetables/${id}`
        );
        const newVegetable = response.data;
        setFormData({
          name: newVegetable.name,
          price: newVegetable.price,
          category: newVegetable.category,
          stock: newVegetable.stock,
        });
      } catch (err) {
        console.log("Could not get the vegetable", err.message);
        alert("Problem in fetching vegetables");
      } finally {
        setLoading(false);
      }
    };
    getVegetable();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append("name", formData.name),
        dataToSubmit.append("price", formData.price),
        dataToSubmit.append("category", formData.category),
        dataToSubmit.append("stock", formData.stock);
      dataToSubmit.append("productImage", image);
      const response = await axios.put(
        `http://localhost:5000/api/vegetables/${id}`,
        dataToSubmit
      );
      navigate("/admin/products");
    } catch (err) {
      console.log("Some error occured ", err.message);
      alert("Could not add the product!");
    }
  };

  if (loading) {
    return <p>Loading Form....</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          margin="normal"
          type="text"
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <TextField
          margin="normal"
          fullWidth
          required
          type="Number"
          id="price"
          label="Price"
          name="price"
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: isNaN(parseInt(e.target.value, 10))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />

        <TextField
          margin="normal"
          fullWidth
          required
          type="text"
          name="category"
          label="Category"
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />

        <TextField
          margin="normal"
          required
          fullWidth
          type="Number"
          id="stock"
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />

        <Button component="label" variant="contained" fullWidth sx={{ mt: 2 }}>
          Update Image
          <input
            type="file"
            fullWidth
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
        <Button type="submit">Update Product</Button>
      </Box>
    </Container>
  );
}
