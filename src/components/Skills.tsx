import { motion } from 'framer-motion'
import { SKILLS } from '../data'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-label">Technical Skills</p>

        <div className={styles.grid}>
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className={styles.category}>{group.category}</h3>
              <div className={styles.items}>
                {group.items.map((item) => (
                  <span key={item} className={styles.item}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
