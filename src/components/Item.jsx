import Backdrop from "@mui/material/Backdrop";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Fade,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const Item = ({ items, getData }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const navigater = useNavigate();

  const updatedForm = (id) => {
    navigater(`/update/${id}`);
  };

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      getData();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Modal */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600, fontSize: 16 }}
            >
              Are you sure want to delete
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 5, mt: 4 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => deleteProduct(items.id)}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {/* Card and Card Data */}
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
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
        <IconButton
          className="delete"
          onClick={() => setOpen(true)}
          sx={{
            color: "error.main",
            position: "absolute",
            top: 7,
            right: 7,
            visibility: hover ? "visible" : "hidden",
            transition: "0.3s ease-in-out",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Card>
    </>
  );
};

export default Item;
