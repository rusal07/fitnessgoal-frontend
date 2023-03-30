import React, {useState} from 'react'
import logo from "./img/brandlogo.png";
import "./Header.css";
import { Link } from 'react-router-dom';
const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  
    return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg">
        <a style={{marginLeft: "10px"}} className="navbar-brand text-info " href="/">
          <img src={logo} alt="Logo" width="50" height="45" className="vertical-align-middle" />
        </a>
        <div className="nav-center">
        <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
        <Link to="/home">
          <button style={{color: "whitesmoke"}} className="btn btn-outline-secondary">Home</button>
          </Link>
          <Link to="/login">
          <button style={{color: "whitesmoke"}}  className="btn btn-outline-secondary">Login</button>
          </Link>
          <Link to="/register">
          <button style={{color: "whitesmoke"}}  className="btn btn-outline-secondary">Register</button>
          </Link>
          <Link to="/contact">
          <button style={{color: "whitesmoke"}}  className="btn btn-outline-secondary">Contact</button>
          </Link>
        </div>
        </div>
      </nav>
      </div>
    );
  }

export default Header
