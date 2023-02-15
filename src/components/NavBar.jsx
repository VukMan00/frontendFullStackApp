import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navigationBar">
      <div className='home-page'>
        <Link to="/" className='homePage'>Pocetna stranica</Link>
      </div>
        <div className='credentials'>
            
        </div>
        <div className='loginRegister'>
            <Link to="/" className='login'>Login</Link>
            <Link to="/" className='register'>Register</Link>
        </div>
    </div>
  )
}

export default NavBar
