import React, {useState} from 'react'
import styles from './Form.module.css'

export default function MEWSForm({onSubmit}){
  const [values,setValues]=useState({rr:'',hr:'',sbp:'',temp:'',avpu:'A'})
  const [errors,setErrors]=useState({})

  function handleChange(e){
    const {name,value,type,checked}=e.target
    setValues(v=>({...v,[name]: type==='checkbox'?checked:value}))
  }

  function validate(){
    const e={}
    if(!values.rr) e.rr='Obrigatório'
    if(!values.hr) e.hr='Obrigatório'
    if(!values.sbp) e.sbp='Obrigatório'
    if(!values.temp) e.temp='Obrigatório'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function submit(e){
    e.preventDefault()
    if(!validate()) return
    onSubmit({
      respiratoryRate: Number(values.rr),
      heartRate: Number(values.hr),
      systolicBP: Number(values.sbp),
      temperature: Number(values.temp),
      avpu: values.avpu
    })
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Respiração (rpm)</span>
          <input className={styles.input} name="rr" value={values.rr} onChange={handleChange} inputMode="numeric" />
          {errors.rr && <div className={styles.error}>{errors.rr}</div>}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>FC (bpm)</span>
          <input className={styles.input} name="hr" value={values.hr} onChange={handleChange} inputMode="numeric" />
          {errors.hr && <div className={styles.error}>{errors.hr}</div>}
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>PAS (mmHg)</span>
          <input className={styles.input} name="sbp" value={values.sbp} onChange={handleChange} inputMode="numeric" />
          {errors.sbp && <div className={styles.error}>{errors.sbp}</div>}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Temperatura (°C)</span>
          <input className={styles.input} name="temp" value={values.temp} onChange={handleChange} inputMode="numeric" />
          {errors.temp && <div className={styles.error}>{errors.temp}</div>}
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Nível de consciência (AVPU)</span>
          <select className={styles.input} name="avpu" value={values.avpu} onChange={handleChange}>
            <option value="A">Alerta</option>
            <option value="V">Resposta à Voz</option>
            <option value="P">Resposta à Dor</option>
            <option value="U">Inconsciente</option>
          </select>
        </label>
      </div>
      <button className={styles.submit} type="submit">Calcular MEWS</button>
    </form>
  )
}
