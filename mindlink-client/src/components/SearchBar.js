import React, { useContext } from 'react'
import "./SearchBar.css";
import { CategoryContext } from '../context/CategoryContext';

export default function SearchBar() {

  const {search} = useContext(CategoryContext);

  return (
    <div className='input-wrapper'>
        <i class="bi bi-search fs-7"></i>
        <input onChange={(e) => search(e.target.value)} />
    </div>
  )
}
