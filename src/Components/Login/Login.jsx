import React, {useState, useEffect} from 'react'
import loginimg from './img/loginimg.gif'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

function Login() {
  useEffect(()=>{
    document.title = "Login FitnessGoal"
  },[])
  const navigate = useNavigate();
  const loginDatas = {
    email: "",
    password: ""
  }

  const [loginData, setLoginData] = useState(loginDatas);
  const handlelogdata = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };
  //Login Logic
   const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
   const [authenticatedUser, setauthenticatedUser] = useState(localStorage.getItem(localStorage.getItem("authenticatedUser")|| {}));
  //user data
  const [userData, setUserData] = useState({});
  //
  const loginNow = () => {
    axios.get(`https://fitnessgoalbackend.onrender.com/api/loginuser/${loginData.email.toLowerCase()}/${loginData.password}`)
    .then((response)=>{
        setUserData(response.data)
        const loginEmail = loginData.email.toLowerCase()
        if (response.data.email === loginEmail && response.data.password === loginData.password){
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            localStorage.setItem("authenticatedUser", JSON.stringify(response.data))
            navigate('/home');
    
        }
    }).catch((err)=>{
      toast.error('Sorry, Your email or password didn\'t match', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })

  }
  return (
    <>
         <Header />
    <div>
         <main>
                <div>
                <section>
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                          <div className="card" style={{borderRadius: "1rem"}}>
                            <div className="row g-0">
                              <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src={loginimg} alt="login form" height="200px" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem, margin-top: 100px", marginTop: "10px"}} />
                              </div>
                              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                  
                                  <form>
                  
                                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
                  
                                    <div className="form-outline mb-4">
                                      <input type="email" name="email" value={loginData.email} onChange={(e)=>handlelogdata(e)} className="form-control form-control-lg" />
                                      <label className="form-label" htmlFor="form2Example17">Email address</label>
                                    </div>
                  
                                    <div className="form-outline mb-4">
                                      <input type="password" name="password" value={loginData.password} onChange={(e)=>handlelogdata(e)}  className="form-control form-control-lg" />
                                      <label className="form-label" htmlFor="form2Example27">Password</label>
                                    </div>
                  
                                    <div className="pt-1 mb-4">
                                      <button className="btn btn-dark btn-lg btn-block" onClick={loginNow} type="button">Login</button>
                                    </div>
                  
                                    <a className="small text-muted" href="#!">Forgot password?</a>
                                    <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="/register" style={{color: "#393f81"}}>Register here</a></p>
                                    <a href="#!" className="small text-muted">Terms of use.</a>
                                    <a href="#!" className="small text-muted">Privacy policy</a>
                                  </form>
                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section> 
                </div>
              </main>
    </div>
    </>
  )
}

export default Login
