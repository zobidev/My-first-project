import { Avatar, Box, Typography, Button } from "@mui/material";
// import { LocationOnIcon, PhoneIcon, EmailIcon } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router";
import userStore from "../zustand";

const myedit = JSON.parse(localStorage.getItem("editData"));

const Profile = () => {
  const { user } = userStore();
  const goEdit = useNavigate();

  return (
    <>
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
            position: "relative",
            border: "2px solid #eee",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src={myedit ? myedit.cover : "/nocover.jpg"}
            alt="Cover photo"
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
          />
          <Avatar
            src={myedit ? myedit.profile : ""}
            alt="Profile pic"
            sx={{
              width: 160,
              height: 160,
              position: "absolute",
              top: "20%",
              left: "8%",
              border: "5px solid #dbd9d9",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              py: 8,
              px: 5,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                color="initial"
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontStyle: "italic",
                }}
              >
                {user.first_name} {user.last_name}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 3,
                  backgroundColor: "#eee",
                  color: "#000",
                  fontSize: 16,
                  fontWeight: 600,
                  width: "70%",
                  py: 1.2,
                  textTransform: "capitalize",
                  borderRadius: 10,
                  border: "1px solid #676767",
                }}
                onClick={() => goEdit("/edit")}
              >
                Edit <EditIcon sx={{ fontSize: 20 }} />
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  fontWeight: 600,
                }}
              >
                <LocationOnIcon />
                {myedit ? myedit.location : "your city123.etc"}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  fontWeight: 600,
                }}
              >
                <PhoneIcon />
                {myedit ? myedit.number : "+92 000000000"}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  fontWeight: 600,
                }}
              >
                <EmailIcon />
                {myedit ? myedit.email : "your123@gmail.com"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Sidebar />
    </>
  );
};

export default Profile;
