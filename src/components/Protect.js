// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {checkRoute} from "../utils/APIRoutes"
// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const checkFunction = async () => {
//     try {
//       const response = await axios.get(checkRoute, {
//         withCredentials: true,
//       });
//       console.log(response)
//       if (response.status === 200) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       if (err.response.status === 400) {
//         // console.log("error");
//         return navigate("/login");
//       }
//     }
//   };
//   let check = checkFunction();
//   if (check && children) return children;
//   return navigate("/login");
// };
// export default ProtectedRoute;


import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  return children;
};
export default ProtectedRoute;
