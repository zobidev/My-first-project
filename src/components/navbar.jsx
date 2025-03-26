import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import userStore from "../zustand";

const settings = [{ profile: "Profile", logout: "Logout" }];

function Navbar() {
  const [users, setUsers] = useState(null);
  const { user, removeUser } = userStore();
  const navigate = useNavigate();

  const myedit = JSON.parse(localStorage.getItem("editData"));

  const logout = () => {
    removeUser();
    navigate("/login");
    localStorage.clear();
  };

  const goToProfile = () => {
    // window.location.href = "/profile";
    navigate("/profile");
  };

  const handleOpenUserMenu = (event) => {
    setUsers(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUsers(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "90%",
          position: "relative",
          border: "2px solid #eee",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 20,
          py: 0.5,
          // position: "fixed",
          // top: 10,
          // zIndex: "200",
          // backgroundColor: "#fff",
        }}
      >
        <Box>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar
              alt="logo"
              src="/Logo.png"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: "16%",
                height: "4%",
                borderRadius: 20,
                px: 0,
              }}
            />
            <Avatar
              alt="logo"
              src="/Logo.png"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: "20%",
                height: "2%",
                borderRadius: 20,
                px: 0,
              }}
            />
            {user ? (
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 0,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontStyle: "italic",
                  }}
                >
                  {user.first_name} {user.last_name}
                </Typography>
                <Tooltip title="Open">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="pic"
                      src={myedit ? myedit.profile : ""}
                      sx={{ width: 50, height: 50 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={users}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(users)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((value, i) => (
                    <Box
                      key={i}
                      onClick={handleCloseUserMenu}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        px: 3,
                        "&:hover": {
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                        onClick={goToProfile}
                      >
                        {value.profile}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                        onClick={logout}
                      >
                        {value.logout}
                      </Typography>
                    </Box>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2, width: "20%" }}>
                <Button
                  sx={{
                    backgroundColor: "#eee",
                    color: "#000",
                    fontWeight: 600,
                    width: "50%",
                    py: 1.2,
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#eee",
                    color: "#000",
                    fontWeight: 600,
                    width: "50%",
                    py: 1.2,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Box>
      </Box>
    </Box>
  );
}
export default Navbar;
