import React from 'react'


const Footer = () => {

  return (
    <div style={{ display: 'flex', height: '80px', justifyContent: 'space-evenly', alignItems: 'center' }} id='footer_full' >
      <div><a href='https://github.com/IssraHashim'>About</a></div>
      <div>Terms & Conditions</div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '20px' }}><a href='http://www.instagram.com'>Instagram</a></div>
        <div style={{ marginLeft: '20px' }}><a href='http://www.facebook.com'>Facebook</a></div> 
        <div style={{ marginLeft: '20px' }}><a href='http://www.twitter.com'>Twitter</a></div>
      </div>
    </div>
  )
}



export default Footer