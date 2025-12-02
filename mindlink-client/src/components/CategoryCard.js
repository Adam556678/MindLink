import React from 'react'
import { Card } from 'react-bootstrap'

import "../pages/Home.css"
export default function CategoryCard() {
  return (
    <Card  
    className='categoryCard shadow'
    style={{backgroundColor:''}}
    >
        <div className='categoryCardUp'>
            <i className="bi bi-flask fs-1"></i>
        </div>           
        <div className='categoryCardDown'>
            Science
        </div>
    </Card>
  )
}
