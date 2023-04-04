
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import "./Contactform.css";
import contactusimg from './img/contactus.gif'
import Header from '../Header/Header';
export const Contactform = () => {
  useEffect(()=>{
    document.title = "Contact"
  },[])

  const templateData = {
    name: "",
    email: "",
    subject: "",
    message: ""
  }
  const [formData, setFormData] = useState(templateData);

     const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
      const send = () => {
        window.Email.smtpjs
          .send({
            SecureToken: "9360d3bd-8a0c-4041-8891-00d2b97e0297", //smtpjs dot com
            To: "officialph03n1xw0lf@gmail.com", //which email to send?
            From: "rusaltamang07@gmail.com",  //By which email?
            Subject: `Email: ${formData.email}`,
            Body: `Subject: ${formData.subject} & 
            Message: ${formData.message}`})
          .then((message) => console.log("Thankyou for contacting us."));
      };
      const afterSubmission = (e) =>{
        e.preventDefault();
          send();
          toast.success('Thankyou for contacting us!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setFormData(  {  name: "",
                          email: "",
                          subject: "",
                            message: ""
                    }
                    );
      }

  return (
    <>
    <Header />
    <div>
                <img src={contactusimg} alt="ContactUS Logo" height={400} width={400}></img>
									<h5 style={{marginBottom: "0px"}}>CONTACT US:</h5>
									<form onSubmit={ (e) => afterSubmission(e)} id="contactForm" name="contactForm" className="contactForm">
                      <div className="form-body">
							
												  <div className="form-group" style={{marginTop:"20px"}}>
													  <input type="text" className="form-control" name="name" id="name" placeholder="Name" required value={formData.name} onChange={(e) => handleChange(e)}/>
											    </div>
												  <div className="form-group" style={{marginTop:"20px"}}>
													  <input type="email" className="form-control" name="email" id="email" placeholder="Email" required value={formData.email} onChange={(e) => handleChange(e)}/> 									
										  	  </div>											
												  <div className="form-group" style={{marginTop:"20px"}}>
												  	<input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required value={formData.subject} onChange={(e) => handleChange(e)} />
										    	</div>
											
												  <div className="form-group" style={{marginTop:"20px"}}>
													  <textarea name="message" className="form-control" minLength={20} maxLength={180} id="message"  placeholder="Message" required={true} value={formData.message} onChange={(e) => handleChange(e)}></textarea>
												  </div>
											<div className="col-md-12">
												<div className="form-group" style={{marginTop:"20px"}}>
													<input type="submit" value="Send Message" className="btn btn-dark btn-lg btn-block" id="button"/>
											</div>
                      </div>
										</div>
                    </form>
                    </div>
</>
  )
}
