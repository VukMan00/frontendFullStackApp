
import React from 'react'
import { Link } from 'react-router-dom'

const OneTest = ({test, addViewTest,handleChange}) => {
  let role = window.sessionStorage.getItem('role');
  return (
    <div className='one-test' id={test.id}>
      {role==='admin' ? <input type="checkbox" name="select" className="select" id={"test"+test.id} value={test.id} onChange={()=>handleChange(test)}/> : <></>}
      <Link to="/viewTest" className='test' onClick={()=>addViewTest(test.id)}>
        <h3 className="name">{test.name}</h3>
        <h3 className="author">Autor: {test.author}</h3>
        <h3 className='maxPoints'>Maksimalan broj poena: {test.maxPoints}</h3>
      </Link>
    </div>
  )
}

export default OneTest
