import React, {useEffect} from 'react'
import styles from './Modal.module.css'

export default function Modal({children, onClose, title}){
  useEffect(()=>{
    function onKey(e){
      if(e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return ()=>{
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  },[onClose])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title || 'Resultado'}>
      <div className={styles.sheet}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button className={styles.close} onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
