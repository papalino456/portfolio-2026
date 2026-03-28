import { motion } from 'framer-motion'
import { TIMELINE } from '../data'
import styles from './Experience.module.css'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="section-label">Experience & Education</p>

        <div className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.entry} ${item.active ? styles.active : ''}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.left}>
                <span className={styles.period}>{item.period}</span>
                {item.active && !(item as { hideCurrentBadge?: boolean }).hideCurrentBadge && (
                  <span className={styles.badge}>Current</span>
                )}
              </div>

              <div className={styles.rail}>
                <div className={`${styles.dot} ${item.active ? styles.dotActive : ''}`} />
                {i < TIMELINE.length - 1 && <div className={styles.line} />}
              </div>

              <div className={styles.right}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
