import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import registerimg from './img/registerimg.gif'
import Header from '../Header/Header';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();
    useEffect(()=>{
      document.title = "Register FitnessGoal"
    },[])
    const templateData = {
        name: "",
        email: "",
        password: "",
        verify_password: "",
        blood_group: ""
      }
      const [formData, setFormData] = useState(templateData);
      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const handlePost = (e) => {
        //The below commands helps to prevent from auto refreshing.
        e.preventDefault();
        let isNull= ((formData.name === ''|| formData.email === '' || formData.password === '' || formData.verify_password === '' || formData.blood_group === '' ));
        if(isNull){
        toast.warning('Please fill the Data completely.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        }
        let passwordUnMatched = (formData.password !== formData.verify_password);
        if (passwordUnMatched){
            toast.warning('Your password and verify password didn\'t match.', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        //Sent the below data to server.
        if (!isNull && !passwordUnMatched){
        const userinfo = {
          name : formData.name,
          email : formData.email.toLocaleLowerCase(),
          password : formData.password,
          verify_password : formData.verify_password,
          is_active : true,
          blood_group: formData.blood_group
        }
        axios.post("https://fitnessgoal.ngrok.io/api/registeraccount", userinfo)
        .then(response=>{
          toast.success('User registered successfully.', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/login")
        }).catch(err=>{
          toast.warning('Unable to register. Please try again later.', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })

    }
        
      }
      const bloodName = [ 
        "A positive (A+)",
        "A negative (A-)",
        "B positive (B+)",
        "B negative (B-)",
        "O positive (O+)",
        "O negative (O-)",
        "AB positive (AB+)",
        "AB negative (AB-)"
      ]
      const listOfBloodGroup = [{
        "value": "apositive"
        },
        {
        "value" : "anegative"
        },
        {
        "value" : "bpositive"
        },        
        {"value" : "bnegative"
        },
        {
        "value" : "opositive" 
        },{
        "value" : "onegative" 
        },
        {
        "value" : "abpositive"
        },{
        "value": "abnegative"  
        }   
      ]

  return (
    <>
    <Header />
    <div>
                    <section className="vh-100">
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                          <div className="card" style={{borderRadius: "1rem"}}>
                            <div className="row g-0">
                              <div className="col-md-6 col-lg-5 d-none d-md-block">
                              <img src={registerimg} alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem, margin-top: 100px", marginTop: "120px"}} />
                              </div>
                              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                  
                                  <form onSubmit={(e) => handlePost(e)}>
                  
                                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Register a new account</h5>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="name" className="form-control form-control-lg" name="name" value={formData.name} onChange={(e) => handleChange(e)} required/>
                                        <label className="form-label" htmlFor="name">Name</label>
                                      </div>
                                   
                                    <div className="form-outline mb-4">
                                      <input type="email" id="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={(e) => handleChange(e)} required/>
                                      <label className="form-label" htmlFor="email">Email address</label>
                                    </div>
                  
                                    <div className="form-outline mb-4">
                                      <input type="password" id="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={(e) => handleChange(e)} required/>
                                      <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="verify_password" className="form-control form-control-lg" name="verify_password" value={formData.verify_password} onChange={(e) => handleChange(e)} required />
                                        <label className="form-label" htmlFor="verify_password">Verify Password</label>
                                      </div>
                                      <label htmlFor="sel1" className="form-label">Blood Group (select one):</label>
                                        <select className="form-select" name="blood_group" onChange={(e) => handleChange(e)}>
                                        {        
                                            listOfBloodGroup.map((element,index)=> {
                                                return <option key={index} value={element.value}>{bloodName[index]}</option>
                                            })
                                        }
                                        </select>
   
                  
                                    <div className="pt-1 mb-4" style={{marginTop: "10px"}}>
                                    <input type="submit" value="Register" className="btn btn-dark btn-lg btn-block" id="button"/>

                                    </div>
                
                                    <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Already have an account? <Link to="/login"
                                        style={{color: "#393f81"}}>Login here</Link></p>
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
    </>
  )
}

export default Register



// if (formData.password != formData.verify_password){
//     alert("Your password and verify_password didn't match.");
//   }else if( password.length < 4 || verify_password.length < 4){
//     alert("Your password length is too small.");
//   }
//   else


// fetch.post('http://localhost:8000/api/post', userinfo)
// .then((response) => {
//   toast.success('You are successfully Registered.', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       });
//     setFormData(  {   name: "",
//                       email: "",
//                       password: "",
//                       verify_password: "",
//                       blood_group: ""
//                    }
//               );
// }, (error) => {
//   toast.error('There is an error during registration.', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       });
// });
