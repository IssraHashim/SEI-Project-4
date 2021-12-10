import React from 'react'



const Footer = () => {

  return (
    <div style={{ display: 'flex', height: '80px', justifyContent: 'space-evenly', alignItems: 'center' }} id='footer_full' >
      <div>About</div>
      <div>Terms & Conditions</div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '20px' }}>Instagram</div>
        <div style={{ marginLeft: '20px' }}>Facebook</div> 
        <div style={{ marginLeft: '20px' }}>Twitter</div>
      </div>
    </div>
  )
}



export default Footer