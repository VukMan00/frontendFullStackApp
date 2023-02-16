import React from 'react'
import { Link } from 'react-router-dom'

const OneTest = ({test, addViewTest}) => {
  return (
    <Link to="/viewTest" className='test' onClick={()=>addViewTest(test.id)}>
      <h3 className="name">{test.name}</h3>
      <h3 className="author">Autor: {test.author}</h3>
      <h3 className='maxPoints'>Maksimalan broj poena: {test.maxPoints}</h3>
    </Link>
  )
}

export default OneTest
