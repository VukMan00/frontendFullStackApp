
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = ({addUser}) => {
    const[userData,setUserData] = useState({
        'username':'',
        'password':'',
        'firstname':'',
        'lastname':'',
        'token':'',
        'role':''
    });

    let navigate = useNavigate();

    function handleInput(e){
        let newUserData = userData;
        console.log(e.target.value);
        newUserData[e.target.name] = e.target.value;
        setUserData(newUserData);
    }

    function login(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/login",userData)
        .then((res)=>{
            console.log(res.data);
            if(res.data.successful === true){
                window.sessionStorage.setItem('auth_token',res.data.access_token);
                window.sessionStorage.setItem('firstname',res.data.firstname);
                window.sessionStorage.setItem('lastname',res.data.lastname);
                window.sessionStorage.setItem('role',res.data.role);
                userData.firstname = res.data.firstname;
                userData.lastname = res.data.lastname;
                userData.token = res.data.access_token;
                userData.role = res.data.role;
                setUserData(userData);
                addUser(userData);
                navigate("/");
            }
            else{
                document.getElementById("alert").style.visibility = 'visible';
            }
        }).catch((e)=>{
            console.log(e);
        });
    }

    function potvrdi(){
        document.getElementById("alert").style.visibility = 'hidden';
    }

    return (
        <div className='login'>
            <form className='login-form' onSubmit={login}>
                <label htmlFor='username'>Username</label>
                <input type="text" name="username" id="username" placeholder='Unesite korisnicko ime' onInput={(e)=>handleInput(e)} />
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" id="password" placeholder='Unesite sifru' onInput={(e)=>handleInput(e)}/>
                <div className='button'>
                    <input type="submit" name="login" id="btn-login" value="LogIn" />
                </div>
                <div className='link'>
                    <Link to= "/register" className='registerLink'>Nemate nalog? Registrujte se!</Link>
                </div>
            </form>
            <div id="alert">
                <div id="box">
                    <div className="obavestenje">
                        Obaveštenje!
                    </div>
                    <div className="sadrzaj">
                        <p id="textAlert">Neuspesno, pokusajte ponovo!</p>
                        <button id="confirm" onClick={()=>potvrdi()}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
