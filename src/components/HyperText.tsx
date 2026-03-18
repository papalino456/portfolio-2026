import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from './HyperText.module.css'

interface HyperTextProps {
  text: string
  className?: string
  duration?: number
  delay?: number
  animateOnHover?: boolean
}

const LETTERS = '0123456789/*-_|[]{}()@#$%^&*()_+-='

export default function HyperText({
  text,
  className = '',
  duration = 1.5,
  delay = 0,
  animateOnHover = false,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimatedOnLoad = useRef(false)
  const isAnimatingRef = useRef(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  const runAnimation = useCallback((withDelay = false) => {
    if (isAnimatingRef.current) return () => {}

    isAnimatingRef.current = true
    const chars = text.split('')
    const totalDuration = duration * 1000

    let frame: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime - (withDelay ? delay * 1000 : 0)

      if (elapsed < 0) {
        frame = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min(elapsed / totalDuration, 1)
      const revealedCount = Math.floor(progress * chars.length)

      const newText = chars
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealedCount) return text[i]
          return LETTERS[Math.floor(Math.random() * LETTERS.length)]
        })
        .join('')

      setDisplayText(newText)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setDisplayText(text)
        isAnimatingRef.current = false
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [text, duration, delay])

  useEffect(() => {
    // Small delay to ensure container is rendered and measured
    const timer = setTimeout(() => {
      setIsVisible(true)
      if (!hasAnimatedOnLoad.current) {
        hasAnimatedOnLoad.current = true
        runAnimation(true)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [runAnimation])

  const handleMouseEnter = () => {
    if (!animateOnHover) return
    runAnimation(false)
  }

  return (
    <motion.span
      ref={containerRef}
      className={`${styles.hyperTextContainer} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, delay }}
      onMouseEnter={handleMouseEnter}
    >
      <span className={styles.hyperTextInvisible}>{text}</span>
      <span className={styles.hyperText}>{displayText}</span>
    </motion.span>
  )
}
