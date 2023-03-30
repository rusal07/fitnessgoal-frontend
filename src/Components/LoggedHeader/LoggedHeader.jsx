import React, {useState} from 'react'
import logo from "./img/brandlogo.png";
import "./Header.css";
import { useNavigate, Link } from 'react-router-dom';
const LoggedHeader = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem("authenticatedUser"))
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
     const logout = () => {
            localStorage.removeItem("authenticated");
            localStorage.removeItem("authenticatedUser");
            navigate('/');
        }
  
        const Bloodmate = () => {
          navigate('/bloodmate')
        }
    return (
<div className="Header">
<nav className="navbar navbar-expand-lg" >
  <a style={{marginLeft: "10px"}} className="navbar-brand text-info " href="/">
	<img src={logo} alt="Logo" width="50" height="45" className="vertical-align-middle" />
  </a>
  <div className="nav-center">
  <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
	<span className="navbar-toggler-icon"></span>
  </button>

  <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
  <Link to="/home">
	<button style={{color: "whitesmoke"}} className="btn btn-outline-secondary">HOME</button>
  </Link>
	<button className="btn btn-outline-secondary" style={{color: "whitesmoke", margin: "0px 15px"}} onClick={Bloodmate} >BLOODMATE</button>
  </div>
  </div>
  <div style={{color: "whitesmoke", position: "absolute", right:50}}>
  <span style={{margin: "0px 10px", fontSize: "medium", color: "#309c36"}}>Hello, {(userName.name).toUpperCase()}</span>
  <button className="btn btn-outline-secondary" style={{color: "whitesmoke"}}onClick={logout} >LOGOUT</button>
  </div>
</nav>
</div>
    );
  }

export default LoggedHeader
