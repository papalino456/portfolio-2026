import { useEffect, useRef } from 'react'

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
  flickerChance = 0.01,
  color = 'rgba(255, 255, 255, 0.4)',
  maxOpacity = 0.3,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInViewRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const gridParamsRef = useRef<{
    cols: number
    rows: number
    squares: Float32Array
    dpr: number
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    // Parse color once
    const parseColor = (c: string): [number, number, number] => {
      const temp = document.createElement('canvas')
      temp.width = temp.height = 1
      const tctx = temp.getContext('2d')
      if (!tctx) return [255, 255, 255]
      tctx.fillStyle = c
      tctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = tctx.getImageData(0, 0, 1, 1).data
      return [r, g, b]
    }
    const [r, g, b] = parseColor(color)

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR at 2
      const width = container.clientWidth
      const height = container.clientHeight

      if (!width || !height) return null

      // Only resize if dimensions actually changed
      const current = gridParamsRef.current
      if (current && current.width === width && current.height === height) {
        return current
      }

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const cols = Math.ceil(width / (squareSize + gridGap))
      const rows = Math.ceil(height / (squareSize + gridGap))
      const squares = new Float32Array(cols * rows)

      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      const params = { cols, rows, squares, dpr, width, height }
      gridParamsRef.current = params
      return params
    }

    const drawGrid = () => {
      const params = gridParamsRef.current
      if (!params || !ctx) return

      const { cols, rows, squares, dpr } = params
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`

      const step = (squareSize + gridGap) * dpr
      const size = squareSize * dpr

      // Batch by opacity to minimize state changes
      for (let pass = 0; pass < 3; pass++) {
        const minOp = pass === 0 ? 0.2 : pass === 1 ? 0.1 : 0.01
        const maxOp = pass === 0 ? 1 : pass === 1 ? 0.2 : 0.1

        let hasAny = false
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const op = squares[j * cols + i]
            if (op > minOp && op <= maxOp) {
              if (!hasAny) {
                ctx.globalAlpha = op
                hasAny = true
              }
              ctx.fillRect(i * step, j * step, size, size)
            }
          }
        }
      }

      ctx.globalAlpha = 1
    }

    const updateAndDraw = () => {
      const params = gridParamsRef.current
      if (!params) return

      // Update random squares
      const { squares } = params
      const updateCount = Math.max(1, Math.floor(squares.length * flickerChance))

      for (let k = 0; k < updateCount; k++) {
        const idx = (Math.random() * squares.length) | 0
        squares[idx] = Math.random() * maxOpacity
      }

      drawGrid()

      // Schedule next update
      if (isInViewRef.current) {
        timeoutId = setTimeout(updateAndDraw, 500)
      }
    }

    const startAnimation = () => {
      if (rafIdRef.current === null) {
        updateAndDraw()
      }
    }

    const stopAnimation = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      rafIdRef.current = null
    }

    // Initial setup
    setupCanvas()
    drawGrid()

    // Resize observer - debounced
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setupCanvas()
        drawGrid()
      }, 100)
    })
    resizeObserver.observe(container)

    // Intersection observer
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0, rootMargin: '50px' }
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
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (resizeObserver) resizeObserver.disconnect()
      if (intersectionObserver) intersectionObserver.disconnect()
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
