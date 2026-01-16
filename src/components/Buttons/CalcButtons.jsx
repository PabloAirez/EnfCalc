import React from 'react'
import styles from './CalcButtons.module.css'

export default function CalcButtons({selected, onSelect}){
  return (
    <div className={styles.wrapper} role="tablist">
      <button className={`${styles.btn} ${selected==='mews'?styles.active:''}`} onClick={()=>onSelect('mews')}>MEWS</button>
      <button className={`${styles.btn} ${selected==='braden'?styles.active:''}`} onClick={()=>onSelect('braden')}>Braden</button>
      <button className={`${styles.btn} ${selected==='morse'?styles.active:''}`} onClick={()=>onSelect('morse')}>Morse</button>
    </div>
  )
}
