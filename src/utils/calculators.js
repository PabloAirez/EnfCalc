export function calculateMews({respiratoryRate,heartRate,systolicBP,temperature,avpu}){
  let score=0
  // respiration
  if(respiratoryRate<=8) score+=3
  else if(respiratoryRate<=14) score+=0
  else if(respiratoryRate<=20) score+=1
  else if(respiratoryRate<=29) score+=2
  else score+=3

  // heart rate
  if(heartRate<=40) score+=2
  else if(heartRate<=50) score+=1
  else if(heartRate<=100) score+=0
  else if(heartRate<=110) score+=1
  else if(heartRate<=129) score+=2
  else score+=3

  // systolic BP
  if(systolicBP<=70) score+=3
  else if(systolicBP<=80) score+=2
  else if(systolicBP<=100) score+=1
  else if(systolicBP<=199) score+=0
  else score+=2

  // temp
  if(temperature<=35) score+=2
  else if(temperature<38.5) score+=0
  else score+=2

  // AVPU
  const avpuMap={A:0,V:1,P:2,U:3}
  score += avpuMap[avpu] ?? 0

  let level='Baixo'
  if(score>=7) level='Alto'
  else if(score>=5) level='Moderado'

  return {score,level}
}

export function calculateBraden(values){
  const total = Object.values(values).reduce((s,v)=>s+Number(v),0)
  let level='Baixo'
  if(total<=9) level='Muito Alto'
  else if(total<=12) level='Alto'
  else if(total<=14) level='Moderado'
  else if(total<=18) level='Leve'
  else level='Baixo'
  return {score: total, level}
}

export function calculateMorse(values){
  let score = 0
  if(values.history) score +=25
  if(values.secondary) score +=15
  if(values.ambulatory === 'device') score +=15
  if(values.ambulatory === 'furniture') score +=30
  if(values.iv) score +=20
  if(values.gait === 'weak') score +=10
  if(values.gait === 'impaired') score +=20
  if(values.mental === 'overestimates') score +=15

  let level='Baixo'
  if(score>=45) level='Alto'
  else if(score>=25) level='Moderado'

  return {score,level}
}
