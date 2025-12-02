import React from 'react'
import { Card } from 'react-bootstrap'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants/CategoriesConstants'

import "../pages/Home.css"
export default function CategoryCard({category, index}) {
  return (
    <Card  
    className='categoryCard shadow'
    style={{backgroundColor:CATEGORY_COLORS[index % CATEGORY_COLORS.length]}}
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
