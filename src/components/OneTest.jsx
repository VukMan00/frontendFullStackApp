import React from 'react'

const OneTest = ({test}) => {
  return (
    <div className='test'>
      <h3 className="name">{test.name}</h3>
      <h3 className="author">Autor: {test.author}</h3>
      <h3 className='maxPoints'>Maksimalan broj poena: {test.maxPoints}</h3>
    </div>
  )
}

export default OneTest
