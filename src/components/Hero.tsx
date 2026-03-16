import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { IconCloud } from './IconCloud'
import styles from './Hero.module.css'

const ease = [0.16, 1, 0.3, 1] as const

const ICON_IMAGES = [
  'https://img.icons8.com/fluency/96/python.png',
  'https://img.icons8.com/fluency/96/c-plus-plus-logo.png',
  'https://img.icons8.com/fluency/96/typescript.png',
  'https://img.icons8.com/fluency/96/matlab.png',
  'https://img.icons8.com/fluency/96/pytorch.png',
  'https://img.icons8.com/fluency/96/opencv.png',
  'https://img.icons8.com/fluency/96/artificial-intelligence.png',
  'https://img.icons8.com/fluency/96/robot.png',
  'https://img.icons8.com/fluency/96/raspberry-pi-zero.png',
  'https://img.icons8.com/fluency/96/arduino.png',
  'https://img.icons8.com/fluency/96/docker.png',
  'https://img.icons8.com/fluency/96/git.png',
  'https://img.icons8.com/fluency/96/linux-client.png',
  'https://img.icons8.com/fluency/96/node-js.png',
  'https://img.icons8.com/fluency/96/vite.png',
  'https://img.icons8.com/fluency/96/nextjs.png',
  'https://img.icons8.com/fluency/96/brain.png',
  'https://img.icons8.com/fluency/96/console.png',
  'https://img.icons8.com/fluency/96/workflow.png',
  'https://img.icons8.com/fluency/96/code.png',
]

const line = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease },
  }),
}

export default function Hero() {
  const images = useMemo(() => ICON_IMAGES, [])

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <motion.p
              className={styles.eyebrow}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              AI R&D Engineer at Siemens
            </motion.p>

            <h1 className={styles.heading}>
              <motion.span className={styles.line} custom={1} initial="hidden" animate="visible" variants={line}>
                Engineering
              </motion.span>
              <motion.span className={`${styles.line} ${styles.italic}`} custom={2} initial="hidden" animate="visible" variants={line}>
                intelligence
              </motion.span>
              <motion.span className={styles.line} custom={3} initial="hidden" animate="visible" variants={line}>
                into machines
              </motion.span>
            </h1>

            <motion.p
              className={styles.sub}
              custom={4}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              Mechatronics engineer building at the intersection of robotics,
              computer vision, and machine learning. Currently developing
              ML&nbsp;pipelines and novel kinematics methods at Siemens&nbsp;Munich.
            </motion.p>

            <motion.div
              className={styles.actions}
              custom={5}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              <a href="#work" className={styles.btnPrimary}>
                View work
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <IconCloud images={images} size={450} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
