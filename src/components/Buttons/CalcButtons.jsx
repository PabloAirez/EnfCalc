import React from 'react'
import styles from './CalcButtons.module.css'

export default function CalcButtons({selected, onSelect}){
  return (
    <div className={styles.wrapper} role="tablist">
      <button className={`${styles.btn} ${selected==='mews'?styles.active:''}`} onClick={()=>onSelect('mews')} aria-pressed={selected==='mews'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        </svg>
        MEWS
      </button>
      <button className={`${styles.btn} ${selected==='braden'?styles.active:''}`} onClick={()=>onSelect('braden')} aria-pressed={selected==='braden'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
        Braden
      </button>
      <button className={`${styles.btn} ${selected==='morse'?styles.active:''}`} onClick={()=>onSelect('morse')} aria-pressed={selected==='morse'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M5 20c1-4 6-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
        Morse
      </button>
    </div>
  )
}
