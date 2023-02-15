import React from 'react'
import Answers from './Answers'

const OneQuestion = ({question,brojac}) => {
  return (
    <div className='oneQuestion'>
      <h3>{brojac}. {question.content}</h3>
      <div>
        <Answers answers={question.answer}/>
      </div>
      <h3></h3>
    </div>
  )
}

export default OneQuestion
