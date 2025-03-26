import { Box, Button, Card, CardMedia, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [data, setData] = useState([]);
  const navigater = useNavigate();

  const updatedForm = (id) => {
    navigater(`/update/${id}`);
  };

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "70%",
        }}
      >
        <Box sx={{ my: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            All Product
          </Typography>
        </Box>
      </Box>
      <Grid2
        container
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "70%",
        }}
      >
        {data.map((items, i) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 12 / 3 }} key={i}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
                padding: 1.5,
                position: "relative",
                height: "100%",
              }}
            >
              <CardMedia
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
                image={items.imgurl}
                alt="Product Image"
              />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {items.category}
              </Typography>
              <Typography variant="body2" sx={{ width: 250, color: "#676767" }}>
                {items.description}
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600, mt: "auto" }}>
                $ {items.price}
              </Typography>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  color: "#000",
                  backgroundColor: "#eee",
                  fontWeight: 600,
                  border: "none",
                }}
                onClick={() => updatedForm(items.id)}
              >
                Update
              </Button>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Sidebar;
