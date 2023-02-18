import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Answers from './Answers';

const AddAnswer = ({question,updateQuestion}) => {
    const[answers,setAnswers] = useState();
    useEffect(()=>{
      if(answers==null){
        axios.get("http://127.0.0.1:8000/api/questions/" + question.id + "/answers").then((res)=>{
          setAnswers(res.data.answers);
        });
      }
    });

    const[updatedQuestion, setUpdatedQuestion]=useState({
        'id':'',
        'content':'',
        'answer':[]
    });

    useEffect(()=>{
        updatedQuestion.id = question.id;
        updatedQuestion.content = question.content;
        updatedQuestion.answer = answers;
        setUpdatedQuestion(updatedQuestion);
      },[updatedQuestion,answers,question.content,question.id])

    const[answer,setAnswer]=useState({
        'id':'',
        'content':'',
        'answer':false,
        'question_id': question!=null ? question.id : 0
    });

    function handleInput(e){
        console.log(e.target.value);
        let resenje = false;
        if(document.getElementById('trueAnswer').checked){
            resenje = true;
        }
        else{
            resenje = false;
        }
        console.log(answer);
        const answer1 = {
            'id':answer.id,
            'content':e.target.value,
            'answer':resenje,
            'question_id': question!=null ? question.id : 0
        };
        console.log(answer1);
        setAnswer(answer1);
    }

    function addAnswer(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/answers",answer,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
            console.log(res);
            if(res.data.successful === undefined){
                answer.id = res.data.id;
                setAnswers([...answers, answer]);
                document.getElementById('textAlert').innerHTML = "Uspesno ste dodali odgovor!!";
                document.getElementById('alert').style.visibility='visible';
                document.getElementById('contentErr').style.visibility = 'hidden';
                document.getElementById("content").value = "";
            }
            else{
                document.getElementById('textAlert').innerHTML = "Neuspesno dodavanje odgovora!!";
                document.getElementById('alert').style.visibility='visible';
                validation(res);
            }
        });
    }

    function deleteAnswer(e){
        e.preventDefault();
        var selects = document.getElementsByClassName("selectOneAnswer");
        let brojac = 0;
        let answerId = -1;
        for(let i=0;i<selects.length;i++){
            if(selects[i].checked){
                brojac++;
                answerId = selects[i].value;
            }
        }
        if(brojac!==1){
            console.log("GRESKA");
            if(brojac===0){
                document.getElementById('textAlert').innerHTML = "Morate izabrati odgovor kako bi izvrsili brisanje!!";
                document.getElementById('alert').style.visibility='visible';
            }
            else{
                document.getElementById('textAlert').innerHTML = "Ne mozete izbrisati vise od jednog odgovora odjednom!!";
                document.getElementById('alert').style.visibility='visible';
            }
            return;
        }
        else{
            axios.delete("http://127.0.0.1:8000/api/answers/" + answerId, {headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
            .then((res)=>{
                console.log(res);
                if(res.data === "Successfull"){
                    let arrayAnswers = answers.filter((a)=>a.id!==answerId);
                    setAnswers(arrayAnswers);
                    document.getElementById('textAlert').innerHTML = "Uspesno ste obrisali odgovor!!";
                    document.getElementById('alert').style.visibility='visible';
                    var elem = document.getElementById(`answer${answerId}`);
                    elem.parentNode.removeChild(elem);
                }
                else{
                    console.log("GRESKA");
                    document.getElementById('textAlert').innerHTML = "Neuspesno brisanje odgovora!!";
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

    function changeAnswer(e){
        e.preventDefault();
        var selects = document.getElementsByClassName("selectOneAnswer");
        let brojac = 0;
        let answerId = -1;
        for(let i=0;i<selects.length;i++){
            if(selects[i].checked){
                brojac++;
                answerId = selects[i].value;
            }
        }
        if(brojac!==1){
            console.log("GRESKA");
            if(brojac===0){
                document.getElementById('textAlert').innerHTML = "Morate izabrati odgovor kako bi izvrsili azuriranje!!";
                document.getElementById('alert').style.visibility='visible';
            }
            else{
                document.getElementById('textAlert').innerHTML = "Ne mozete izbrisati vise od jednog odgovora odjednom!!";
                document.getElementById('alert').style.visibility='visible';
            }
        }
        else{
            console.log(answerId);
            answers.forEach((a)=>{
                if(a.id == answerId){
                  answer.id = a.id;
                  answer.content = a.content;
                  answer.answer = a.answer;
                  setAnswer(answer);
                }
            });
            document.getElementById('content').value = answer.content;
            var resenje = answer.answer;
            console.log(resenje);
            if(resenje == 1){
                document.getElementById("trueAnswer").checked = true;
                document.getElementById("falseAnswer").checked = false;
            }
            else{
                document.getElementById("trueAnswer").checked = false;
                document.getElementById("falseAnswer").checked = true;
            }

            document.getElementById('btn-updateAnswer').style.visibility = 'visible';
            document.getElementById('btn-addAnswer').style.visibility = 'hidden';
        }
    }

    function updateAnswer(e){
        e.preventDefault();
        console.log(answer);
        if(document.getElementById("trueAnswer").checked === true){
            answer.answer = true;
        }
        else{
            answer.answer = false;
        }
        axios.put("http://127.0.0.1:8000/api/answers/"+answer.id,answer,{headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')}})
        .then((res)=>{
            console.log(res);
            if(res.data.successful === undefined){
                if(res.data === "Successfull"){
                    const arrayAnswers = answers.map(a => {
                        if (a.id == answer.id) {
                        return {...a, content: answer.content, answer:answer.answer};
                        }
                        return a;
                    });
                    setAnswers(arrayAnswers);
                    updatedQuestion.answer = answers;
                    setUpdatedQuestion(updatedQuestion);
                    document.getElementById('textAlert').innerHTML = 'Uspesno ste izmenili odgovor';
                    document.getElementById('alert').style.visibility = 'visible';
                    document.getElementById('contentErr').style.visibility = 'hidden';
                    document.getElementById("content").value = "";
                }
                else{
                    document.getElementById('textAlert').innerHTML = 'Neuspesna izmena odgovora';
                    document.getElementById('alert').style.visibility = 'visible';
                }
            }
            else{
                document.getElementById('textAlert').innerHTML = 'Neuspesna izmena odgovora';
                document.getElementById('alert').style.visibility = 'visible';
                validation(res);
            }
        });
    }

  return (
    <div className='addAnswer'>
      <div className='title'>
        <h1>Dodavanje odgovora za pitanje: {question==null ? "Niste izabrali pitanje" : question.content}</h1>
      </div>
      <form className='form-add-answers' onSubmit={(e)=>addAnswer(e)}>
        <div className='answer-data'>
            <label htmlFor='content'>Sadrzaj odgovora</label>
            <input name="content" id="content" className='content' placeholder='Unesite sadrzaj' onInput={(e)=>handleInput(e)}/>
            <input name="contentErr" id="contentErr" className='contentErr' />
            <div className='trueFalseAnswers'>
                <label htmlFor='trueAnswer'>Tacno</label>
                <input type="checkbox" className="selectAnswer" name="trueAnswer" id="trueAnswer" value="true"/>
                <label htmlFor='falseAnswer'>Netacno</label>
                <input type="checkbox" className="selectAnswer" name="falseAnswer" id="falseAnswer" value="false" />
            </div>
            <div className='button'>
                <input type="submit" name="addAnswer" id="btn-addAnswer" className='btn-addAnswer' value="Dodaj odgovor" />
                <input type="submit" name="updateAnswer" id="btn-updateAnswer" className='btn-updateAnswer' value="Azuriraj odgovor" onClick={(e)=>updateAnswer(e)}/>
            </div>
        </div>
      </form>
      <div className='answersForTest'>
            <h3 id="text">Lista dostupnih odgovora za pitanje: {question==null ? "Niste izabrali pitanje" : question.content}</h3>
            <Link to="/addQuestion" className='btn-get-answers' onClick={()=>updateQuestion(updatedQuestion)}>Vrati odgovore</Link>
            <div className='options'>
                <Link to="" className='operation' onClick={(e)=>changeAnswer(e)}>Azuriraj odgovor</Link>
                <Link to="" className='operation' onClick={(e)=>deleteAnswer(e)}>Obrisi odgovor</Link>
            </div>
            <div className='answersInAddAnswer'>
                <Answers answers={answers}/>
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

export default AddAnswer
