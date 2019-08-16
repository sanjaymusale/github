import React from 'react';
import Loading from '../../assets/loading.svg'
import './loader.css'

export default function Loader({ nomargin, size }) {
  return (
    <div className={nomargin ? "loader" : "loader margin"}>
      <img src={Loading} alt="Loading..." height={size} width={size}></img>
      <h4>Processing...</h4>
    </div >
  )
}

Loader.defaultProps = {
  size: "100px"
}