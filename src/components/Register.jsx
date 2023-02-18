import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const[userData,setUserData] = useState({
        'username': "",
        'password': "",
        'email':"",
        'firstname':"",
        'lastname':""
    });

    let navigate = useNavigate();
    
    function handleInput(e){
        let newUserData = userData;
        console.log(e.target.value);
        newUserData[e.target.name] = e.target.value;
        setUserData(newUserData);
    }

    function register(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/register",userData)
        .then((res)=>{
            console.log(res.data);
            if(res.data.successful === true){
                window.sessionStorage.setItem('auth_token',res.data.access_token);
                navigate("/login");
            }
            else{
                document.getElementById("alert").style.visibility = 'visible';
                validation(res);
            }
        }).catch((e)=>{
            console.log(e);
        });
    }

    function validation(res){
        if(res.data.validator.username !== undefined){
            document.getElementById('usernameErr').style.visibility = 'visible';
            document.getElementById('usernameErr').value = res.data.validator.username[0];
        }
        else{
            document.getElementById('usernameErr').style.visibility = 'hidden';
        }
        if(res.data.validator.password !== undefined){
            document.getElementById('passwordErr').style.visibility = 'visible';
            document.getElementById('passwordErr').value = res.data.validator.password[0];
        }
        else{
            document.getElementById('passwordErr').style.visibility = 'hidden';
        }
        if(res.data.validator.email !== undefined){
            document.getElementById('emailErr').style.visibility = 'visible';
            document.getElementById('emailErr').value = res.data.validator.email[0];
        }
        else{
            document.getElementById('emailErr').style.visibility = 'hidden';
        }
        if(res.data.validator.firstname !== undefined){
            document.getElementById('firstnameErr').style.visibility = 'visible';
            document.getElementById('firstnameErr').value = res.data.validator.firstname[0];
        }
        else{
            document.getElementById('firstnameErr').style.visibility = 'hidden';
        }
        if(res.data.validator.lastname !== undefined){
            document.getElementById('lastnameErr').style.visibility = 'visible';
            document.getElementById('lastnameErr').value = res.data.validator.lastname[0];
        }
        else{
            document.getElementById('lastnameErr').style.visibility = 'hidden';
        }
    }

    function potvrdi(){
        document.getElementById("alert").style.visibility = 'hidden';
    }

  return (
    <div className='login'>
        <form className='login-form' onSubmit={register}>
            <label htmlFor='username'>Username</label>
            <input type="text" name="username" placeholder='Unesite korisnicko ime' onInput={(e)=>handleInput(e)}/>
            <input type="text" name="usernameErr" id="usernameErr" readOnly/>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" placeholder='Unesite sifru' onInput={(e)=>handleInput(e)}/>
            <input type="text" name="passwordErr" id="passwordErr" readOnly/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder='Unesite email' onInput={(e)=>handleInput(e)}/>
            <input type="text" name="emailErr" id="emailErr" readOnly/>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstname" placeholder='Unesite ime' onInput={(e)=>handleInput(e)}/>
            <input type="text" name="firstnameErr" id="firstnameErr" readOnly/>
            <label htmlFor="lastname">Lastname</label>
            <input type="text" name="lastname" placeholder='Unesite prezime' onInput={(e)=>handleInput(e)}/>
            <input type="text" name="lastnameErr" id="lastnameErr" readOnly/>
            <div className='button'>
                <input type="submit" name="login" id="btn-login" value="Register" onInput={(e)=>handleInput(e)}/>
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

export default Register
