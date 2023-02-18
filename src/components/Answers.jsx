
import React from 'react'
import OneAnswer from './OneAnswer'

const Answers = ({answers}) => {
  return (
    <div className='answers'>
      {answers == null ? <></> : answers.map((answer)=> <OneAnswer key={answer.id} answer={answer}/>)}
    </div>
  )
}

export default Answers


