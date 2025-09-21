import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log("User is trying to register with ", {
        userName: username,
        email,
        password,
      });

      const usrData = {
        userName: username,
        email: email,
        password: password,
      };
      console.log(usrData);

      const response = await axios.post("/api/users/register", usrData);
      console.log("User successfully registered:", response.data);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.log("Unable to register", err.response.data);
      alert(
        err.response.data.message || "Registration failed. Please try again!"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Use Name"
          name="username"
          type="username"
          autoComplete="current-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
