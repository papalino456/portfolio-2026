import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface'
import styles from './Activity.module.css'

const GITHUB_USERNAME = 'papalino456'
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`

type Contribution = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type ApiResponse = {
  total: Record<string, number>
  contributions: Contribution[]
}

function buildGrid(contributions: Contribution[]): (Contribution | null)[][] {
  const today = new Date().toISOString().slice(0, 10)
  const relevant = contributions.filter((d) => d.date <= today)

  const weeks: (Contribution | null)[][] = []
  let currentWeek: (Contribution | null)[] = []

  if (relevant.length > 0) {
    const firstDow = new Date(relevant[0].date).getDay()
    for (let i = 0; i < firstDow; i++) currentWeek.push(null)
  }

  for (const day of relevant) {
    const dow = new Date(day.date).getDay()
    if (dow === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(day)
  }
  if (currentWeek.length > 0) weeks.push(currentWeek)

  return weeks
}

function computeStreak(contributions: Contribution[]): number {
  let streak = 0
  let started = false
  const weeks = buildGrid(contributions)
  for (let i = weeks.length - 1; i >= 0; i--) {
    const hasContribution = weeks[i].some((d) => d !== null && d.count > 0)
    if (hasContribution) {
      started = true
      streak++
    } else if (started) {
      break
    }
  }
  return streak
}

function generateFallbackGrid(): number[][] {
  return Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.random())
  )
}

const LEVEL_CLASSES: Record<number, string> = {
  0: 'cellEmpty',
  1: 'cellLow',
  2: 'cellMed',
  3: 'cellMedHigh',
  4: 'cellHigh',
}

export default function Activity() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const fallbackGrid = useMemo(() => generateFallbackGrid(), [])

  useEffect(() => {
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((json: ApiResponse) => setData(json))
      .catch(() => {})
  }, [])

  const grid = data ? buildGrid(data.contributions) : null
  const totalContributions = data
    ? Object.values(data.total).reduce((a, b) => a + b, 0)
    : 0
  const weekStreak = data ? computeStreak(data.contributions) : 0

  return (
    <section id="activity" className="section">
      <div className="container">
        <p className="section-label">Activity</p>

        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className={styles.ghIcon}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className={styles.headerText}>GitHub Contributions</span>
            </div>
            <div className={styles.legend}>
              <span className={styles.legendLabel}>Less</span>
              <div className={`${styles.legendCell} ${styles.cellEmpty}`} />
              <div className={`${styles.legendCell} ${styles.cellLow}`} />
              <div className={`${styles.legendCell} ${styles.cellMed}`} />
              <div className={`${styles.legendCell} ${styles.cellMedHigh}`} />
              <div className={`${styles.legendCell} ${styles.cellHigh}`} />
              <span className={styles.legendLabel}>More</span>
            </div>
          </div>

          <div className={styles.graphWrap}>
            <div className={styles.graph}>
              {grid
                ? grid.map((week, wi) => (
                    <div key={wi} className={styles.column}>
                      {week.map((day, di) =>
                        day === null ? (
                          <div key={di} className={styles.cellSpacer} />
                        ) : (
                          <div
                            key={di}
                            className={`${styles.cell} ${styles[LEVEL_CLASSES[day.level]]}`}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        )
                      )}
                    </div>
                  ))
                : fallbackGrid.map((week, wi) => (
                    <div key={wi} className={styles.column}>
                      {week.map((level, di) => {
                        let cls = styles.cellEmpty
                        if (level > 0.85) cls = styles.cellHigh
                        else if (level > 0.65) cls = styles.cellMed
                        else if (level > 0.4) cls = styles.cellLow
                        return <div key={di} className={`${styles.cell} ${cls}`} />
                      })}
                    </div>
                  ))}
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statsLeft}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{totalContributions || '—'}</span>
                <span className={styles.statLabel}>contributions this year</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{weekStreak || '—'}</span>
                <span className={styles.statLabel}>week streak</span>
              </div>
            </div>
            <GlassSurface
              borderRadius={8}
              borderWidth={0.05}
              brightness={55}
              opacity={0.9}
              blur={8}
              displace={0}
              backgroundOpacity={0.12}
              saturation={1.5}
              distortionScale={-100}
              redOffset={0}
              greenOffset={6}
              blueOffset={12}
              className={styles.glassBtnWrapper}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ghLinkGlass}
              >
                View on GitHub
              </a>
            </GlassSurface>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
