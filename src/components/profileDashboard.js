import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "./Loader";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '../styles/UserProfile.css'; // Import the CSS file
import { getFullProfileRoute } from "../utils/APIRoutes";
import { addPhoneRoute } from "../utils/APIRoutes";
import { otpRoute } from "../utils/APIRoutes";
import { otpVerifyRoute } from "../utils/APIRoutes";

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


const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(getFullProfileRoute, {
          withCredentials: true
        });
        console.log(response.data.data.Items[0].data);
        setProfile(response.data.data.Items[0].data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSendOtp = async () => {
    if(phone!==null && phone!==undefined){
            const Newphone="+91"+phone
            const response=await axios.post(otpRoute,{
                phoneNumber:Newphone
            },{
                withCredentials:true
            });
            if(response.status===200){
                window.alert("OTP sent to mobile");
            }
            else if(response.status===400){
                window.alert("Server error");
            }
        }
  };

  const handleVerifyOtp = async () => {
    if(phone!==null && phone!==undefined){
        const Newphone="+91"+phone
        console.log(Newphone);
        const response=await axios.post(otpVerifyRoute,{
            phoneNumber:Newphone,
            otp:otp
        },{
            withCredentials:true
        });
        if(response.status===200){
            try{
                const response=await axios.put(addPhoneRoute,{
                    phone
                },{withCredentials:true});
                if(response.status===200){
                    setShowModal(false);
                    window.alert("Phone number added Successful");
                    window.location.reload();
                }
            }catch(err){
                console.log(err);
            }
        }
        else if(response.status===400){
            window.alert("Server error");
        }
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  if (!profile) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // const { profilePicture, firstName, lastName, userID, email, phone: profilePhone, oauthUser } = profile;

  return (
    
    <div className="card-container">

      {/* <div className="card text-center custom-card">
        <div className="card-left">
          <img src={profilePicture} alt="Profile" className="card-img-left" />
        </div>
        <div className="card-right">
          <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
          <p className="card-text"><span className="card-label">User ID:</span> {userID}</p>
          <p className="card-text"><span className="card-label">Email:</span> {email}</p>
          <p className="card-text"><span className="card-label">Phone:</span> {profilePhone ? profilePhone : 'No phone number'}</p>
          { !profilePhone &&(
            <Button variant="primary" onClick={handleModalShow}>
              Verify Mobile Number
            </Button>
          )}
        </div>
      </div> */}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Mobile Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleSendOtp}>
              Send OTP
            </Button>
            <Form.Group controlId="formOtp" className="mt-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Form.Group>
            <Button variant="success" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {profile.phone}{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {profile.deliveryAddress}{" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>User ID:</strong> {profile.userID}
            </Typography>
            {!profile.phone && (
                <Button variant="primary" onClick={handleModalShow} className="mt-3">
                  Verify Mobile Number
                </Button>
              )}
          </Box>
        </Box>  
      </Paper>
    </ThemeProvider>
    </div>
  );
};

export default UserProfile;
