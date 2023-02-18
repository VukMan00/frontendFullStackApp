
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = ({user}) => {
  const location = useLocation();
  var pathname = location.pathname;

  function logOut(){
    var axios = require('axios');
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/logout',
      headers: { 
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      }
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      user = null;
      user.token = null;
      sessionStorage.setItem('auth_token',user.token);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="navigationBar">
      <div className='home-page'>
        <Link to="/" className='homePage'>Pocetna stranica</Link>
      </div>
      <div className='credentials'>
        <h3>{user==null || user.token==null ? <></> : user.firstname + " " + user.lastname}</h3>
        <h3>{user==null || user.token==null ? <></> : user.role}</h3>
      </div>
      <div className='loginRegister'>
        {pathname === "/login" || pathname ===  "/register" ? (
          <></>
          ) : (
          <>
          {user === null || user.token==='' || user.token === null ? (
          <>
          <Link to="/login" className='btn-login'>LogIn</Link>
          <Link to="/register" className='btn-register'>Register</Link>
          </> 
          ):(
            <>
            <Link to="" className='btn-logout' onClick={()=>logOut()}>LogOut</Link>
            </>
          )}
          </>
          )}
        </div>
    </div>
  )
}

export default NavBar


