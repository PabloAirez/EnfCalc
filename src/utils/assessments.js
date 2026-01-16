/**
 * assessments.js
 * Funções para avaliar paciente: MEWS, Braden e Morse
 * - Recebe um objeto com os dados clínicos
 * - Retorna scores, classificações e orientações clínicas
 *
 * Projetado para uso em sistemas hospitalares: código claro, fácil manutenção.
 */

import {calculateMews as _calcMews, calculateBraden as _calcBraden, calculateMorse as _calcMorse} from './calculators'

// Regras de classificação (conforme especificado)
const MEWS_THRESHOLDS = {lowMax: 2, moderateMax: 4}

const BRADEN_RANGES = [
  {min: 19, max: 23, classification: 'Sem risco'},
  {min: 15, max: 18, classification: 'Risco leve'},
  {min: 13, max: 14, classification: 'Risco moderado'},
  {min: 10, max: 12, classification: 'Risco alto'},
  {min: 0, max: 9, classification: 'Risco muito alto'}
]

const MORSE_RANGES = [
  {min: 0, max: 24, classification: 'Baixo risco de queda'},
  {min: 25, max: 44, classification: 'Risco moderado'},
  {min: 45, max: 125, classification: 'Alto risco de queda'}
]

// Orientações (objetivas e acionáveis)
const ORIENTATIONS = {
  mews: {
    low: [
      'Monitorização de rotina: sinais vitais conforme protocolo local.',
      'Reavaliar frequentemente conforme rotina do setor.'
    ],
    moderate: [
      'Vigilância aumentada: monitorização mais frequente (ex.: cada 1–2h).',
      'Reavaliar condições clínicas; considerar investigação de causa.',
      'Comunicar equipe de enfermagem sênior.'
    ],
    high: [
      'Alerta clínico imediato: notificar equipe médica/Resposta Rápida.',
      'Iniciar monitorização contínua quando disponível (ECG/oximetria).',
      'Reavaliar intervenções e considerar transferência para nível de cuidado superior.'
    ]
  },
  braden: {
    'Sem risco': [
      'Continuar avaliação periódica da pele e higiene.',
      'Manter mobilização conforme prescrições.'
    ],
    'Risco leve': [
      'Reavaliar pele diariamente e documentar alterações.',
      'Iniciar medidas básicas de prevenção (mudança de posição regular).'
    ],
    'Risco moderado': [
      'Plano de prevenção de úlcera por pressão: dispositivo de alívio (colchão/almofadas).',
      'Revisar nutrição e hidratação; envolvimento de equipe multiprofissional.'
    ],
    'Risco alto': [
      'Implementar medidas intensivas de prevenção: revezamento de decúbito a cada 2 horas, superfícies de apoio especializadas.',
      'Avaliar necessidade de consulta com fisioterapia e nutrição.'
    ],
    'Risco muito alto': [
      'Intervenção imediata: protocolo de prevenção integral, monitorização da pele a cada turno.',
      'Documentar plano e notificar coordenação de enfermagem.'
    ]
  },
  morse: {
    'Baixo risco de queda': [
      'Orientação e supervisão de rotina; manter ambiente sem obstáculos.'
    ],
    'Risco moderado': [
      'Medidas preventivas: campainha próxima, auxílio para deambulação, revisão de medicação que aumente risco.'
    ],
    'Alto risco de queda': [
      'Plano de prevenção de quedas intensivo: supervisão contínua, dispositivos de proteção e restrição de mobilidade conforme política local.',
      'Notificar equipe médica e ajustar medicações quando indicado.'
    ]
  }
}

/**
 * Valida e lança erro se dado requerido estiver faltando ou inválido.
 */
