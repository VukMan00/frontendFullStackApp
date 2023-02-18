import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Questions from './Questions';

const AddTest = ({changedTest,questionsTest,addTestToMainPage}) => {

  const[test,setTest]= useState({
        'id':'',
        'name':'',
        'author':'',
        'maxPoints':0
  });

  const[newQuestionTests,setNewQuestionsTests] = useState(questionsTest);
  const[testQuestion, setTestQuestion] = useState({
    'question_id':'',
    'points':0
  });

  useEffect(()=>{
    if(changedTest!==null){
        document.getElementById('name').value = changedTest.name;
        document.getElementById('author').value = changedTest.author;
        document.getElementById('maxPoints').value = changedTest.maxPoints;
        setTest(changedTest);
    }
    else{
        document.getElementById('name').value = '';
        document.getElementById('author').value = '';
        document.getElementById('maxPoints').value = '';
    }
  },[setTest,changedTest]);

  function handleInput(e){
    e.preventDefault();
    let newTest = test;
    newTest[e.target.name] = e.target.value;
    console.log(newTest);
    setTest(newTest);
  }

  function handlePoints(e){
    e.preventDefault();
    let newTestQuestion = testQuestion;
    newTestQuestion[e.target.name] = e.target.value;
    console.log(newTestQuestion);
    setTestQuestion(newTestQuestion);
  }

  function deleteQuestion(e){
    e.preventDefault();
    var selects = document.getElementsByClassName("selectQuestion");
    let brojac = 0;
    let questionId = -1;
    for(let i=0;i<selects.length;i++){
        if(selects[i].checked){
            brojac++;
            questionId = selects[i].value;
        }
    }
    if(brojac!==1){
        console.log("GRESKA");
        if(brojac===0){
            document.getElementById('textAlert').innerHTML = "Morate izabrati pitanje kako bi ga izbrisali!!";
            document.getElementById('alert').style.visibility='visible';
        }
        else{
            document.getElementById('textAlert').innerHTML = "Ne mozete izbrisati vise od jednog pitanja odjednom!!";
            document.getElementById('alert').style.visibility='visible';
        }
        return;
    }
    else{
        let arrayQuestions = newQuestionTests.filter((q)=>q.id!==questionId);
        setNewQuestionsTests(arrayQuestions);
        var elem = document.getElementById(`question${questionId}`);
        elem.parentNode.removeChild(elem);
        document.getElementById('textAlert').innerHTML = "Uspesno ste obrisali pitanje!!";
        document.getElementById('alert').style.visibility='visible';
    }
  }

  function addTest(e){
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/tests",test,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
      .then((res)=>{
        console.log(res);
        if(res.data.successful === undefined){
            console.log(res);
            document.getElementById('alert').style.visibility = 'visible';
            document.getElementById('textAlert').innerHTML = "Uspesno ste dodali test!!";
            test.id = res.data.id;
            setTest(test);
            document.getElementById('name').value = '';
            document.getElementById('author').value = '';
            document.getElementById('maxPoints').value = '';
            document.getElementById('nameErr').style.visibility = 'hidden';
            document.getElementById('authorErr').style.visibility = 'hidden';
            document.getElementById('maxPointsErr').style.visibility = 'hidden';
            if(newQuestionTests.length > 0){
                for(let i=0;i<newQuestionTests.length;i++){
                    testQuestion.question_id = newQuestionTests[i].id;
                    setTestQuestion(testQuestion);
                    axios.post("http://127.0.0.1:8000/api/tests/" + test.id + "/questions",testQuestion,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
                    .then((res)=>{
                        if(res.data.successful === undefined){
                            console.log("DODALI STE I PITANJE U TEST");
                            console.log(newQuestionTests[i].content);
                            document.getElementById('pointsErr').style.visibility = 'hidden';
                            setNewQuestionsTests([]);
                        }
                        else{
                            document.getElementById('alert').style.visibility = 'visible';
                            document.getElementById('textAlert').innerHTML = "Neuspesno dodavanje pitanja!!";
                            setNewQuestionsTests([]);
                            validation(res);
                        }
                    });
                }
            }
        }
        else{
            document.getElementById('alert').style.visibility = 'visible';
            document.getElementById('textAlert').innerHTML = "Neuspesno dodavanje pitanja!!";
            validation(res);
        }
      });
  }

  function validation(res){
    if(res.data.validator.name!==undefined){
        document.getElementById('nameErr').value = res.data.validator.name[0];
        document.getElementById('nameErr').style.visibility = 'visible';
    }
    else{
        document.getElementById('nameErr').style.visibility = 'hidden';
    }
    if(res.data.validator.author!==undefined){
        document.getElementById('authorErr').value = res.data.validator.author[0];
        document.getElementById('authorErr').style.visibility = 'visible';
    }
    else{
        document.getElementById('authorErr').style.visibility = 'hidden';
    }
    if(res.data.validator.maxPoints!==undefined){
        document.getElementById('maxPointsErr').value = res.data.validator.maxPoints[0];
        document.getElementById('maxPointsErr').style.visibility = 'visible';
    }
    else{
        document.getElementById('maxPointsErr').style.visibility = 'hidden';
    }
    if(res.data.validator.points!==undefined){
        document.getElementById('pointsErr').value = res.data.validator.points[0];
        document.getElementById('pointsErr').style.visibility = 'visible';
    }
    else{
        document.getElementById('pointsErr').style.visibility = 'hidden';
    }
  }

  function updateTest(e){
    e.preventDefault();
    console.log(test);
    axios.put("http://127.0.0.1:8000/api/tests/"+test.id,test,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
            console.log(res);
            if(res.data.successful === undefined){
                if(res.data === "Successfull"){
                    console.log(res.data);
                    document.getElementById('textAlert').innerHTML = 'Uspesno ste izmenili test';
                    document.getElementById('alert').style.visibility = 'visible';
                    document.getElementById("name").value = "";
                    document.getElementById('author').value = '';
                    document.getElementById('maxPoints').value = '';
                    document.getElementById('nameErr').style.visibility = 'hidden';
                    document.getElementById('authorErr').style.visibility = 'hidden';
                    document.getElementById('maxPointsErr').style.visibility = 'hidden';
                }
                else{
                    document.getElementById('alert').style.visibility = 'visible';
                    document.getElementById('textAlert').innerHTML = "Neuspesna izmena testa!!";
                    validation(res);
                }
            }
            else{
                document.getElementById('alert').style.visibility = 'visible';
                document.getElementById('textAlert').innerHTML = "Neuspesna izmena testa!!";
                validation(res);
            }
        });    
  }

  return (
    <div className='addTest'>
        <form className='form-add-test' onSubmit={(e)=>addTest(e)}>
            <div className='test-data'>
                <label htmlFor='name'>Naziv testa</label>
                <input type="text" name="name" className='name' id="name" placeholder='Unesite naziv testa' onInput={(e)=>handleInput(e)} />
                <input type="text" name="nameErr" className='nameErr' id='nameErr'/>
                <label htmlFor='author'>Autor</label>
                <input type="text" name="author" className='author' id="author" placeholder='Unesite autora' onInput={(e)=>handleInput(e)}/>
                <input type="text" name="authorErr" className='authorErr' id='authorErr'/>
                <label htmlFor='maxPoints'>Maksimalan broj poena</label>
                <input type="text" name="maxPoints" className='maxPoints' id="maxPoints" placeholder='Unesite maksimalan broj poena' onInput={(e)=>handleInput(e)} />
                <input type="text" name="maxPointsErr" className='maxPointsErr' id='maxPointsErr'/>
            </div>
            <div className='test-questions'>
                <div className='options'>
                    <Link to="/addQuestion" className='operation'>Dodaj pitanja</Link> 
                    <Link to="" className='operation' onClick={(e)=>deleteQuestion(e)}>Izbaci pitanje</Link>
                </div>
                <div className='questionsForTest'>
                    <h3 id="text">Pitanja koja se nalaze u testu:</h3>
                    <div className='questions'>
                        <Questions questions={newQuestionTests} handlePoints={handlePoints}/>
                    </div>
                </div>
            </div>
            <div className='button'>
                {changedTest===null ?
                <input type="submit" name="addTest" id="btn-addTest" className='btn-addTest' value="Dodaj test" /> :
                <input type="submit" name="updateTest" id="btn-updateTest" className='btn-updateTest' value="Azuriraj test" onClick={(e)=>updateTest(e)}/>
                }
            </div>
        </form>
        <div id="alert">
          <div id="box">
              <div className="obavestenje">
                  Obaveštenje!
              </div>
              <div className="sadrzaj">
                  <p id="textAlert"></p>
                  <button id="confirm" onClick={()=>addTestToMainPage(test)}>OK</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AddTest
