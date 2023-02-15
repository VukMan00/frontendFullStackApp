import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tests from './components/Tests';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const[tests,setTests] = useState();
  useEffect(()=> {
    if(tests==null){
      axios.get("http://127.0.0.1:8000/api/tests").then((res)=>{
        console.log(res.data.tests);
        setTests(res.data.tests);
      });
    }
  },[tests]);
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
          <Route
            path="/"
            element={
              <>
                <div className='options'>
                </div>
                <div className='title'>
                  <h1>Dobrodosli na sajt najvece baze testova</h1>
                </div>
                <div className='headline-test'>
                  <Tests tests={tests} />
                </div>
              </>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
