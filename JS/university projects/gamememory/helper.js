export function xyCoord(card) {
  const td = card.closest('td')
  const x = td.cellIndex
  const tr = td.parentNode
  const y = tr.sectionRowIndex
  return { x, y }
}
