import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "./Loader";
import NavECommerce from "./NavE-Commerce"
import SellerOrders from "./GetSellerOrders";
import SellerProducts from "./SellerProducts";
import { getFullProfileRoute } from "../utils/APIRoutes";
import { addAddressRoute } from "../utils/APIRoutes";
import { becomeSellerRoute } from "../utils/APIRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    subtitle1: {
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1.2rem",
      lineHeight: 1.6,
    },
    strong: {
      fontWeight: "bold",
    },
  },
});

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [openModalPhone, setOpenModalPhone] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [error, setError] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          getFullProfileRoute,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data.data.Items[0].data);
        setProfile(response.data.data.Items[0].data);
      } catch (error) {
        setError(error);
        console.error("Error fetching the profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const changeAddress = async (newAddress) => {
    try {
      const response = await axios.put(
        addAddressRoute,
        { newAddress },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("Address added successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error adding address");
    }
  };

  const becomeSeller = async () => {
    try {
      const response = await axios.get(
        becomeSellerRoute,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("You are successfully a seller now..");
        <window className="location reload"></window>;
      }
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleEditEmail = () => {
    setOpenModalEmail(true);
  };

  const handleEditPhone = () => {
    setOpenModalPhone(true);
  };

  const handleEditAddress = () => {
    setOpenModalAddress(true);
  };

  const handleCloseModalEmail = () => {
    setOpenModalEmail(false);
  };

  const handleCloseModalPhone = () => {
    setOpenModalPhone(false);
  };

  const handleCloseModalAddress = () => {
    setOpenModalAddress(false);
  };

  const handleSaveChangesEmail = () => {
    console.log("Saving email changes:", editedProfile.email);
    // Implement the logic to save email changes
    setOpenModalEmail(false);
  };

  const handleSaveChangesPhone = () => {
    console.log("Saving phone changes:", editedProfile.phone);
    // Implement the logic to save phone changes
    setOpenModalPhone(false);
  };

  const handleSaveChangesAddress = () => {
    console.log("Saving address changes:", editedProfile.address);
    // Implement the logic to save address changes
    setOpenModalAddress(false);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (!profile) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
    <NavECommerce/>
    <ThemeProvider theme={theme}>
      <Paper
        elevation={10}
        sx={{
          padding: "30px",
          margin: "20px auto",
          maxWidth: 600,
          backgroundColor: "#f5f5f5",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={profile.profilePicture}
            alt={profile.firstName}
            sx={{
              width: 150,
              height: 150,
              border: "5px solid #3f51b5",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              marginBottom: 3,
            }}
          />
          <Typography variant="h4" color="primary" gutterBottom>
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="subtitle1" color="secondary" gutterBottom>
            {profile.gender}
          </Typography>
          <Box mt={3} width="100%" textAlign="left">
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {profile.email}{" "}
              <Button onClick={handleEditEmail}>Edit</Button>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {profile.phone}{" "}
              <Button onClick={handleEditPhone}>Edit</Button>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {profile.deliveryAddress}{" "}
              <Button onClick={handleEditAddress}>Edit</Button>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>User ID:</strong> {profile.userID}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Role:</strong>{" "}
              {profile.isSeller ? "Seller And Customer" : "Customer"}
            </Typography>
          </Box>
        </Box>
        {!profile.isSeller ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              becomeSeller();
            }}
          >
            Become a seller
          </button>
        ) : (
          ""
        )}
      </Paper>

      <Modal
        open={openModalEmail}
        onClose={handleCloseModalEmail}
        aria-labelledby="edit-email-modal"
        aria-describedby="edit-email-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Email
          </Typography>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={editedProfile.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSaveChangesEmail}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openModalPhone}
        onClose={handleCloseModalPhone}
        aria-labelledby="edit-phone-modal"
        aria-describedby="edit-phone-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Phone
          </Typography>
          <TextField
            name="phone"
            label="Phone"
            variant="outlined"
            value={editedProfile.phone}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSaveChangesPhone}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openModalAddress}
        onClose={handleCloseModalAddress}
        aria-labelledby="edit-address-modal"
        aria-describedby="edit-address-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Address
          </Typography>
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            value={editedProfile.address}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSaveChangesAddress}
            fullWidth
            onClickCapture={() => {
              changeAddress(editedProfile.address);
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      <div className="mt-5 mb-5">
        {profile.isSeller === true ? (
          <div className="mt-5 mb-5">
            <SellerOrders />
          </div>
        ) : (
          ""
        )}
      </div>
      {profile.isSeller === true ? (
        <div className="mt-5 mb-5">
          <SellerProducts />
        </div>
      ) : (
        ""
      )}
    </ThemeProvider>
    </>
  );
};

export default Profile;
