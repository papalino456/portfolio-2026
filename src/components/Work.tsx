import { motion } from 'framer-motion'
import { PROJECTS } from '../data'
import styles from './Work.module.css'

const ease = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease },
  }),
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <p className="section-label">Selected Work</p>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className={styles.imageWrap}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderId}>{p.id}</span>
                  <span className={styles.placeholderTitle}>{p.title}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardId}>{p.id}</span>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                </div>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
