import React, {useEffect} from 'react'
import dontworryimg from './img/dontworry.png'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
function Home() {
  useEffect(()=>{
    document.title = "FitnessGoal"
  },[])
  return (
    <>
    <Header />
 
    <div>
         <main style={{display: "flex",  alignItems:"center", flexDirection: "column", width: "100%"}}>
                {/* <div>
                <img className="img-files" src="./assets/images/welcomeValid.gif" height="200px" width="200px" alt="Welcome to Junk Organizer" />
                </div> */}
                <div className="text-container" style={{width: "75%", marginTop: "20px"}}>
                <h2>What is Fitness goal?</h2>
                <h6> Fitness goal is a platform which helps people to measure their BMI records and set a goal for certain periods of time and a blood mate finder.</h6>
                    <em><p>What do we do?</p></em>
                    <ul>
                      <li>Helps you to obtain the good health and keeps you fit.</li>
                    <li>Helps you calculate your BMI.</li>
                   <li>Helps you set a goal of a fitness for within some span of times.</li> 
                    <li>A BloodMate features where you can see other people with same blood group in the platform.</li>
                    </ul>
                <p>The BMI of every people depens upon ther different index of Body and varies from people to people.</p>
                <h4><i>However,</i></h4>
                <h6><em>Sometimes, People can get confused irespective of their body measurements and get confused.</em></h6>
                <h6><em>But, why you fear when Fitness goal is here?</em></h6>
                    </div>
                    <img src={dontworryimg} alt="Don't worry" height="300px" width="300px" style={{marginTop: "-30px"}}/>
                    <div>
                        <h6 style={{marginTop: "-50px"}} >Login or Register Here.</h6>
                   <div>
                   <Link to="/login">
                        <button  style={{margin: "0px 10px"}} className="btn btn-primary">Login</button>
                        </Link>
                      <Link to="/register">
                        <button  style={{margin: "0px 10px"}} className="btn btn-primary">Register</button>
                        </Link>
                    </div>
                    </div> 
                    <h6>Your healthy routine is in the safe hands.</h6>       
            </main>
    </div>

    </>
  )
}

export default Home
