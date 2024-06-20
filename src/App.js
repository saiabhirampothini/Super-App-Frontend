import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Home from "./components/Home";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Chat from "./components/Chat";
import PostProducts from "./components/PostProducts";
import ProductsDashboard from "./components/E-CommerceDashboard";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import ProductPage from "./components/productPage";
import RegisterPage from "./components/Register";
import UserProfile from "./components/profileDashboard";
import ProtectedRoute from "./components/Protect";
import UnprotectedRoute from "./components/Unprotected";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/dashBoard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <UnprotectedRoute>
                  <Home />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <UnprotectedRoute>
                  <RegisterPage />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnprotectedRoute>
                  <Login />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post-products"
              element={
                <ProtectedRoute>
                  <PostProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products-dashboard"
              element={
                <ProtectedRoute>
                  <ProductsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileDashboard"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
