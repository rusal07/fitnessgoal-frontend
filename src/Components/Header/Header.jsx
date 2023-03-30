import React, {useState} from 'react'
import logo from "./img/brandlogo.png";
import "./Header.css";
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
          <a className="btn btn-outline-secondary" href="/">HOME</a>
          <a href="/login" className="btn btn-outline-secondary" >LOGIN</a>
          <a href="/register" className="btn btn-outline-secondary" >REGISTER</a>
          <a href="/contact" className="btn btn-outline-secondary" >CONTACT</a>
        </div>
        </div>
      </nav>
      </div>
    );
  }

export default Header