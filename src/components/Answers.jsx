import React from 'react'
import { useLocation } from 'react-router-dom';
import OneAnswer from './OneAnswer'

const Answers = ({answers}) => {
  const location = useLocation();
  var pathname = location.pathname;
  return (
    <>
    {pathname==="/addAnswer" ?
     <>
     {answers == null ? <></> : answers.map((answer)=> <OneAnswer key={answer.id} answer={answer}/>)}
     </> 
     : <div className='answers'>
      {answers == null ? <></> : answers.map((answer)=> <OneAnswer key={answer.id} answer={answer}/>)}
      </div>
    }
    </>
  )
}

export default Answers
