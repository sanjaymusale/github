import React from 'react';
import Loading from '../../assets/loading.svg'
import './loader.css'

export default function Loader() {
  return (
    <div className="loader">
      <img src={Loading} alt="Loading..."></img>
    </div>
  )
}