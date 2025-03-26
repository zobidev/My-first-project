import { Box, Button, Typography } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", m: 0, p: 5, backgroundColor: "#eee" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          fontWeight: 600,
          color: "#676767",
        }}
      >
        <Box sx={{ display: "flex", gap: 5 }}>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
        </Box>
        <Box>
          <Button
            variant="contained"
            disableElevation
            sx={{
              color: "#676767",
              backgroundColor: "#fff",
              width: { xs: 150, md: 200, lg: 250 },
              fontWeight: 600,
              fontSize: { xs: 8, md: 10, lg: 14 },
              py: 2,
            }}
            onClick={() => navigate("/form")}
          >
            Add New Product
          </Button>
        </Box>
      </Box>
      {/* Copyright */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="#676767">
          © {new Date().getFullYear()} Zohaib Online Store. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
