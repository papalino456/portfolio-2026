import { useEffect, useRef, useState } from 'react'

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  maxOpacity?: number
  className?: string
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgba(255, 255, 255, 0.4)',
  maxOpacity = 0.3,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInViewRef = useRef(false)
  const [, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null

    let gridParams: {
      cols: number
      rows: number
      squares: Float32Array
      dpr: number
    } | null = null

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = container.clientWidth
      const height = container.clientHeight

      if (!width || !height) return null

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const cols = Math.ceil(width / (squareSize + gridGap))
      const rows = Math.ceil(height / (squareSize + gridGap))
      const squares = new Float32Array(cols * rows)

      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      return { cols, rows, squares, dpr }
    }

    const updateSquares = (deltaTime: number) => {
      if (!gridParams) return
      for (let i = 0; i < gridParams.squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          gridParams.squares[i] = Math.random() * maxOpacity
        }
      }
    }

    const drawGrid = () => {
      if (!gridParams || !ctx) return

      const { cols, rows, squares, dpr } = gridParams
      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      const toRGBA = (color: string) => {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = tempCanvas.height = 1
        const tempCtx = tempCanvas.getContext('2d')
        if (!tempCtx) return 'rgba(255, 255, 255,'
        tempCtx.fillStyle = color
        tempCtx.fillRect(0, 0, 1, 1)
        const [r, g, b] = Array.from(tempCtx.getImageData(0, 0, 1, 1).data)
        return `rgba(${r}, ${g}, ${b},`
      }
      const memoizedColor = toRGBA(color)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          if (opacity <= 0.01) continue
          ctx.fillStyle = `${memoizedColor}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    }

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInViewRef.current) {
        animationFrameId = null
        return
      }

      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      updateSquares(deltaTime)
      drawGrid()
      animationFrameId = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!animationFrameId) {
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    const stopAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }

    // Initial setup
    gridParams = setupCanvas()
    if (gridParams) {
      drawGrid()
      setIsReady(true)
    }

    // Setup observers
    resizeObserver = new ResizeObserver(() => {
      gridParams = setupCanvas()
      if (gridParams) {
        drawGrid()
      }
    })
    resizeObserver.observe(container)

    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvas)

    // Check initial visibility
    const rect = canvas.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isInViewRef.current = true
      startAnimation()
    }

    return () => {
      stopAnimation()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, [squareSize, gridGap, flickerChance, color, maxOpacity])

  return (
    <div ref={containerRef} className={`h-full w-full ${className || ''}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
