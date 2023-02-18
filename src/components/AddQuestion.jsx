import axios from 'axios';
import React, {useState } from 'react'
import { Link} from 'react-router-dom';
import Questions from './Questions'

const AddQuestion = ({questions,addQuestionToTest,addAnswersToQuestion}) => {
  const[newQuestions,setNewQuestions]=useState(questions);

  const[question,setQuestion]=useState({
    'id':'',
    'content':''
  });


  function handleInput(e){
    e.preventDefault();
    let newQuestion = question;
    newQuestion[e.target.name] = e.target.value;
    setQuestion(newQuestion);
  }

  function addQuestions(e){
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/questions",question,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
      .then((res)=>{
        if(res.data.successful === undefined){
            console.log(res);
            document.getElementById('alert').style.visibility = 'visible';
            document.getElementById('textAlert').innerHTML = "Uspesno ste dodali pitanje!!";
            document.getElementById("content").value = "";
            document.getElementById('contentErr').style.visibility = 'hidden';
            question.id = res.data.id;
            console.log(question);
            setQuestion(question);
            setNewQuestions([...newQuestions,question]);
        }
        else{
          document.getElementById('alert').style.visibility = 'visible';
          document.getElementById('textAlert').innerHTML = "Neuspesno dodavanje pitanja!!";
          validation(res);
        }
      });
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
        axios.delete("http://127.0.0.1:8000/api/questions/" + questionId, {headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
            console.log(res);
            if(res.data === "Successfull"){
                let arrayQuestions = newQuestions.filter((q)=>q.id!==questionId);
                setNewQuestions(arrayQuestions);
                var elem = document.getElementById(`question${questionId}`);
                elem.parentNode.removeChild(elem);
                document.getElementById('textAlert').innerHTML = "Uspesno ste obrisali pitanje!!";
                document.getElementById('alert').style.visibility='visible';
            }
            else{
                console.log("GRESKA");
                document.getElementById('textAlert').innerHTML = "Neuspesno brisanje pitanja!!";
                document.getElementById('alert').style.visibility = 'visible';
            }
        });
    }
  }

  function potvrdi(){
    document.getElementById("alert").style.visibility = 'hidden';
  }
  
  function validation(res){
    if(res.data.validator.content!==undefined){
      document.getElementById('contentErr').style.visibility = 'visible';
      document.getElementById('contentErr').value = res.data.validator.content[0];
    }
    else{
      document.getElementById('contentErr').style.visibility = 'hidden';
    }
  }

  function changeQuestion(e){
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
      console.log(questionId);
      newQuestions.forEach((q)=>{
        if(q.id == questionId){
          question.id = q.id;
          question.content = q.content;
          setQuestion(question);
        }
      });

      document.getElementById('content').value = question.content;
      document.getElementById('btn-updateQuestion').style.visibility = 'visible';
      document.getElementById('btn-addQuestion').style.visibility = 'hidden';
    }
  }

  function updateQuestion(e){
    e.preventDefault();
    console.log(question);
    axios.put("http://127.0.0.1:8000/api/questions/"+question.id,question,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
          console.log(res);
          if(res.data.successful === undefined){
            if(res.data === "Successfull"){
              const arrayQuestions = newQuestions.map(q => {
                if (q.id == question.id) {
                  return {...q, content: question.content};
                }
                return q;
              });
            setNewQuestions(arrayQuestions);
            document.getElementById('textAlert').innerHTML = 'Uspesno ste izmenili pitanje';
            document.getElementById('alert').style.visibility = 'visible';
            document.getElementById("content").value = "";
            document.getElementById('contentErr').style.visibility = 'hidden';
            }
            else{
              document.getElementById('textAlert').innerHTML = 'Neuspesno ste izmenili pitanje';
              document.getElementById('alert').style.visibility = 'visible';
            }
          }
          else{
            document.getElementById('textAlert').innerHTML = 'Neuspesno ste izmenili pitanje';
            document.getElementById('alert').style.visibility = 'visible';
            validation(res);
          }
    });
  }

  return (
    <div className='addQuestion'>
      <form className='form-add-questions' onSubmit={(e)=>addQuestions(e)}>
        <div className='question-data'>
            <label htmlFor='content'>Sadrzaj pitanja</label>
            <input name="content" id="content" className='content' placeholder='Unesite sadrzaj' onInput={(e)=>handleInput(e)}/>
            <input name="contentErr" id="contentErr" className='contentErr' />
            <div className='button'>
                <input type="submit" name="addQuestion" id="btn-addQuestion" className='btn-addQuestion' value="Dodaj pitanje" />
                <input type="submit" name="updateQuestion" id="btn-updateQuestion" className='btn-updateQuestion' value="Azuriraj pitanje" onClick={(e)=>{updateQuestion(e)}}/>
            </div>
        </div>
      </form>
      <div className='questionsForTest'>
            <h3 id="text">Lista dostupnih pitanja:</h3>
            <Link to="/addTest" className='btn-get-questions'>Vrati pitanja</Link>
            <div className='options'>
                <Link to="" className='operation' onClick={(e)=>changeQuestion(e)}>Azuriraj pitanje</Link>
                <Link to="" className='operation' onClick={(e)=>deleteQuestion(e)}>Obrisi pitanje</Link>
            </div>
            <div className='questions'>
                <Questions questions={newQuestions} test={null} addQuestionToTest={addQuestionToTest} addAnswersToQuestion={addAnswersToQuestion}/>
            </div>
      </div>
      <div id="alert">
          <div id="box">
              <div className="obavestenje">
                  Obaveštenje!
              </div>
              <div className="sadrzaj">
                  <p id="textAlert"></p>
                  <button id="confirm" onClick={()=>potvrdi()}>OK</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AddQuestion
