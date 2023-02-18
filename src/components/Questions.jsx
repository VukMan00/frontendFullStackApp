
import React from 'react'
import OneQuestion from './OneQuestion'

const Questions = ({questions,test}) => {
  let brojac = 1;
  return (
    <div className='questions'>
      {questions == null ? <></> : questions.map((question)=> <OneQuestion key={question.id} brojac={brojac++} test={test} question={question} />)}
    </div>
  )
}

export default Questions

