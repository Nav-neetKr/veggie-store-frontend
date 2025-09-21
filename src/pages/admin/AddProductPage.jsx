import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Box, TextField, Button } from "@mui/material";

export function AddProductPage() {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [stock, setStock] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("productImage", file);

      const response = await axios.post("/api/vegetables", formData);
      console.log(formData);
      navigate("/admin/products");
    } catch (err) {
      console.log("Could not send to server: ", err);
      alert("Could not send data to the server");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add Product Page
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
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          type="Number"
          id="price"
          label="Price"
          name="price"
          autoComplete="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          type="text"
          id="category"
          label="Category"
          name="category"
          autoComplete="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          type="Number"
          id="stock"
          label="Stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value, 10))}
        />

        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Button>
        {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Product
        </Button>
      </Box>
    </Container>
  );
}
