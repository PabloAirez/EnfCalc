import React, {useState} from 'react'
import styles from './Form.module.css'

const defaultScores = {sensory:4,moisture:4,activity:4,mobility:4,nutrition:4,friction:3}

export default function BradenForm({onSubmit}){
  const [values,setValues]=useState(defaultScores)
  const [errors,setErrors]=useState({})

  function handleChange(e){
    const {name,value}=e.target
    setValues(v=>({...v,[name]:Number(value)}))
  }

  function validate(){
    const e={}
    // simple range check
    Object.entries(values).forEach(([k,val])=>{if(isNaN(val)||val<1) e[k]='Inválido'})
    setErrors(e)
    return Object.keys(e).length===0
  }

  function submit(ev){
    ev.preventDefault();
    if(!validate()) return
    onSubmit(values)
  }

  function renderSelect(name,min,max){
    const opts=[]
    const labels = {
      4: '4 — Sem comprometimento',
      3: '3 — Comprometimento leve',
      2: '2 — Comprometimento moderado',
      1: '1 — Comprometimento grave'
    }
    const frictionLabels = {
      3: '3 — Sem fricção/cisalhamento',
      2: '2 — Risco moderado',
      1: '1 — Alto risco'
    }
    for(let i=min;i<=max;i++){
      const text = name === 'friction' ? (frictionLabels[i] || i) : (labels[i] || i)
      opts.push(<option key={i} value={i}>{text}</option>)
    }
    return (
      <select className={styles.input} name={name} value={values[name]} onChange={handleChange}>{opts}</select>
    )
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}>Percepção sensorial</span>{renderSelect('sensory',1,4)}{errors.sensory && <div className={styles.error}>{errors.sensory}</div>}</label>
        <label className={styles.field}><span className={styles.label}>Umidade</span>{renderSelect('moisture',1,4)}{errors.moisture && <div className={styles.error}>{errors.moisture}</div>}</label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}>Atividade</span>{renderSelect('activity',1,4)}{errors.activity && <div className={styles.error}>{errors.activity}</div>}</label>
        <label className={styles.field}><span className={styles.label}>Mobilidade</span>{renderSelect('mobility',1,4)}{errors.mobility && <div className={styles.error}>{errors.mobility}</div>}</label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}>Nutrição</span>{renderSelect('nutrition',1,4)}{errors.nutrition && <div className={styles.error}>{errors.nutrition}</div>}</label>
        <label className={styles.field}><span className={styles.label}>Fricção / cisalhamento</span>{renderSelect('friction',1,3)}{errors.friction && <div className={styles.error}>{errors.friction}</div>}</label>
      </div>
      <button className={styles.submit} type="submit">Calcular Braden</button>
      <div className={styles.legend} aria-hidden>
        <div className={styles.legendTitle}>Legenda (1–4):</div>
        <div className={styles.legendGrid}>
          <div className={styles.legendItem}><strong>4</strong> — Sem comprometimento</div>
          <div className={styles.legendItem}><strong>3</strong> — Comprometimento leve</div>
          <div className={styles.legendItem}><strong>2</strong> — Comprometimento moderado</div>
          <div className={styles.legendItem}><strong>1</strong> — Comprometimento grave</div>
        </div>
        <div className={styles.legendTitle}>Fricção / Cisalhamento (1–3):</div>
        <div className={styles.legendGrid}>
          <div className={styles.legendItem}><strong>3</strong> — Sem fricção/cisalhamento</div>
          <div className={styles.legendItem}><strong>2</strong> — Risco moderado</div>
          <div className={styles.legendItem}><strong>1</strong> — Alto risco</div>
        </div>
      </div>
    </form>
  )
}
