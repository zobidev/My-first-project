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
import { Link } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const defaultData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const baseURL = import.meta.env.VITE_APIS_BASE_URL;
  const [signupData, setSignupData] = useState(defaultData);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigater = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigater("/");
    }
  });

  const validateForm = () => {
    let newErrors = {};
    if (!signupData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!signupData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setValidate(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const SubmitForm = async () => {
    if (validateForm()) {
      try {
        const res = await axios.post(`${baseURL}/api/auth/register/`, {
          email: signupData?.email,
          password: signupData?.password,
          first_name: signupData?.first_name,
          last_name: signupData?.last_name,
        });
        navigater("/login");
        toast.success("Successfully Sign Up");
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          if (error.response.data.email) {
            setError(error.response.data.email[0]);
            toast.error("Email already exist.");
          }
        }
      }
    } else {
      toast.error("Please ! Fill Sign Up page");
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "45%",
          backgroundImage: "url(/signup.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ mt: 5, fontWeight: 600 }}>
          Sign Up
        </Typography>
        <Typography variant="body2">
          Welcome User, Please sign up to continue
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.6,
            width: "100%",
            maxWidth: "70%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* First Name */}
            <Box sx={{ width: "100%" }}>
              <InputLabel
                htmlFor="firstname"
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  paddingBottom: 1,
                }}
              >
                First Name
              </InputLabel>
              <TextField
                fullWidth
                id="FirstName"
                type="text"
                variant="outlined"
                placeholder="First Name"
                name="first_name"
                error={!!validate.first_name}
                value={signupData?.first_name}
                onChange={handleSignup}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />
              {validate?.first_name && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "error.main",
                    mt: 1,
                  }}
                >
                  {validate?.first_name}
                </Typography>
              )}
            </Box>
            {/* Last Name */}
            <Box sx={{ width: "100%" }}>
              <InputLabel
                htmlFor="lastname"
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  paddingBottom: 1,
                }}
              >
                Last Name
              </InputLabel>
              <TextField
                fullWidth
                id="LastName"
                type="text"
                variant="outlined"
                placeholder="Last Name"
                name="last_name"
                error={!!validate.last_name}
                value={signupData?.last_name}
                onChange={handleSignup}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />
              {validate?.last_name && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "error.main",
                    mt: 1,
                  }}
                >
                  {validate?.last_name}
                </Typography>
              )}
            </Box>
          </Box>
          {/* Email */}
          <InputLabel
            htmlFor="Email"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter your Email
          </InputLabel>
          <TextField
            id="Email"
            type="email"
            variant="outlined"
            placeholder="Email"
            name="email"
            error={!!validate.email}
            value={signupData?.email}
            onChange={handleSignup}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            required
          />
          {validate?.email && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "error.main",
                mt: 1,
              }}
            >
              {validate?.email}
            </Typography>
          )}
          {error && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {error}
            </Typography>
          )}
          {/* Password */}
          <InputLabel
            htmlFor="passwordhy"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter your Password
          </InputLabel>
          <TextField
            id="Passwordhy"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="Password"
            name="password"
            error={!!validate.password}
            value={signupData.password}
            onChange={handleSignup}
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
            required
          />
          {validate?.password && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "error.main",
                mt: 1,
              }}
            >
              {validate?.password}
            </Typography>
          )}
          {/* Confirm Password */}
          <InputLabel
            htmlFor="password"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter Confirm Password
          </InputLabel>
          <TextField
            id="Confirm Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="Confirm Password"
            name="confirmPassword"
            error={!!validate.confirmPassword}
            value={signupData?.confirmPassword}
            onChange={handleSignup}
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
            required
          />
          {validate?.confirmPassword && (
            <Typography
              variant="caption"
              gutterBottom
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "error.main",
                mt: 1,
              }}
            >
              {validate?.confirmPassword}
            </Typography>
          )}
          {/* Submit button */}
          <Button
            variant="contained"
            sx={{ py: 1.5, my: 2 }}
            onClick={SubmitForm}
          >
            Sign Up
          </Button>
          <Divider>or</Divider>
        </Box>
        <Typography
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          You have an account?
          <Link
            to="/login"
            style={{
              fontWeight: 600,
              borderBottom: "2px solid",
              color: "darkblue",
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
