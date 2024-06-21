import "../styles/home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-App">
      <div className="home-container">
        <h1 className="home-title">Super App</h1>
        <p className="home-subtitle">Your one-stop solution for everything</p>
        <div className="home-button-container">
          <button className="home-button">
            <Link className="nav-link" to="/login">
              LOGIN
            </Link>
          </button>
          <button className="home-button">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
