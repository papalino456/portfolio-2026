import { motion } from 'framer-motion'
import {
  EDUCATION_TIMELINE,
  PERIOD_PLACEHOLDER,
  WORK_TIMELINE,
  type TimelineEntry,
} from '../data'
import styles from './Experience.module.css'

function TimelineColumn({
  label,
  items,
  delayOffset,
}: {
  label: string
  items: TimelineEntry[]
  delayOffset: number
}) {
  return (
    <div className={styles.column}>
      <p className={styles.columnLabel}>{label}</p>
      <div className={styles.timeline}>
        {items.map((item, i) => {
          const isPlaceholderPeriod = item.period === PERIOD_PLACEHOLDER
          return (
            <motion.div
              key={`${label}-${i}`}
              className={`${styles.entry} ${item.active ? styles.active : ''}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: (delayOffset + i) * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.left}>
                <span className={styles.period}>{item.period}</span>
                {item.active && !item.hideCurrentBadge && (
                  <span className={styles.badge}>Current</span>
                )}
              </div>

              <div className={styles.rail}>
                <div className={`${styles.dot} ${item.active ? styles.dotActive : ''}`} />
                {i < items.length - 1 && <div className={styles.line} />}
              </div>

              <div
                className={`${styles.right} ${isPlaceholderPeriod ? styles.rightNoPeriodMeta : ''}`}
                {...(!isPlaceholderPeriod ? { 'data-period': item.period } : {})}
              >
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="section-label">Experience</p>

        <div className={styles.columns}>
          <TimelineColumn label="Work" items={WORK_TIMELINE} delayOffset={0} />
          <TimelineColumn label="Education" items={EDUCATION_TIMELINE} delayOffset={WORK_TIMELINE.length} />
        </div>
      </div>
    </section>
  )
}
