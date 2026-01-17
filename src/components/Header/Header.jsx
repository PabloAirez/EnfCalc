import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  const bg = `url(https://images.unsplash.com/photo-1582719478184-6a4b6a9e1a3f?q=80&w=1600&auto=format&fit=crop)`
  return (
    <header className={styles.header} style={{backgroundImage: bg}}>
      <div className={styles.overlay}>
        <div className="container" style={{display:'flex',alignItems:'center'}}>
          <div className={styles.iconBox} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2C10.343 2 9 3.343 9 5c0 .657.231 1.262.616 1.732C8.78 7.873 8 9.367 8 11v2H6a2 2 0 00-2 2v3a2 2 0 002 2h12a2 2 0 002-2v-3a2 2 0 00-2-2h-2v-2c0-1.633-.78-3.127-1.616-3.268A2.997 2.997 0 0015 5c0-1.657-1.343-3-3-3z" fill="var(--blue)"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>EnfCalc</h1>
            <p className={styles.desc}>
              Ferramenta de cálculos de enfermagem (MEWS, Braden, Morse) — atualizada para 2026.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
