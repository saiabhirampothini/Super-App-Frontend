// import { Navigate, useNavigate } from "react-router-dom";
// const UnprotectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   if (localStorage.getItem("profile")) {
//     return <Navigate to="/dashBoard" replace />;
//   } else {
//     return children;
//   }
// };
// export default UnprotectedRoute;


import { Navigate, useNavigate } from "react-router-dom";
const UnprotectedRoute = ({ children }) => {
  return children;
};
export default UnprotectedRoute;
