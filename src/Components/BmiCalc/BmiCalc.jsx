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
  const [suggestion, setSuggestion] = useState(false);
  const [showMessage, setshowMessage ] = useState("");


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
    setSuggestion(true);
    messageSet(bmiCategory);
  };

  let messageSet = bmiCategory => {
    let message;
    if (bmiCategory === "Underweight"){
      message = <ol><li>Eat more calories: To gain weight, you need to consume more calories than your body burns.
      Aim to eat 500-1,000 more calories than your daily maintenance level.</li> <li>Focus on nutrient-dense foods: Choose foods that are high in nutrients such as protein, healthy
      fats, and complex carbohydrates. Examples include nuts, seeds, whole grains, lean meats, fish,
      and vegetables.</li><li>Eat frequently: Try to eat at least three meals per day and include snacks in between. This will
      help you consume more calories throughout the day.</li><li>Strength train: Resistance training can help build muscle mass and promote weight gain. Focus
      on compound exercises such as squats, deadlifts, and bench presses.</li><li>Get enough sleep: Aim for 7-8 hours of sleep per night to promote muscle recovery and growth.</li>
    <li>Seek medical advice: If you are struggling to gain weight or have any concerns about your
      health, speak to a healthcare professional. They can provide personalized advice and support.</li><p className='last-text'>Remember, gaining weight in a healthy way takes time and consistency. It&#39;s important to be patient with
      the process and focus on making sustainable lifestyle changes that promote overall health and well-
      being.</p></ol>

    }else if (bmiCategory === "Normal weight"){
      message = <ol>
                <li>Stay active: Aim to engage in regular physical activity such as walking, jogging, cycling, or weight
lifting. Physical activity not only helps maintain your weight but also improves your
cardiovascular health, strengthens your bones and muscles, and reduces stress.</li>
                <li>Eat a balanced diet: Focus on consuming a variety of nutrient-dense foods such as fruits,
vegetables, whole grains, lean proteins, and healthy fats. Avoid processed foods, sugary drinks,
and snacks that are high in calories but low in nutrients.</li>
                <li>Get enough sleep: Aim for 7-8 hours of sleep per night to help regulate your appetite, energy
levels, and overall health.</li>
<li>Manage stress: Chronic stress can lead to overeating, weight gain, and other health problems.
Practice stress management techniques such as meditation, deep breathing, yoga, or spending
time in nature.</li>
<li>Monitor your weight: Keep track of your weight on a regular basis to ensure that you are
maintaining a healthy BMI. If you notice any significant changes in your weight, speak to a
healthcare professional.</li>
<p className='last-text'>Remember, maintaining a healthy weight is a lifelong journey that requires a commitment to healthy
habits and lifestyle choices. By making small changes to your daily routine, you can continue to improve
your health and well-being.</p>
                </ol>
    
    
    }else if(bmiCategory === "Overweight"){
      message = <ol>
        <li>Set realistic goals: Aim to lose 1-2 pounds per week. Losing weight too quickly can be unhealthy
and difficult to maintain.</li>
        <li>Eat a balanced diet: Focus on consuming a variety of nutrient-dense foods such as fruits,
vegetables, whole grains, lean proteins, and healthy fats. Avoid processed foods, sugary drinks,
and snacks that are high in calories but low in nutrients.</li>
        <li>Control portion sizes: Use a food scale or measuring cups to ensure that you are consuming
appropriate portions. Be mindful of your hunger and fullness cues, and stop eating when you
feel full.</li>
        <li>Engage in regular physical activity: Aim to engage in at least 30 minutes of moderate-intensity
exercise most days of the week. This can include activities such as brisk walking, jogging, cycling,
or swimming.</li>
        <li>Get enough sleep: Aim for 7-8 hours of sleep per night to help regulate your appetite, energy
levels, and overall health.</li>
<p className='last-text'>Remember, losing weight in a healthy and sustainable way takes time and consistency. It&#39;s important to
be patient with the process and focus on making sustainable lifestyle changes that promote overall
health and well-being. If you have any concerns about your weight or health, speak to a healthcare
professional.</p>
      </ol>
    
    
    
    
    }else {
      message = <ol>
      <li>Set realistic goals: Aim to lose 1-2 pounds per week. Losing weight too quickly can be unhealthy
and difficult to maintain.</li>
      <li>Eat a balanced diet: Focus on consuming a variety of nutrient-dense foods such as fruits,
vegetables, whole grains, lean proteins, and healthy fats. Avoid processed foods, sugary drinks,
and snacks that are high in calories but low in nutrients.</li>
      <li>Control portion sizes: Use a food scale or measuring cups to ensure that you are consuming
appropriate portions. Be mindful of your hunger and fullness cues, and stop eating when you
feel full.</li>
      <li>Engage in regular physical activity: Aim to engage in at least 30 minutes of moderate-intensity
exercise most days of the week. This can include activities such as brisk walking, jogging, cycling,
or swimming.</li>
      <li>Get enough sleep: Aim for 7-8 hours of sleep per night to help regulate your appetite, energy
levels, and overall health.</li>
<p className='last-text'>Remember, losing weight in a healthy and sustainable way takes time and consistency. It&#39;s important to
be patient with the process and focus on making sustainable lifestyle changes that promote overall
health and well-being. If you have any concerns about your weight or health, speak to a healthcare
professional.</p>
    </ol>
    }
    setshowMessage(message);
  }



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
  };
  const [checkGoals, setCheckGoals] = useState(false);
  const [checkGoalsWeight, setCheckGoalsWeight] = useState(0);
  const [isAlreadySet, setisAlreadySet] = useState(false);
  const [targetedData, setTargetedData] = useState({})
  const [authenticated, setauthenticated] = useState(null);
  const authenticatedUser = props.data;
  
  useEffect(() => {
    axios.get(`https://fitnessgoal.ngrok.io/api/targetuser/${authenticatedUser.id}`)
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

    let targetW = parseInt(targetWeight);
    const userInfo = {
      "user_id": authenticatedUser.id,
      "targetWeight": targetW,
      "targetTimeFrame": targetTimeframe
    }
    //Handling with DB:
    axios.post('https://fitnessgoal.ngrok.io/api/targetgoals', userInfo)
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
        
        <form className='calculator-box' onSubmit={(e) => CalculateBMIFunc(e)} style={{display: "flex", flexDirection: "column" }}>
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
                <input style={{width: "130px"}}
                  type="number"
                  id="height-feet"
                  name="height-feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  required
                />
                <span>ft</span>
                <input style={{width: "130px"}}
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
      <div className='suggestion-box'>
      <div className={suggestion? 'display-suggestion' : 'dontdisplay-suggestions' }>
        <h3>Here, what you can do.</h3>
        {showMessage}
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
                Target Weight:
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
