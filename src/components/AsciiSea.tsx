import { useEffect, useRef } from 'react'
import styles from './AsciiSea.module.css'

const DENSITY_CHARS = " .'`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"

function simpleNoise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t) +
    Math.sin(x * 0.01 - t) * Math.cos(y * 0.12) * 0.5
  )
}

export default function AsciiSea() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const charSize = 12
    let width = 0
    let height = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${charSize}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const colsCount = Math.ceil(width / charSize)
      const rowsCount = Math.ceil(height / charSize)

      for (let y = 0; y < rowsCount; y++) {
        // Skip top 40% for wave effect
        if (y < rowsCount * 0.4) continue

        for (let x = 0; x < colsCount; x++) {
          const posX = x * charSize
          const posY = y * charSize

          const dx = posX - mousePosRef.current.x
          const dy = posY - mousePosRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const normalizedY = (rowsCount - y) / rowsCount
          const noiseVal = simpleNoise(x, y, timeRef.current * 0.5)
          const mountainHeight =
            0.3 +
            Math.sin(x * 0.05 + timeRef.current * 0.1) * 0.1 +
            Math.cos(x * 0.2) * 0.05

          let char = ''
          let alpha = 0

          if (normalizedY < mountainHeight + noiseVal * 0.1) {
            const index = Math.floor(Math.abs(noiseVal) * DENSITY_CHARS.length)
            char = DENSITY_CHARS[index % DENSITY_CHARS.length]
            alpha = 1 - normalizedY * 2
          }

          if (dist < 150 && char) {
            const lensStrength = 1 - dist / 150
            if (Math.random() > 0.5) {
              char = Math.random() > 0.5 ? '0' : '1'
              ctx.fillStyle = `rgba(0, 0, 0, ${lensStrength})`
            } else {
              ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`
            }
            const shiftX = dist > 0 ? (dx / dist) * 10 * lensStrength : 0
            const shiftY = dist > 0 ? (dy / dist) * 10 * lensStrength : 0
            ctx.fillText(
              char,
              posX + charSize / 2 - shiftX,
              posY + charSize / 2 - shiftY
            )
          } else if (char) {
            ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`
            ctx.fillText(char, posX + charSize / 2, posY + charSize / 2)
          }
        }
      }

      timeRef.current += 0.01
      animFrameRef.current = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
