import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants/CategoriesConstants'

import "../pages/Home.css"
import { useNavigate } from 'react-router-dom'

export default function CategoryCard({category, index}) {

  const navigate = useNavigate();

  return (
    <Card  
    className='categoryCard shadow'
    style={{backgroundColor:CATEGORY_COLORS[index % CATEGORY_COLORS.length]}}
    onClick={() => {
      navigate(`/category/${category.id}`);
    }}
    >
        <div className='categoryCardUp'>
            <i className={CATEGORY_ICONS[category.name] + " fs-1"}></i>
        </div>           
        <div className='categoryCardDown'>
            {category.name}
        </div>
    </Card>
  )
}
