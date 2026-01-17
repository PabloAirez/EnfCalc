import React from 'react'
import styles from './Results.module.css'

export default function Results({score,level,notes,diagnostico,orientacoes}){
  const color = level && (level.includes('Alto') || level === 'Alto')? 'var(--red)' : level && (level.includes('Moderado')|| level === 'Moderado')? 'var(--yellow)' : 'var(--green)'
  const riskClass = level && (level.includes('Alto') || level === 'Alto')? styles['risk-high'] : level && (level.includes('Moderado')|| level === 'Moderado')? styles['risk-moderate'] : styles['risk-low']
  return (
    <section className={styles.wrap} aria-live="polite">
      <div className={`${styles.card} ${riskClass}`}>
        <div className={styles.row}>
          <div>
            <div className={styles.label}>Pontuação</div>
            <div className={styles.score} style={{background:color}}>{score}</div>
          </div>
          <div>
            <div className={styles.label}>Nível de risco</div>
            <div className={styles.level}>{level}</div>
          </div>
        </div>
        {diagnostico && <p className={styles.notes}><strong>Diagnóstico:</strong> {diagnostico}</p>}
        {orientacoes && orientacoes.length > 0 && (
          <div style={{marginTop:8}}>
            <div className={styles.label}>Orientações clínicas</div>
            <ul>
              {orientacoes.map((o,i)=>(<li key={i}>{o}</li>))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
