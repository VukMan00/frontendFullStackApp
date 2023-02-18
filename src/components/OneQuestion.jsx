import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Answers from './Answers'
import { Link, useLocation } from 'react-router-dom';

const OneQuestion = ({question,brojac,test,addQuestionToTest,addAnswersToQuestion,handlePoints}) => {
  const location = useLocation();
  var pathname = location.pathname;

  const[questionPoints, setQuestionPoints] = useState();
  useEffect(()=>{
    if(question!=null){
      if(test!=null){
          console.log("http://127.0.0.1:8000/api/test/" + test.id + "/question/" + question.id);
          axios.get("http://127.0.0.1:8000/api/test/" + test.id + "/question/" + question.id).then((res)=>{
            console.log(res.data[0]);
            setQuestionPoints(res.data[0].points);
          }).catch((e)=>{
              console.log(e);
          });
      
      }
      else{
          console.log("GRESKA")
      }
    }
  });

  var role = window.sessionStorage.getItem('role');
  return (
    <div className='one-question' id={"question"+question.id}>
      {role==='admin' ? <input type="checkbox" name="selectQuestion" className="selectQuestion" value={question.id}/> : <></>}
      <div className='oneQuestion'>
        <h3>{brojac}. {question.content}</h3>
        <div>
          <Answers answers={question.answer}/>
        </div>
        {test==null? <></> : <h4>Broj poena: _ / {questionPoints}</h4>}
        {pathname==='/addQuestion' || pathname==='/addTest' ?
        <div className='options'>
        {pathname==='/addQuestion' ? <Link to="" className='addQuestionToTest' onClick={()=>addQuestionToTest(question)}>Dodaj pitanje u test</Link> : <></>}
        <Link to="/addAnswer" className='addAnswersToQuestion' onClick={()=>addAnswersToQuestion(question)}>Dodaj odgovore u pitanje</Link>
        </div>
        : <></>}
        {pathname==='/addTest'?
        <div className='testQuestionPoints'> 
        <input type="text" className='points' name='points' id="points" placeholder='Unesite broj poena pitanja' onInput={(e)=>handlePoints(e)}/>
        <input type="text" className='pointsErr' name='pointsErr' id="pointsErr"/>
        </div>
        :
        <>
        </>
        }
      </div>
    </div>
  )
}

export default OneQuestion
