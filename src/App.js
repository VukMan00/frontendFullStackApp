import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Tests from './components/Tests';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewTest from './components/ViewTest';

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

  const[viewTest, setViewTest] = useState();

  function addViewTest(testId){
    tests.forEach((test)=>{
      if(test.id === testId){
        setViewTest(test);
      }
    });
  }

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
                  <Tests tests={tests} addViewTest={addViewTest} />
                </div>
              </>
            }
          />
          <Route path="/viewTest" element={<ViewTest viewTest={viewTest} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
