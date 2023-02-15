import React from 'react'
import OneQuestion from './OneQuestion'

const Questions = ({questions}) => {
  let brojac = 1;
  return (
    <div className='questions'>
      {questions == null ? <></> : questions.map((question)=> <OneQuestion key={question.id} brojac={brojac++} question={question} />)}
    </div>
  )
}

export default Questions