function requireNumber(value, name) {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Campo obrigatório ausente: ${name}`)
  }
  const n = Number(value)
  if (Number.isNaN(n)) {
    throw new Error(`Campo numérico inválido: ${name}`)
  }
  return n
}

function classifyBraden(total) {
  for (const r of BRADEN_RANGES) {
    if (total >= r.min && total <= r.max) return r.classification
  }
  return 'Indeterminado'
}

function classifyMorse(total) {
  for (const r of MORSE_RANGES) {
    if (total >= r.min && total <= r.max) return r.classification
  }
  return 'Indeterminado'
}

// Gera um diagnóstico curto e legível para MEWS com base nos parâmetros
function generateMewsDiagnosis({respiratoryRate, heartRate, systolicBP, temperature, avpu}, score, classification) {
  const issues = []
  if (systolicBP <= 90) issues.push('sinais de hipotensão')
  if (heartRate >= 130) issues.push('taquicardia grave')
  else if (heartRate <= 40) issues.push('bradicardia significativa')
  if (respiratoryRate >= 25) issues.push('insuficiência respiratória/tacipneia')
  if (temperature >= 38.5) issues.push('hipertermia')
  if (temperature <= 35) issues.push('hipotermia')
  if (avpu && avpu !== 'A') issues.push('comprometimento do nível de consciência')

  const issueText = issues.length ? `Prováveis: ${issues.join(', ')}.` : 'Nenhuma alteração clínica evidente além dos sinais medidos.'
  return `Classificação: ${classification}. Pontuação MEWS = ${score}. ${issueText}`
}

// Gera diagnóstico para Braden destacando áreas com pontuação baixa
function generateBradenDiagnosis(values, score, classification) {
  const labelMap = {
    sensory: 'Percepção sensorial',
    moisture: 'Umidade',
    activity: 'Atividade',
    mobility: 'Mobilidade',
    nutrition: 'Nutrição',
    friction: 'Fricção / cisalhamento'
  }
  const lowFactors = Object.entries(values).filter(([,v]) => Number(v) <= 2).map(([k]) => labelMap[k] || k)
  const factorText = lowFactors.length ? `Fatores contribuintes: ${lowFactors.join(', ')}.` : ''
  return `Classificação: ${classification}. Pontuação Braden = ${score}. ${factorText}`
}

// Gera diagnóstico para Morse com fatores de risco destacados
function generateMorseDiagnosis(inputs, score, classification) {
  const factors = []
  if (inputs.history === 25 || inputs.history === true) factors.push('histórico de quedas')
  if (inputs.secondary === 15 || inputs.secondary === true) factors.push('diagnóstico secundário')
  if (inputs.ambulatory === 'device' || Number(inputs.ambulatory) === 15) factors.push('uso de dispositivo para deambulação')
  if (inputs.ambulatory === 'furniture' || Number(inputs.ambulatory) === 30) factors.push('apoio em móveis para deambulação')
  if (inputs.iv === true || Number(inputs.iv) === 20) factors.push('terapia endovenosa')
  if (inputs.gait === 'weak' || Number(inputs.gait) === 10) factors.push('padrão de marcha fraco')
  if (inputs.gait === 'impaired' || Number(inputs.gait) === 20) factors.push('padrão de marcha comprometido')
  if (inputs.mental === 'overestimates' || Number(inputs.mental) === 15) factors.push('estado mental alterado')

  const factorText = factors.length ? `Fatores de risco: ${factors.join(', ')}.` : ''
  return `Classificação: ${classification}. Pontuação Morse = ${score}. ${factorText}`
}

/**
 * Principal função pública: recebe dados clínicos e retorna avaliações estruturadas.
 * Param clinical: objeto contendo chaves para MEWS, BRADEN e MORSE conforme especificado.
 */
export function assessPatient(clinical) {
  if (!clinical || typeof clinical !== 'object') throw new Error('Parâmetro clinical obrigatório')

  // We'll compute each scale only when its inputs are present to allow partial calls.
  const out = {}

  const hasMewsInput = Boolean(clinical.mews) || ['systolicBP','sbp','heartRate','hr','respiratoryRate','rr','temperature','temp','avpu'].some(k=>k in clinical)
  if (hasMewsInput) {
    const mewsInput = clinical.mews || clinical
    const systolicBP = requireNumber(mewsInput.systolicBP ?? mewsInput.sbp, 'MEWS.systolicBP')
    const heartRate = requireNumber(mewsInput.heartRate ?? mewsInput.hr, 'MEWS.heartRate')
    const respiratoryRate = requireNumber(mewsInput.respiratoryRate ?? mewsInput.rr, 'MEWS.respiratoryRate')
    const temperature = requireNumber(mewsInput.temperature ?? mewsInput.temp, 'MEWS.temperature')
    const avpu = (mewsInput.avpu || 'A').toString().toUpperCase()

    const {score} = _calcMews({respiratoryRate,heartRate,systolicBP,temperature,avpu})
    const score_mews = score
    let classificacao_mews = 'Baixo'
    if (score_mews <= MEWS_THRESHOLDS.lowMax) classificacao_mews = 'Baixo'
    else if (score_mews <= MEWS_THRESHOLDS.moderateMax) classificacao_mews = 'Moderado'
    else classificacao_mews = 'Alto'

    out.score_mews = score_mews
    out.classificacao_mews = classificacao_mews
    out.orientacoes_mews = (classificacao_mews === 'Baixo') ? ORIENTATIONS.mews.low
      : (classificacao_mews === 'Moderado') ? ORIENTATIONS.mews.moderate
      : ORIENTATIONS.mews.high
    out.diagnostico_mews = generateMewsDiagnosis({respiratoryRate,heartRate,systolicBP,temperature,avpu}, score_mews, classificacao_mews)
  }

  const hasBradenInput = Boolean(clinical.braden) || ['sensory','moisture','activity','mobility','nutrition','friction'].some(k=>k in clinical)
  if (hasBradenInput) {
    const bradenInput = clinical.braden || clinical
    const sensory = requireNumber(bradenInput.sensory, 'BRADEN.sensory')
    const moisture = requireNumber(bradenInput.moisture, 'BRADEN.moisture')
    const activity = requireNumber(bradenInput.activity, 'BRADEN.activity')
    const mobility = requireNumber(bradenInput.mobility, 'BRADEN.mobility')
    const nutrition = requireNumber(bradenInput.nutrition, 'BRADEN.nutrition')
    const friction = requireNumber(bradenInput.friction, 'BRADEN.friction')

    const bradenValues = {sensory,moisture,activity,mobility,nutrition,friction}
    const score_braden = Object.values(bradenValues).reduce((s,v)=>s+v,0)
    const classificacao_braden = classifyBraden(score_braden)
    out.score_braden = score_braden
    out.classificacao_braden = classificacao_braden
    out.orientacoes_braden = ORIENTATIONS.braden[classificacao_braden] || []
    out.diagnostico_braden = generateBradenDiagnosis(bradenValues, score_braden, classificacao_braden)
  }

  const hasMorseInput = Boolean(clinical.morse) || ['history','secondary','ambulatory','iv','gait','mental'].some(k=>k in clinical)
  if (hasMorseInput) {
    const morseInput = clinical.morse || clinical
    const history = (morseInput.history === true || morseInput.history === 25 || Number(morseInput.history) === 25) ? 25 : 0
    const secondary = (morseInput.secondary === true || morseInput.secondary === 15 || Number(morseInput.secondary) === 15) ? 15 : 0
    let ambulatory = 0
    if (morseInput.ambulatory === 'device' || morseInput.ambulatory === 15 || Number(morseInput.ambulatory) === 15) ambulatory = 15
    if (morseInput.ambulatory === 'furniture' || morseInput.ambulatory === 30 || Number(morseInput.ambulatory) === 30) ambulatory = 30
    const iv = (morseInput.iv === true || morseInput.iv === 20 || Number(morseInput.iv) === 20) ? 20 : 0
    let gait = 0
    if (morseInput.gait === 'weak' || Number(morseInput.gait) === 10) gait = 10
    if (morseInput.gait === 'impaired' || Number(morseInput.gait) === 20) gait = 20
    const mental = (morseInput.mental === 'overestimates' || morseInput.mental === 15 || Number(morseInput.mental) === 15) ? 15 : 0

    const score_morse = history + secondary + ambulatory + iv + gait + mental
    const classificacao_morse = classifyMorse(score_morse)
    out.score_morse = score_morse
    out.classificacao_morse = classificacao_morse
    out.orientacoes_morse = ORIENTATIONS.morse[classificacao_morse] || []
    out.diagnostico_morse = generateMorseDiagnosis(morseInput, score_morse, classificacao_morse)
  }

  return out
}

export default assessPatient
