import React, {useState} from 'react'
import styles from './Form.module.css'

export default function MorseForm({onSubmit}){
  const [values,setValues]=useState({history:false,secondary:false,ambulatory:'none',iv:false,gait:'normal',mental:'oriented'})
  const [errors,setErrors]=useState({})

  function handleChange(e){
    const {name,type,checked,value}=e.target
    setValues(v=>({...v,[name]: type==='checkbox'?checked:value}))
  }

  function submit(e){
    e.preventDefault();
    onSubmit(values)
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}><input type="checkbox" name="history" checked={values.history} onChange={handleChange}/> Histórico de queda</span></label>
        <label className={styles.field}><span className={styles.label}><input type="checkbox" name="secondary" checked={values.secondary} onChange={handleChange}/> Diagnóstico secundário</span></label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}>Apoio para marcha</span>
          <select className={styles.input} name="ambulatory" value={values.ambulatory} onChange={handleChange}>
            <option value="none">Nenhum</option>
            <option value="device">Bengala/auxílio</option>
            <option value="furniture">Móveis para apoio</option>
          </select>
        </label>
        <label className={styles.field}><span className={styles.label}><input type="checkbox" name="iv" checked={values.iv} onChange={handleChange}/> Sítio IV / Heparina</span></label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}><span className={styles.label}>Padrão de marcha</span>
          <select className={styles.input} name="gait" value={values.gait} onChange={handleChange}>
            <option value="normal">Normal</option>
            <option value="weak">Fraca</option>
            <option value="impaired">Comprometida</option>
          </select>
        </label>
        <label className={styles.field}><span className={styles.label}>Estado mental</span>
          <select className={styles.input} name="mental" value={values.mental} onChange={handleChange}>
            <option value="oriented">Orientado</option>
            <option value="overestimates">Superestima</option>
          </select>
        </label>
      </div>
      <button className={styles.submit} type="submit">Calcular Morse</button>
    </form>
  )
}
