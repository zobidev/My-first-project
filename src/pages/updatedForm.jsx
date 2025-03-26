import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const defaultValues = {
  imgurl: "",
  category: "",
  description: "",
  price: "",
};

const UpdatedForm = () => {
  const [product, setProduct] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [previousProduct, setPreviousProduct] = useState({});
  const back = useNavigate();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`);
      setProduct(response.data);
      setPreviousProduct(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const validate = () => {
    let tempErrors = {};
    if (!product.imgurl) {
      tempErrors.imgurl = "Image URL is required";
    } else if (
      !/^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/.test(product.imgurl)
    ) {
      tempErrors.imgurl = "Enter a valid image URL";
    }

    if (!product.category || product.category === "select category") {
      tempErrors.category = "Category is required";
    }

    if (!product.description) {
      tempErrors.description = "Description is required";
    }

    if (!product.price) {
      tempErrors.price = "Price is required";
    } else if (isNaN(product.price) || Number(product.price) <= 0) {
      tempErrors.price = "Enter a valid price";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleinputdata = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const updateData = async () => {
    const productdata = JSON.stringify(product);
    if (productdata === previousProduct) {
      toast.error("Error ! No changing in product");
      return;
    }
    if (validate()) {
      try {
        await axios.put(`http://localhost:5000/product/${id}`, product);
        setProduct(defaultValues);
        back("/");
        toast.success("Successfully Updated");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Button
        sx={{
          color: "#000",
          backgroundColor: "#eee",
          width: 200,
          height: 40,
          fontWeight: 600,
          marginTop: 1,
          marginLeft: 5,
        }}
        onClick={() => back("/")}
      >
        Back To HomePage
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 5,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, marginBlock: 3 }}>
          Update Product Data
        </Typography>
        {/* Add product */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <InputLabel
            htmlFor="img-url"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
            }}
          >
            Enter Image Url
          </InputLabel>
          <TextField
            multiline
            id="img-url"
            label="Image url"
            variant="outlined"
            name="imgurl"
            value={product.imgurl}
            onChange={handleinputdata}
            sx={{ width: 500 }}
          />
          {errors.imgurl && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{ fontSize: 10, fontWeight: 600, color: "red", mt: 1 }}
            >
              {errors.imgurl}
            </Typography>
          )}

          {/* Select */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              marginTop: 2.5,
              color: "#676767",
            }}
          >
            Select Category
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="select-category">select category</InputLabel>
            <Select
              sx={{ width: 500 }}
              labelId="select-category"
              id="category"
              label="Select Category"
              name="category"
              value={product.category}
              onChange={handleinputdata}
            >
              <MenuItem value="Men's Clothes">Men's Clothes</MenuItem>
              <MenuItem value="Women's Clothes">Women's Clothes</MenuItem>
              <MenuItem value="Jewelery">Jewelery</MenuItem>
              <MenuItem value="Makeup">Makeup</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {errors.category && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{ fontSize: 10, fontWeight: 600, color: "red", mt: 1 }}
            >
              {errors.category}
            </Typography>
          )}

          {/* Desciption */}
          <InputLabel
            htmlFor="description"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              marginTop: 2.5,
            }}
          >
            Enter description
          </InputLabel>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            name="description"
            value={product.description}
            onChange={handleinputdata}
            sx={{ width: 500 }}
          />
          {errors.description && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{ fontSize: 10, fontWeight: 600, color: "red", mt: 1 }}
            >
              {errors.description}
            </Typography>
          )}
          {/* Price */}
          <InputLabel
            htmlFor="price"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              marginTop: 2.5,
            }}
          >
            Enter price
          </InputLabel>
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            name="price"
            value={product.price}
            onChange={handleinputdata}
            sx={{ width: 500 }}
          />
          {errors.price && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{ fontSize: 10, fontWeight: 600, color: "red", mt: 1 }}
            >
              {errors.price}
            </Typography>
          )}
        </Box>
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#eee",
            width: 500,
            height: 56,
            fontWeight: 600,
            marginTop: 3,
          }}
          onClick={updateData}
        >
          Updated
        </Button>
      </Box>
    </>
  );
};

export default UpdatedForm;
