import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Questions from './Questions';
import { Link } from 'react-router-dom'

const ViewTest = ({viewTest}) => {
  const[questions,setQuestions] = useState();
  useEffect(()=> {
    var q = [];
    if(questions==null){
        if(viewTest!=null){
            console.log("http://127.0.0.1:8000/api/tests/" + viewTest.id + "/questions");
            axios.get("http://127.0.0.1:8000/api/tests/" + viewTest.id + "/questions").then((res)=>{
                for(let i=0;i<res.data.length;i++){
                    q[i] = res.data[i][0];
                    console.log(res.data[i][0]);
                }
                setQuestions(q);
            }).catch((e)=>{
                console.log(e);
            });
        
        }
        else{
            console.log("GRESKA")
        }
    }
  });


  return (
    <div className="viewTest">
        <div className='test-info'>
            <div>
                {viewTest === null ? (
                    <h1>Test ne postoji</h1>
                    ) : (
                    <>
                    <h1 className='title'>{viewTest==null ? <></> : viewTest.name}</h1>
                    <h3 className='author'>Autor: {viewTest==null ? <></> : viewTest.author}</h3>
                    <h3 className='maxPoints'>Maksimalan broj poena: {viewTest==null ? <></> : viewTest.maxPoints}</h3>
                    <div>
                        <Questions test={viewTest} questions={questions}/>
                    </div>
                    </>
                )}
            </div>
            <Link to="/" className="startTest">Pokreni test</Link>
        </div>
    </div>
  )
}

export default ViewTest
