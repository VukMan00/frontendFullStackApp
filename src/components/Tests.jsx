import React from 'react'
import OneTest from './OneTest'

const Tests = ({tests, addViewTest,handleChange}) => {
  return (
    <div className='test-container'>
      <h3>Trenutno dostupni testovi</h3>
      <div className='tests'>
        {tests == null ? <></> : tests.map((test)=> <OneTest key={test.id} test={test} addViewTest={addViewTest} handleChange={handleChange}/>)}
      </div>
    </div>
  )
}

export default Tests
