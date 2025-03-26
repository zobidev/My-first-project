import {
  Box,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router";
// import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navi = useNavigate();

  const onSubmit = (data) => {
    try {
      // const res = await axios.post("http://localhost:5000/Edit", data);
      localStorage.setItem("editData", JSON.stringify(data));
      navi("/profile");
      toast.success("Successfully Edit");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{ width: "100%", display: "flex" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        component="img"
        src="/edit.jpeg"
        alt="Example"
        sx={{
          width: "100%",
          maxWidth: "40%",
          height: "auto",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          width: "100%",
          maxWidth: "60%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h3" sx={{ mt: 3, fontWeight: 600 }}>
          Edit Profile
        </Typography>
        <Typography variant="body2">
          Welcome User, Edit profile to continue
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
            maxWidth: "50%",
          }}
        >
          <InputLabel
            htmlFor="cover"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
            }}
          >
            Enter Cover Photo
          </InputLabel>
          <TextField
            id="cover"
            type="url"
            variant="outlined"
            placeholder="url"
            {...register("cover", {
              required: "URL is required",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?).*$/,
                message: "Enter a valid URL",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            sx={{ fontWeight: 600, fontSize: 20 }}
          />
          {errors.cover && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.cover.message}
            </Typography>
          )}
          <InputLabel
            htmlFor="profile"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter Profile Pic
          </InputLabel>
          <TextField
            id="profile"
            type="url"
            variant="outlined"
            placeholder="url"
            {...register("profile", {
              required: "URL is required",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?).*$/,
                message: "Enter a valid URL",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            sx={{ fontWeight: 600, fontSize: 20 }}
          />
          {errors.profile && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.profile.message}
            </Typography>
          )}
          <InputLabel
            htmlFor="location"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter Your Location
          </InputLabel>
          <TextField
            id="location"
            type="text"
            variant="outlined"
            placeholder="city123.etc"
            {...register("location", {
              required: "Location required",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            sx={{ fontWeight: 600, fontSize: 20 }}
          />
          {errors.location && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.location.message}
            </Typography>
          )}
          <InputLabel
            htmlFor="number"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter Your Number
          </InputLabel>
          <TextField
            id="number"
            type="text"
            variant="outlined"
            placeholder="+92 0000000000"
            {...register("number", {
              required: "Number required",
              pattern: {
                value: /^(\+92 |92|0)?3[0-9]{9}$/,
                message: "Enter a valid number",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            sx={{ fontWeight: 600, fontSize: 20 }}
          />
          {errors.number && (
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "error.main", mt: 1 }}
            >
              {errors.number.message}
            </Typography>
          )}
          <InputLabel
            htmlFor="email"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              paddingBottom: 1,
              mt: 2,
            }}
          >
            Enter Your Email
          </InputLabel>
          <TextField
            id="email"
            type="text"
            variant="outlined"
            placeholder="email@gmail.com"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
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
          <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 3 }}>
            <Button
              sx={{
                backgroundColor: "red",
                color: "#fff",
                fontWeight: 600,
                width: "50%",
                py: 1.2,
              }}
              onClick={() => navi("/profile")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "#fff",
                fontWeight: 600,
                width: "50%",
                py: 1.2,
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Edit;
