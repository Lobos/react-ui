'use strict'

function getAngle (r, angle, x0, y0) {
  let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
  let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
  return [x1.toFixed(2), y1.toFixed(2)]
}

/**
 * @param {count} point's count
 * @param {r} radius
 * @param {angle} init angle
 * @param {x0} center point x
 * @param {y0} center point y
 */
export function getPositions (count, r = 50, angle = 0, x0 = r, y0 = r) {
  let pos = []
  let step = 360 / count
  for (let i = 0; i < count; i++) {
    pos.push(getAngle(r, step * i + angle, x0, y0))
  }
  return pos
}
