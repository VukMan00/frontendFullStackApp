
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Answers from './Answers'

const OneQuestion = ({question,brojac,test}) => {
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
  return (
    <div className='oneQuestion'>
      <h3>{brojac}. {question.content}</h3>
      <div>
        <Answers answers={question.answer}/>
      </div>
      <h4>Broj poena: _ / {questionPoints}</h4>
    </div>
  )
}

export default OneQuestion


