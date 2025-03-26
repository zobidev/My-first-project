import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { data, Link, useNavigate } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userStore from "../zustand";

const validate = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const baseURL = import.meta.env.VITE_APIS_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = userStore();
  const navigates = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validate),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/login/`, data);
      setUser(response.data);
      // console.log("Updated Zustand State:", userStore.getState().user);
      navigates("/");
      toast.success("Successfully Login");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid email or password");
      setError(
        error.response?.data?.message || "Error ! Check your email and password"
      );
    }
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "50%",
          backgroundImage: "url(/store.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "50%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ mt: 5, fontWeight: 600 }}>
          Login
        </Typography>
        <Typography variant="body2">
          Welcome User, Please login to continue
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.7,
            width: "100%",
            maxWidth: "70%",
          }}
        >
          <InputLabel
            htmlFor="email"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
            }}
          >
            Enter your Email
          </InputLabel>
          <TextField
            id="Email"
            type="email"
            variant="outlined"
            placeholder="Email"
            {...register("email")}
            error={!!errors.email}
            autoComplete="current-email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ fontWeight: 600, fontSize: 20 }}
          />
          {errors.email && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.email.message}
            </Typography>
          )}
          {error && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {error}
            </Typography>
          )}
          <InputLabel
            htmlFor="password"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 3,
            }}
          >
            Enter your Password
          </InputLabel>
          <TextField
            id="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="Password"
            {...register("password")}
            error={!!errors.password}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.password.message}
            </Typography>
          )}
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Rember me" />
            <Link to="">Forgot Password</Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1.5, my: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Divider>or</Divider>
        </Box>
        <Typography
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          Don't have an account?
          <Link
            to="/signup"
            style={{
              fontWeight: 600,
              borderBottom: "2px solid",
              color: "darkblue",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
