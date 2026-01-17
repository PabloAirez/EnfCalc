import React, {useState} from 'react'
import Header from './components/Header/Header'
import CalcButtons from './components/Buttons/CalcButtons'
import MEWSForm from './components/Forms/MEWSForm'
import BradenForm from './components/Forms/BradenForm'
import MorseForm from './components/Forms/MorseForm'
import Results from './components/Results/Results'
import Modal from './components/Modal/Modal'
import assessPatient from './utils/assessments'
import './App.css'

export default function App(){
  const [selected,setSelected]=useState('mews')
  const [result,setResult]=useState(null)

  function handleSelect(key){
    setSelected(key)
    setResult(null)
  }

  function handleMewsSubmit(values){
    const res = assessPatient({mews: values})
    setResult(res)
  }

  function handleBradenSubmit(values){
    const res = assessPatient({braden: values})
    setResult(res)
  }

  function handleMorseSubmit(values){
    const res = assessPatient({morse: values})
    setResult(res)
  }

  return (
    <main className="container app-grid">
      <div>
        <Header />
        <div className="card" style={{marginTop:12}}>
          <div className="header-area">
            <div style={{flex:1}}>
              <CalcButtons selected={selected} onSelect={handleSelect} />
            </div>
          </div>

          <div style={{marginTop:12}}>
            {selected==='mews' && <MEWSForm onSubmit={handleMewsSubmit} />}
            {selected==='braden' && <BradenForm onSubmit={handleBradenSubmit} />}
            {selected==='morse' && <MorseForm onSubmit={handleMorseSubmit} />}
          </div>
        </div>
      </div>

      {result && (
        <Modal onClose={() => setResult(null)} title="Resultado da Avaliação">
          {selected === 'mews' && (
            <Results score={result.score_mews} level={result.classificacao_mews} diagnostico={result.diagnostico_mews} orientacoes={result.orientacoes_mews} />
          )}
          {selected === 'braden' && (
            <Results score={result.score_braden} level={result.classificacao_braden} diagnostico={result.diagnostico_braden} orientacoes={result.orientacoes_braden} />
          )}
          {selected === 'morse' && (
            <Results score={result.score_morse} level={result.classificacao_morse} diagnostico={result.diagnostico_morse} orientacoes={result.orientacoes_morse} />
          )}
        </Modal>
      )}
    </main>
  )
}
