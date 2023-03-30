import React from 'react';
import './App.css';
import { Contactform } from './Components/ContactForm/Contactform';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer/Footer';
import Index from './Components/Index/Index';
import Login from './Components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Bloodmate from './Components/Bloodmate/Bloodmate';
import Error404 from './Components/Error404/Error404';

function App() {
  return (
    <>
    <div className="App" style={{backgroundColor: "#f3f6fb", minHeight:"1200px"}}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
     <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Index/>}/>
        <Route path='/contact' element={<Contactform/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/bloodmate' element={<Bloodmate/>} />
        <Route path="*" element ={<Error404/>}/>
      </Routes>
    </div>
         <Footer />

         </>
  );
}

export default App;
