
import React from 'react'
import { useLocation } from 'react-router-dom';

const OneAnswer = ({answer}) => {
  const location = useLocation();
  var pathname = location.pathname;
  if(pathname!=='/addAnswer'){
    return (
      <div className='oneAnswer' id={"answer"+answer.id}>
        <input type="checkbox" id="answerCB" name="answerCB" className='selectOneAnswer' value={answer.id} />
        <label htmlFor="answerCB">{answer.content}</label>
      </div>
    )
  }
  else{
    return (
      <div className='one-answer' id={"answer"+answer.id}>
        <input type="checkbox" id="answerCB" name="answerCB" className='selectOneAnswer' value={answer.id} />
        <div className='oneAnswerView'>
          <h3>{answer.content}</h3>
          <h3>Resenje</h3>
          <div>
            <label htmlFor='trueAnswerView'>Tacno</label>
            <input type="checkbox" name="trueAnswerView" disabled="disabled" checked/>
            <label htmlFor='falseAnswerView'>Netacno</label>
            <input type="checkbox" name="falseAnswerView" disabled="disabled"/>
          </div>
        </div>
    </div>
    )
  }
}

export default OneAnswer
