import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Tests from './components/Tests';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewTest from './components/ViewTest';
import Login from './components/Login';
import Register from './components/Register';
import AddTest from './components/AddTest';
import AddQuestion from './components/AddQuestion';
import AddAnswer from './components/AddAnswer';

function App() {
  window.addEventListener("beforeunload", function(e) {
    window.location.href = "http://localhost:3000/";
    sessionStorage.clear();
  });

  const[questions,setQuestions] = useState();
  useEffect(()=> {
    if(questions==null){
      axios.get("http://127.0.0.1:8000/api/questions").then((res)=>{
        console.log(res.data.questions);
        setQuestions(res.data.questions);
      });
    }
  },[questions]);
  
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

  const[user,setUser] = useState({
    'username':'',
    'password':'',
    'firstname':'',
    'lastname':'',
    'token':'',
    'role':''
  });

  function addViewTest(testId){
    tests.forEach((test)=>{
      if(test.id === testId){
        setViewTest(test);
      }
    });
  }

  function addUser(userLogin){
    console.log(userLogin)
    setUser(userLogin);
  }

  function deleteTest(){
    var selects = document.getElementsByClassName("select");
    var testId = -1;
    var brojac = 0;
    for(let i=0;i<selects.length;i++){
      if(selects[i].checked){
        brojac++;
        testId = selects[i].value;
      }
    }
    if(brojac!==1){
      console.log("GRESKA");
    }
    else{
      axios.delete("http://127.0.0.1:8000/api/tests/" + testId, {headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
            if(res.data === "Successfull"){
              let arrayTests = tests.filter((t)=>t.id!==testId);
              setTests(arrayTests);
              var elem = document.getElementById(`${testId}`);
              elem.parentNode.removeChild(elem);
            }
        });
    }
  }

  const[question,setQuestion] = useState();

  function addAnswersToQuestion(questionForAnswers){
    console.log(questionForAnswers);
    let brojac = 0;
    questions.forEach((q)=>{
      if(q.id == questionForAnswers.id){
        brojac++;
      }
    });
    if(brojac===0){
      setQuestions([...questions,questionForAnswers]);
    }
    setQuestion(questionForAnswers);
  }

  const[questionsTest,setQuestionsTest] = useState([]);

  function addQuestionToTest(oneQuestion){
    setQuestionsTest([...questionsTest, oneQuestion]);
    console.log(questionsTest)
  }

  function addTestToMainPage(newTest){
    let flag = false;
    const arrayTests = tests.map(t => {
      if (t.id == newTest.id) {
        flag = true;
        return {...t, name: t.name, author:t.author, maxPoints:t.maxPoints};
      }
      return t;
    });
    if(flag){
      setTests(arrayTests);
    }
    else{
      setTests([...tests,newTest]);
    }
    setQuestionsTest([]);
    document.getElementById('alert').style.visibility = 'hidden';
  }

  function updateQuestion(updatedQuestion){
    const arrayQuestions = questions.map(q => {
      if (q.id === updatedQuestion.id) {
        return {...q, answer: updatedQuestion.answer};
      }
      return q;
    });
    setQuestions(arrayQuestions);
  }

  const[changedTest,setChangedTest]=useState();


  function handleChange(test){
    var selects = document.getElementsByClassName("select");
    var testId = -1;
    var brojac = 0;
    for(let i=0;i<selects.length;i++){
      if(selects[i].checked){
        brojac++;
        testId = selects[i].value;
      }
    }
    if(brojac!==1){
      console.log("GRESKA");
    }
    else{
        console.log(test);
        setChangedTest(test);
        console.log(changedTest);
        axios.get("http://127.0.0.1:8000/api/tests/" + testId + "/questions").then((res)=>{
          console.log(res.data[0][0]);
          let q = [];
          for(let i=0;i<res.data.length;i++){
            q[i] = res.data[i][0];
          }
          console.log(q);
          setQuestionsTest(q);
        });
      }
  }

  function deleteChanged(){
    setChangedTest(null);
    setQuestionsTest(null);
  }

  return (
    <BrowserRouter className="App">
      <NavBar user={user}/>
      <Routes>
          <Route
            path="/"
            element={
              <>
                <div className='title'>
                  <h1>Dobrodosli na sajt najvece baze testova</h1>
                </div>
                <div className='options'>
                  {user.role==='admin'? 
                  <>
                  <Link onClick={deleteChanged} to="/addTest" className='operation'>Dodaj test</Link> 
                  <Link to="/addTest" className='operation'>Azuriraj test</Link>
                  <Link to="/" className='operation' onClick={deleteTest}>Obrisi test</Link>
                  </>
                  : <></>}
                </div>
                <div className='headline-test'>
                  <Tests tests={tests} addViewTest={addViewTest} handleChange={handleChange} />
                </div>
              </>
            }
          />
          <Route path="/viewTest" element={<ViewTest viewTest={viewTest} user={user}/>} />
          <Route path="/login" element={<Login addUser={addUser}/>}/>
          <Route path="/register" element={<Register />}/>
          {window.sessionStorage.getItem('role')==='admin'?
          <>
          <Route path="/addTest" element={<AddTest changedTest={changedTest} questionsTest={questionsTest} addTestToMainPage={addTestToMainPage}/>} />
          <Route path="/addQuestion" element={<AddQuestion questions={questions} addQuestionToTest={addQuestionToTest} addAnswersToQuestion={addAnswersToQuestion}/>}/>
          <Route path="/addAnswer" element={<AddAnswer question={question} updateQuestion={updateQuestion}/>} />
          </>
          :
          <>
          </>
          }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
