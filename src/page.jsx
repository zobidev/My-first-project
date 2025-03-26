import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router";
import Item from "./components/Item";
import Grid2 from "@mui/material/Grid2";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const HomePage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getProductData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: 5,
          paddingInline: { xs: 2, md: 6, lg: 10 },
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid #eee",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "24px", md: "40px", lg: "54px" },
          }}
        >
          My Online Store
        </Typography>
        <Button
          variant="contained"
          disableElevation
          sx={{
            color: "#000",
            backgroundColor: "#eee",
            width: { xs: 150, md: 200, lg: 250 },
            fontWeight: 600,
            fontSize: { xs: 8, md: 10, lg: 14 },
          }}
          onClick={() => navigate("/form")}
        >
          <ControlPointIcon
            sx={{
              marginRight: 1,
              fontSize: { xs: 14, md: 20, lg: 28 },
            }}
          />
          Add New Product
        </Button>
      </Box>
      <Grid2
        container
        spacing={2}
        sx={{
          padding: 4.5,
          paddingBlock: 5,
        }}
      >
        {data.map((item, i) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 12 / 5 }} key={i}>
            <Item items={item} getData={getProductData} />
          </Grid2>
        ))}
      </Grid2>
      <Footer />
    </>
  );
};

export default HomePage;
