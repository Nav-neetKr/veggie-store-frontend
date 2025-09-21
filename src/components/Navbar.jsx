import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";

export function Navbar() {
  const { token, logout, role } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" sx={{ flexGrow: 1 }}>
          Village Mandi
        </Typography>

        <Box>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <>
            {!token ? (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => logout()} color="inherit">
                  Logout
                </Button>
                <Button component={Link} to="/order-history" color="inherit">
                  Order History
                </Button>
              </>
            )}
            {role === "admin" ? (
              <>
                <Button
                  component={Link}
                  to="/admin/products/add"
                  color="inherit"
                >
                  Create New Product
                </Button>
              </>
            ) : (
              <></>
            )}
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
