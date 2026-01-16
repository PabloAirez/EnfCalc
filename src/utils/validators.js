export function requiredNumber(val){
  if(val===undefined||val===null||val==='') return 'Obrigatório'
  if(Number.isNaN(Number(val))) return 'Deve ser numérico'
  return null
}
