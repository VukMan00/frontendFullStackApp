import React from 'react'

const OneAnswer = ({answer}) => {
  return (
    <div className='answer'>
      <input type="checkbox" id="answerCB" name="answerCB" value={answer.content} />
      <label for="answerCB">{answer.content}</label>
    </div>
  )
}

export default OneAnswer
