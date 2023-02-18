import React from 'react'
import OneQuestion from './OneQuestion'

const Questions = ({questions,test,addQuestionToTest,addAnswersToQuestion,handlePoints}) => {
  let brojac = 1;
  return (
    <div className='questions'>
      {questions == null ? <></> : questions.map((question)=> <OneQuestion key={question.id} brojac={brojac++} test={test} question={question} addQuestionToTest={addQuestionToTest} addAnswersToQuestion={addAnswersToQuestion} handlePoints={handlePoints} />)}
    </div>
  )
}

export default Questions
