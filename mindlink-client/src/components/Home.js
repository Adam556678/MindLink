import React from 'react'
import { Card } from 'react-bootstrap'

export default function Home() {
  return (
    <div className='px-3 py-4'>
        <h2 className='mb-4'>
            Browse Categories
        </h2>

        <Card style={{
        width:'200px', 
        height:'180px', 
        backgroundColor:'#ffc0cb', 
        border:'none', 
        overflow:'hidden', 
        display:'flex', 
        }} 
        className='shadow position-relative'
        >
            <div style={{
                height: '75%',        
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <i className="bi bi-flask fs-1"></i>
            </div>           

            <div style={{
            width:'100%', 
            height:'25%', 
            backgroundColor:'#f3f6f8ff', 
            position:'absolute', 
            bottom:0, 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center', 
            fontSize:20}}>
                Science
            </div>
        </Card>

    </div>
  )
}
