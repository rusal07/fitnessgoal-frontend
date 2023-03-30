import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoggedHeader from '../LoggedHeader/LoggedHeader';
import Header from '../Header/Header';
import BmiCalc from '../BmiCalc/BmiCalc';
import Error404 from '../Error404/Error404';

const Home = () => {
   const [authenticated, setauthenticated] = useState(null);
   const [authenticatedUser, setauthenticatedUser] = useState(null);
   const navigate = useNavigate();
   useEffect(() => {
    document.title = "Home";
    const loggedInUser = localStorage.getItem("authenticated");
    const loggedInUserValue = localStorage.getItem("authenticatedUser")
    if (loggedInUser) {
        setauthenticated(loggedInUser);
        setauthenticatedUser(JSON.parse(loggedInUserValue));
    }
}, []);
if (authenticated) {
    //IF the user is not authenticated. Show this.
    return (
        <>
        <LoggedHeader />
    <div>
    <h2> welcome to dashboard.</h2>
    <p>The BMI Calculator awaits you.</p>
    <BmiCalc data={authenticatedUser}/>
    </div>
    </>
    );
}
//If user is Authenticated, show this. 
else {
    return (
        <>
        <Header />
        <div>
        <h2>Hi there, We understand your patience.</h2>
        <p>Please Login to continue.</p>
        <button className='btn btn-dark' onClick={() => navigate('/login')}>Login</button>
        <Error404 />
        </div>
        </>
);
}
}

export default Home