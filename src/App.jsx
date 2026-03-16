import { useEffect, useMemo, useRef, useState } from 'react'

function App() {
  const daysTogether = 25
  const promiseLines = [
    'You made my days brighter than ever ✨',
    'Every message from you feels like magic 💬',
    'I would love to build something real with you 💖',
  ]
  const sweetNotes = [
    'You are the calm in my chaos.',
    'Your smile is my favorite notification.',
    'I did not expect LinkedIn to become my love story.',
  ]
  const reasons = [
    'You are kind, sharp, and genuinely inspiring.',
    'Talking to you makes even ordinary days special.',
    'I feel peace, excitement, and respect with you.',
  ]

  const [isMusicOn, setIsMusicOn] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [noteIndex, setNoteIndex] = useState(0)
  const [musicProgress, setMusicProgress] = useState(0)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 18 })
  const [loveBurst, setLoveBurst] = useState([])
  const [showLetter, setShowLetter] = useState(false)
  const audioRef = useRef(null)
  const burstTimeoutRef = useRef(null)

  const herPhotos = [
    { id: 1, src: '/images/her1.jpg', fallback: '/images/her1-placeholder.svg' },
    { id: 2, src: '/images/her2.jpg', fallback: '/images/her2-placeholder.svg' },
    { id: 3, src: '/images/her3.jpg', fallback: '/images/her3-placeholder.svg' },
  ]

  const vibeTags = ['Soft talks', 'Late smiles', 'Daily excitement', 'Pure intention', 'Real connection']

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2.6 + Math.random() * 2.2,
      })),
    [],
  )

  useEffect(() => {
    const text = promiseLines[lineIndex]
    let i = 0
    setTypedText('')

    const typeInterval = window.setInterval(() => {
      i += 1
      setTypedText(text.slice(0, i))

      if (i >= text.length) {
        window.clearInterval(typeInterval)
      }
    }, 35)

    const nextLineTimer = window.setTimeout(() => {
      setLineIndex((prev) => (prev + 1) % promiseLines.length)
    }, 3600)

    return () => {
      window.clearInterval(typeInterval)
      window.clearTimeout(nextLineTimer)
    }
  }, [lineIndex])

  useEffect(() => {
    const noteTimer = window.setInterval(() => {
      setNoteIndex((prev) => (prev + 1) % sweetNotes.length)
    }, 2600)

    return () => window.clearInterval(noteTimer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (!audio.duration) {
        setMusicProgress(0)
        return
      }

      setMusicProgress((audio.currentTime / audio.duration) * 100)
    }

    const handleEnded = () => {
      setIsMusicOn(false)
      setMusicProgress(0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current)
      }
    }
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isMusicOn) {
        audioRef.current.pause()
        setIsMusicOn(false)
      } else {
        await audioRef.current.play()
        setIsMusicOn(true)
      }
    } catch {
      setIsMusicOn(false)
    }
  }

  const handleAccept = () => {
    setAccepted(true)

    const burst = Array.from({ length: 18 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      duration: 1.2 + Math.random() * 1.1,
      size: 14 + Math.random() * 20,
      rotate: Math.random() * 280,
    }))

    setLoveBurst(burst)

    if (burstTimeoutRef.current) {
      window.clearTimeout(burstTimeoutRef.current)
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setLoveBurst([])
    }, 2600)
  }

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y })
  }

  return (
    <main
      className="proposal-page"
      onMouseMove={onPointerMove}
      style={{ '--spot-x': `${spotlight.x}%`, '--spot-y': `${spotlight.y}%` }}
    >
      <audio ref={audioRef} src="/music/romantic.mp3" loop preload="metadata" />

      <div className="background-glow" aria-hidden="true"></div>
      <div className="sparkle-layer" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          ></span>
        ))}
      </div>
      <div className="floating-hearts" aria-hidden="true">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      <section className="hero-section">
        <p className="tiny-intro">From a LinkedIn message to this moment...</p>
        <h1>{typedText}</h1>
        <p className="hero-text">
          Every chat with you feels special. I made this little page to say what my heart has been
          trying to say.
        </p>

        <div className="stats-row">
          <div className="stat-pill">
            <strong>{daysTogether}+</strong>
            <span>days since first hi</span>
          </div>
          <div className="stat-pill">
            <strong>{sweetNotes.length}</strong>
            <span>reasons I adore you</span>
          </div>
          <div className="stat-pill">
            <strong>∞</strong>
            <span>care, respect & effort</span>
          </div>
        </div>

        <p className="rotating-note">“{sweetNotes[noteIndex]}”</p>

        <div className="cta-row">
          <button className="btn btn-primary" onClick={handleAccept}>
            Will you be mine?
          </button>
          <button className="btn btn-ghost" onClick={toggleMusic}>
            {isMusicOn ? 'Pause music ♫' : 'Play romantic music ♫'}
          </button>
        </div>

        <div className="music-bar-wrap" aria-hidden="true">
          <div className="music-bar-fill" style={{ width: `${musicProgress}%` }}></div>
        </div>

        {accepted && (
          <p className="accepted-message">You just made me the happiest person 💖</p>
        )}

        {loveBurst.length > 0 && (
          <div className="love-burst" aria-hidden="true">
            {loveBurst.map((heart) => (
              <span
                key={heart.id}
                style={{
                  left: `${heart.left}%`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  fontSize: `${heart.size}px`,
                  transform: `rotate(${heart.rotate}deg)`,
                }}
              >
                ❤
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="reasons-section">
        <h2>Why this feels real</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <article key={reason} className="reason-card" style={{ '--delay': `${index * 90}ms` }}>
              <h3>Reason {index + 1}</h3>
              <p>{reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vibe-section">
        <h2>Our vibe</h2>
        <div className="vibe-tags">
          {vibeTags.map((tag) => (
            <span key={tag} className="vibe-chip">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="memory-section">
        <h2>Three moments of her</h2>
        <p>Add her 3 best photos below to make this page truly personal.</p>

        <div className="photo-grid">
          {herPhotos.map((photo) => (
            <figure key={photo.id} className="photo-card">
              <img
                src={photo.src}
                alt={`Her photo ${photo.id}`}
                onError={(e) => {
                  e.currentTarget.src = photo.fallback
                }}
              />
              <figcaption>Her smile #{photo.id}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="letter-section">
        <button className="btn btn-primary" onClick={() => setShowLetter((prev) => !prev)}>
          {showLetter ? 'Close letter 💌' : 'Open my letter 💌'}
        </button>

        {showLetter && (
          <article className="letter-card">
            <p>
              Hey,
              <br />
              I know we started as strangers online, but your presence has become something very
              special for me. You make me smile without trying, and you make me want to become a
              better version of myself.
            </p>
            <p>
              I do not want to rush anything. I just want to be honest: I like you deeply, and I
              want to take this bond forward with care, respect, and love.
            </p>
            <p>— Yours, with a sincere heart ❤️</p>
          </article>
        )}
      </section>

      <footer className="footer-note">Made with love, courage, and one honest heart 💌</footer>
    </main>
  )
}

export default App
