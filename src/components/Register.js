import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IoPhoneLandscape } from 'react-icons/io5';
import { registerRoute } from "../utils/APIRoutes";
import { otpRoute } from "../utils/APIRoutes";
import { otpVerifyRoute } from "../utils/APIRoutes";
import { emailOtpRoute } from "../utils/APIRoutes";
import { emailOtpVerifyRoute } from "../utils/APIRoutes";

const Register = () => {
    const navigate = useNavigate();
    const [email,setEmail]=useState(null);
    const [phone,setPhone]=useState(null);
    const [Emailcode,setEmailCode]=useState(null);
    const [Phonecode,setPhoneCode]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmpassword,setConfirmPassword]=useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        userID: '',
        firstName: '',
        lastName: '',
        gender: '',
        password:'',
        email:'',
        phone:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleEmail=(e)=>{
        const {value}=e.target;
        setEmail(value);
      }

      const handlePhone=(e)=>{
        const {value}=e.target;
        setPhone(value);
      }

      const handleEmailcode=(e)=>{
        const {value}=e.target;
        setEmailCode(value);
      }

      const handlePhonecode=(e)=>{
        const {value}=e.target;
        setPhoneCode(value);
      }

      const handlepasswordChange=(e)=>{
        const {value}=e.target;
        setPassword(value);
      }

      const handleconfirmpasswordChange=(e)=>{
        const {value}=e.target;
        setConfirmPassword(value);
      }

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const toggleConfirmPasswordVisibility = () => {
          setShowConfirmPassword(!showConfirmPassword);
      };

      const getPhoneCode= async (e)=>{
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
      }

      const VeirfyPhoneCode= async (e)=>{
        if(phone!==null && phone!==undefined){
            const Newphone="+91"+phone
            console.log(Newphone);
            const response=await axios.post(otpVerifyRoute,{
                phoneNumber:Newphone,
                otp:Phonecode

            },{
                withCredentials:true
            });
            if(response.status===200){
                formData.phone=Newphone;
                window.alert("Successful");
                setSection(section+1);
            }
            else if(response.status===400){
                window.alert("Server error");
            }
        }
      }

      const getCodeEmail= async (e)=>{
        if(email!==null && email!==undefined){
            const response=await axios.post(emailOtpRoute,{
                email:email
            },{
                withCredentials:true
            })
            if(response.status===201){
                window.alert("Email sent for Verification");
            }
            else if(response.status===500){
                window.alert("Server Error !!!")
            }
        }
      }


      const VerifyEmail=async (e)=>{
        const response=await axios.post(emailOtpVerifyRoute,{
            email:email,
            token:Emailcode
        },
        {withCredentials:true}
      );
      if(response.status===200){
        formData.email=email;
        window.alert("Verified Sucessfully");
        setSection(section+1);
      }
      else if(response.status===500){
        window.alert("Server Error");
      }
    }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
        if(password!=null && confirmpassword!=null && password!==confirmpassword){
            window.alert("Passwords Do not match");
            
        }
        if(formData.email!=='' && formData.phone!==''){
          formData.password=password;
            const response=await axios.post(registerRoute,
              formData
            ,{
              withCredentials:true
            });
            console.log(response);
            if(response.status===200){
              Navigate('/dashboard');
            }
        }
        else if(formData.email==='' || formData.phone===''){
          window.alert("Please verify Email and Phone");
        }
        console.log(formData);
      };

  const [section, setSection] = useState(1);

  const nextSection = () => {
    setSection(section + 1);
  };

  const prevSection = () => {
    setSection(section - 1);
  };

  const handleSectionClick = (sectionNumber) => {
    setSection(sectionNumber);
  };

  return (
    <>
    <h1 className='register-heading mt-1'>Register on X</h1>
    <div className="register-container">
      <div className="register-sidebar">
        <ul>
          <li className={section === 1 ? 'active' : ''} onClick={() => handleSectionClick(1)}>User Info</li>
          <li className={section === 2 ? 'active' : ''} onClick={() => handleSectionClick(2)}>Email Verification</li>
          <li className={section === 3 ? 'active' : ''} onClick={() => handleSectionClick(3)}>Mobile Verification</li>
          <li className={section === 4 ? 'active' : ''} onClick={() => handleSectionClick(4)}>Password</li>
        </ul>
      </div>
      <div className="register-form">
        {section === 1 && (
          <div className="form-section">
            <h2>User ID, First Name, Last Name, and Gender</h2>
            <input className="register-input" type="text" name="userID" id="userID" value={formData.userID} onChange={handleChange} required placeholder='User ID'/>
            <input className="register-input" type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required placeholder='First name'/>
            <input className="register-input" type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required placeholder='Last name'/>
            <input className="register-input" type="text" name="gender" id="gender" value={formData.gender} onChange={handleChange} required placeholder='Gender'/>
            <button className="register-button"  onClick={nextSection}>Next</button>
          </div>
        )}
        {section === 2 && (
          <div className="form-section">
            <h2>Email Verification</h2>
            <input className="register-input" type="email" placeholder="Email" value={email} onChange={handleEmail}/>
            <button className='register-button' onClick={getCodeEmail}>Get Code</button>
            <input className="register-input" type="text" placeholder="Enter OTP" value={Emailcode} onChange={handleEmailcode}/>
            <button className='register-button'  onClick={VerifyEmail}>Verify</button>
          </div>
        )}
        {section === 3 && (
          <div className="form-section">
            <h2>Mobile Verification</h2>
            <input className="register-input" type="text" placeholder="Mobile Number" value={phone} onChange={handlePhone} />
            <button className='register-button'  onClick={getPhoneCode}>Get Code</button>
            <input className="register-input" type="text" placeholder="Enter OTP"  value={Phonecode} onChange={handlePhonecode}/>
            <button  className='register-button' onClick={VeirfyPhoneCode}>Verify</button>
          </div>
        )}
        {/* {section === 4 && (
          <div className="form-section">
            <h2>Password</h2>
            <input className="register-input" type="password" name='password' placeholder="Password" value={password} onChange={handlepasswordChange}/>
            <input className="register-input" type="password"  name='confirmpassword'  placeholder="Re-enter Password" value={confirmpassword} onChange={handleconfirmpasswordChange}/>
            <button  className='register-button' onClick={handleSubmit}>Submit</button>
          </div>
        )} */}
        {section === 4 && (
                        <div className="form-section">
                            <h2>Password</h2>
                            <div className="input-group">
                                <input
                                    className="register-input"
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlepasswordChange}
                                />
                                <div className="input-group-append" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>
                            <div className="input-group">
                                <input
                                    className="register-input"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmpassword'
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={handleconfirmpasswordChange}
                                />
                                <div className="input-group-append" onClick={toggleConfirmPasswordVisibility}>
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </div>
                            </div>
                            <button className='register-button' onClick={handleSubmit}>Register</button>
                        </div>
                    )}
      </div>
    </div>
    </>
  );
};

export default Register;
