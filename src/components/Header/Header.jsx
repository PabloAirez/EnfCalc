import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  const bg = `url(https://images.unsplash.com/photo-1582719478184-6a4b6a9e1a3f?q=80&w=1600&auto=format&fit=crop)`
  return (
    <header className={styles.header} style={{backgroundImage: bg}}>
      <div className={styles.overlay}>
        <div className="container">
          <h1 className={styles.title}>EnfCalc</h1>
          <p className={styles.desc}>
            Ferramenta de cálculos de enfermagem (MEWS, Braden, Morse) atualizada para 2026.
            Use para triagem rápida e apoio à decisão clínica.
          </p>
        </div>
      </div>
    </header>
  )
}
