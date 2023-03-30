import React, {useState, useEffect} from 'react'
import LoggedHeader from '../LoggedHeader/LoggedHeader'
import bloodimage from "./img/blood-img.gif"
import clickhere from "./img/clickhere.png"
import "./Bloodmate.css";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import listofpeople from "./img/list-of-people.png"
import axios from 'axios';



const Bloodmate = () => {
    const [authenticated, setauthenticated] = useState(null);
    const [bloodmateData, setBloodmateData] = useState({})
    const [matchedBloodGroup, setMatchedBloodGroup] = useState([]);
    const navigate = useNavigate();

    const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"))
    const loggedInUser = localStorage.getItem("authenticated");
    useEffect(() => {
     document.title = "Blood Mate";
     const loggedInUser = localStorage.getItem("authenticated");
     if (loggedInUser) {
         setauthenticated(loggedInUser);
         axios.get(`http://localhost:8000/api/bloodmates/${authenticatedUser.id}`)
         .then(response=>{
            setBloodmateData(response.data)
         })
     }else{
         setauthenticated(false)
     }
 }, []);
 const [showList, setShowList] = useState(false);

 const showTheList = () => {
     let matchedData = bloodmateData.filter(element =>{
         if(authenticatedUser.blood_group === element.blood_group){
             return element
         }
     })
    setShowList(true)
    setMatchedBloodGroup(matchedData)

 }
if (!authenticated || authenticated == null) {
    //IF the user is not authenticated. Navigate Index.
    return (
        <>
        <Header />
        <div>
        <h2>Hi there, We understand your patience.</h2>
        <p>Only logged in user can view this Dashboard.</p>
        <p>Please Login to continue.</p>
        <button className='btn btn-dark'  onClick={() => navigate('/login')}>Login</button>
        </div>
        </>
    );
}
//If user is Authenticated, show this. 
else {
    return (
        <>
        <LoggedHeader />
        <h3 style={{marginTop: "20px"}}>Welcome to Blood Mate.</h3>
        <img src={bloodimage} alt="Bloodmate Header" height="300px" width="350px"></img>
        <h5>Did you Know?</h5>
        <p><em>Millions of people around the world gets in trouble due to unavailability of blood at the right time.</em></p>
        <p><em>This is our little effort to fill the Gap between the people with same blood group.</em></p>
        <img style={{marginTop: "20px"}} className="clickhere" src={clickhere} height="80px" width="120px" onClick={showTheList} />
        <div style={{minHeight: "300px"}}>
        <div className={(showList)?"bloodlist-main":"hidebloodlist"}>
        <div>
            <img src={listofpeople} height="200px" width="200px"/>
        </div>
        <div className='Bloodmate-List'>
        {
           matchedBloodGroup.map((element,index )=>{
               if (element.blood_group === authenticatedUser.blood_group){
               return (
                   <div  key={index}>
                   <div className="card blood-card"  style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">Name :<span style={{margin: "0px 5px"}}>{element.name}</span> </h5>
                    <p className="card-text">Here, {element.name} seems to have the same blood group as you have which is</p> <h6 style={{color: "green", textTransform:"uppercase"}}>{element.blood_group}.</h6>
                    <p>Please, Email them to know more about: </p>
                    <h6>Email:<a href={"mailto:"+element.email} className="card-link">{' '+element.email}</a></h6>
                    </div>
                    </div>
                     </div>
               )
               }
           })
        }
        </div>
        </div>
        </div>
    </>
);
}
}

export default Bloodmate


