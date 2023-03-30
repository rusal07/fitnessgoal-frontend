import './bmiStyle.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Modal from "react-modal"
import wecanhelp from "./img/we-can-help.png";
import { toast } from "react-toastify";
import axios from 'axios';

Modal.setAppElement("#root");
const MIN_TARGET_WEIGHT = 30;
const MAX_TARGET_WEIGHT = 200;


function BmiCalc(props) {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetWeight, setTargetWeight] = useState();
  const [saveError, setSaveError] = useState(null);
  const [targetTimeframe, setTargetTimeframe] = useState("30 days");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [category, setCategory] = useState("");
  const [unitSystem, setUnitSystem] = useState("imperial");
  const [userData, setUserData] = useState({});

  const calculateBMI = () => {
    let weightInKilograms;
    let heightInMeters;

    if (unitSystem === "imperial") {
      heightInMeters = (heightFeet * 12 + parseInt(heightInches)) * 0.0254;
      weightInKilograms = weight / 2.205;
    } else {
      weightInKilograms = weight
      heightInMeters = (heightFeet/100 );
    }

    // Calculate BMI
    const bmiValue = weightInKilograms / Math.pow(heightInMeters, 2);


    // Determine BMI category
    let bmiCategory;
    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiValue < 25) {
      bmiCategory = "Normal weight";
    } else if (bmiValue < 30) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }
    // Set state variables for BMI value and category
    setBMI(bmiValue.toFixed(2));
    setCategory(bmiCategory);
  };
  //Bmi TARGET 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSetGoalsClick = () => {
    openModal();
  };
  const handleTargetWeightChange = (event) => {
    setTargetWeight(Number(event.target.value));
    // const newTargetWeight = Number(event.target.value);
    // if (
    //   newTargetWeight < MIN_TARGET_WEIGHT ||
    //   newTargetWeight > MAX_TARGET_WEIGHT
    // ) {
    //   setSaveError(
    //     `Target weight must be between ${MIN_TARGET_WEIGHT} and ${MAX_TARGET_WEIGHT}`
    //   );
    // } else {
    //   setTargetWeight(newTargetWeight);
    //   setSaveError(null);
    // }
  };
  const [checkGoals, setCheckGoals] = useState(false);
  const [checkGoalsWeight, setCheckGoalsWeight] = useState(0);
  const [isAlreadySet, setisAlreadySet] = useState(false);
  const [targetedData, setTargetedData] = useState({})
  const [authenticated, setauthenticated] = useState(null);
  const authenticatedUser = props.data;
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/targetuser/${authenticatedUser.id}`)
    .then(function (response) {
      if(response.data === null){
        setisAlreadySet(false)
      }else{
        setisAlreadySet(true)
        setTargetedData(response.data)
      }
    }).catch(error => {
  });
  },[])


  // useEffect(()=>{

  // },[])
  const handleCheckGoalsClick = () => {     
          if (!isAlreadySet){
            toast.warning('Sorry, You haven\'t set any goals yet, Plase set the Goals.', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }else{
              setCheckGoals(true);
          }

  }
   const checkGoalsRecord = () => {
   let checkGoalsHere = parseInt(checkGoalsWeight)
   let myPrevData = targetedData.targetWeight
   let result = "";
   let message = "";
  
    if (myPrevData  > checkGoalsHere){
      result="Less"
      message = `Hello, Your targeted weight was ${myPrevData} and your current weight is ${checkGoalsHere}. It appears that you have lost more weight than your target weight`
    }else if(myPrevData  < checkGoalsHere){
      result="More"
      message = `Hello, Your targeted weight was ${myPrevData} and your current weight is ${checkGoalsHere}. It appears that you have gained more weight than your target weight`
    }else{
      result="Equal"
      message = `Hello, Your targeted weight was ${myPrevData} and your current weight is ${checkGoalsHere}. It appears that you have achieved you target weight`
    }
    toast.info(message, {
      position: "top-center",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    }

  const handleTargetTimeframeChange = (event) => {
    setTargetTimeframe(event.target.value);
  };

  const handleSaveButtonClick = () => {
    // console.log(`Target weight: ${targetWeight} kg`);
    // console.log(`Target timeframe: ${targetTimeframe}`);
    let targetW = parseInt(targetWeight);
    const userInfo = {
      "user_id": authenticatedUser.id,
      "targetWeight": targetW,
      "targetTimeFrame": targetTimeframe
    }
    //Handling with DB:
    axios.post('http://127.0.0.1:8000/api/targetgoals', userInfo)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });

    closeModal();
  };
  const handleUnitSystemChange = (event) => {
    setUnitSystem(event.target.value);
    setBMI("");
    if (event.target.value === "metric") {
      setHeightFeet("");
      setHeightInches("");
    } else {
      setHeightFeet("");
      setHeightInches("");
    }
  };
  

  const CalculateBMIFunc = (e) =>{
      e.preventDefault();
      calculateBMI();
  }

  return (
    <>
    <div style={{minHeight: "600px"}}>
      <div className="container-calculator">
        <h4>BMI Calculator</h4>
        
        <form className='calculator-box' onSubmit={(e) => CalculateBMIFunc(e)}>
          <div className="form-field">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="height-feet">Height:</label>
            {unitSystem === "imperial" ? (
              <>
                <input
                  type="number"
                  id="height-feet"
                  name="height-feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  required
                />
                <span>ft</span>
                <input
                  type="number"
                  id="height-inches"
                  name="height-inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  required
                />
                <span>in</span>
              </>
            ) : (
              <>
                <input
                  type="number"
                  id="height-cm"
                  name="height-cm"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  required
                />
                <span>cm</span>
              </>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="weight">Weight:</label>
            {unitSystem === "imperial" ? (
              <>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span>lbs</span>
              </>
            ) : (
              <>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span>kg</span>
              </>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="unit-system">Unit System:</label>
            <select
              id="unit-system"
              name="unit-system"
              value={unitSystem}
              onChange={handleUnitSystemChange}
            >
              <option value="imperial">Imperial</option>
              <option value="metric">Metric</option>
            </select>
          </div>
            <input type="submit" value="Calculate BMI" className="btn btn-dark" />
        </form>
        {bmi && (
          <div className="result">
            <h2>Your Results</h2>
            <p>
              Your BMI is <strong>{bmi}</strong>.
            </p>
            <p>
              You are considered to be in the <strong>{category}</strong>{" "}
              category.
            </p>
          </div>
        )}
      </div>
      </div>
      {/* BMI TARGET */}
      <img style={{marginTop: "0px"}} src={wecanhelp} height="200px" width="200px"/>
      <p><em>We can help you by letting you set your Weight Target and helping you monitor when you come back to check.</em></p>
      <div className="Bmi-Target">
        <header className="Target-header">
          <h1>Do you want to track your weight change? </h1>
          <div style={{margin: "15px 0px"}}>
          <button className="modal-btn btn btn-dark" style={{backgroundColor: "rgb(33,37,41)", margin: "0px 5px"}}onClick={handleSetGoalsClick}>Set Goals</button>
          <button className="modal-btn btn btn-dark" style={{backgroundColor: "rgb(33,37,41)", margin: "0px 5px"}}onClick={handleCheckGoalsClick}>Check Goals</button>
          </div>
          <div className={checkGoals? "display":"displaynot"}>
          <h4>Enter Your current Weight: </h4>
          <p><em>We will look into the database for the previously recorded Weight and give you the result.</em></p>
          <input
         type="number"
         id="weight"
         name="weight"
         value={checkGoalsWeight}
         onChange={(e) => setCheckGoalsWeight(e.target.value)}
         required
          /><label style={{margin: "0px 10px"}}>KG</label>
          <div style={{marginTop: "10px"}}>
          <button className='btn btn-dark' style={{backgroundColor: "rgb(33,37,41)"}} onClick={checkGoalsRecord}>Check</button>
         </div>
          </div>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {/* <div className="modal">
              hello */}
            <div className="modal-content" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Set Your Goals</h2>
              <label>
                Target Weight (kg):
                <input
                  type="number"
                  id="target-weight"
                  name="target-weight"
                  value={targetWeight}
                  onChange={handleTargetWeightChange}
                />
              </label>
              <br />
              <label>
                Target Timeframe:
                <select
                  value={targetTimeframe}
                  onChange={handleTargetTimeframeChange}
                >
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                </select>
              </label>
              <br />
              <button className="btn btn-dark" style={{backgroundColor: "rgb(33,37,41)"}} onClick={handleSaveButtonClick}>Save</button>
            </div>
            {/*  </div> */}
          </Modal>
        </header>
      </div>
    </>
  );
}

export default BmiCalc;