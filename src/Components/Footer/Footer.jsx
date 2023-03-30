import React from 'react'

const Footer = () => {
    let currentYear = new Date().getFullYear();
  return (
    <div style={{marginTop:"10px", backgroundColor:"#304146"}}>
    <div className="text-center p-3" style={{color:"whitesmoke",backgroundColor:"rgb(1,18,51)",textAlign:"center"}}>
      Made with ❤️ © {currentYear} FitnessGoal
    </div>
    </div>
  )
}

export default Footer