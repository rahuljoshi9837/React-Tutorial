import styles from './StatsBar.module.css'

export default function StatsBar({ tasks }) {
  const total     = tasks.length
  const done      = tasks.filter(t => t.completed).length
  const active    = total - done
  const pct       = total > 0 ? Math.round((done / total) * 100) : 0
  const highCount = tasks.filter(t => t.priority === 'high' && !t.completed).length

  return (
    <div className={styles.stats}>
      <div className={styles.numbers}>
        <div className={styles.stat}>
          <span className={styles.num}>{total}</span>
          <span className={styles.label}>total</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.num}>{active}</span>
          <span className={styles.label}>active</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.num}>{done}</span>
          <span className={styles.label}>done</span>
        </div>
      </div>

      {total > 0 && (
        <div className={styles.progressRow}>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.pct}>{pct}%</span>
        </div>
      )}

      {highCount > 0 && (
        <p className={styles.highAlert}>
          {highCount} high priority remaining
        </p>
      )}
    </div>
  )
}
