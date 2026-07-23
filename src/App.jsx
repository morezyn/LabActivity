import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const themes = {
  purple: {
    '--accent': '#aa3bff',
    '--accent-bg': 'rgba(170, 59, 255, 0.1)',
    '--accent-border': 'rgba(170, 59, 255, 0.5)',
  },
  emerald: {
    '--accent': '#10b981',
    '--accent-bg': 'rgba(16, 185, 129, 0.1)',
    '--accent-border': 'rgba(16, 185, 129, 0.5)',
  },
  blue: {
    '--accent': '#3b82f6',
    '--accent-bg': 'rgba(59, 130, 246, 0.1)',
    '--accent-border': 'rgba(59, 130, 246, 0.5)',
  },
  orange: {
    '--accent': '#f97316',
    '--accent-bg': 'rgba(249, 115, 22, 0.1)',
    '--accent-border': 'rgba(249, 115, 22, 0.5)',
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('demo')
  const [accent, setAccent] = useState('purple')
  const [inputText, setInputText] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)
  const [stats, setStats] = useState({
    latency: '8.4ms',
    buildTime: '0.12s',
    size: '64.2 KB',
    status: 'Ready'
  })

  // Simulated compilation logs
  const [logs, setLogs] = useState([
    '[vite] connecting...',
    '[vite] hot module replacement enabled.',
    '✓ ready in 143ms'
  ])

  const runMockCompilation = () => {
    if (isCompiling) return
    setIsCompiling(true)
    setLogs(['[vite] hmr update triggering...'])
    
    setTimeout(() => {
      setLogs(prev => [...prev, '✓ transforming (2) src/App.jsx'])
    }, 400)

    setTimeout(() => {
      const newLatency = (Math.random() * 5 + 3).toFixed(1) + 'ms'
      const newBuildTime = (Math.random() * 0.08 + 0.08).toFixed(2) + 's'
      setStats({
        latency: newLatency,
        buildTime: newBuildTime,
        size: '64.5 KB',
        status: 'HMR Active'
      })
      setLogs(prev => [
        ...prev,
        `✓ updated in ${newLatency}`,
        '[vite] hot module replacement complete.'
      ])
      setIsCompiling(false)
    }, 900)
  }

  return (
    <div className="app-container" style={themes[accent]}>
      {/* Premium Header */}
      <header className="nav-header">
        <div className="nav-brand">
          <img src={viteLogo} className="nav-logo" alt="Vite Logo" />
          <span>Vite + React Studio</span>
        </div>
        <div className="theme-indicator">
          Accent: <span className="accent-name">{accent}</span>
        </div>
      </header>

      {/* Hero Section */}
      <section id="center">
        <div className="hero-glowing-wrapper">
          <div className="hero">
            <img src={heroImg} className="base" width="170" height="179" alt="Studio Base" />
            <img src={reactLogo} className="framework floating-react" alt="React logo" />
            <img src={viteLogo} className="vite pulsing-vite" alt="Vite logo" />
          </div>
        </div>

        <div className="hero-text">
          <h1>Vite + React Starter Suite</h1>
          <p className="hero-subtitle">
            A beautiful, performant environment configured for state-of-the-art frontend development.
          </p>
        </div>

        {/* Tabbed Interactive Showcase */}
        <div className="studio-card">
          <div className="studio-tabs">
            <button 
              className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
              onClick={() => setActiveTab('demo')}
            >
              Interactive Demo
            </button>
            <button 
              className={`tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
              onClick={() => setActiveTab('theme')}
            >
              Theme Accent
            </button>
            <button 
              className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Vite Dev Panel
            </button>
          </div>

          <div className="studio-content">
            {activeTab === 'demo' && (
              <div className="tab-panel animate-fade">
                <h3>Live State Sandbox</h3>
                <p>Interact with the counter and text input to preview real-time reactivity.</p>
                
                <div className="demo-actions">
                  <div className="counter-box">
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setCount(c => Math.max(0, c - 1))}
                    >
                      -
                    </button>
                    <span className="counter-display">{count}</span>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setCount(c => c + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="btn btn-outline" onClick={() => setCount(0)}>
                    Reset
                  </button>
                </div>

                <div className="text-sandbox">
                  <input 
                    type="text" 
                    placeholder="Type to test HMR render..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="sandbox-input"
                  />
                  {inputText && (
                    <div className="sandbox-preview">
                      <strong>Preview:</strong> <span>{inputText}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="tab-panel animate-fade">
                <h3>Theme Accent Customizer</h3>
                <p>Dynamically modify CSS variable variables to switch the primary theme color scheme.</p>
                <div className="theme-selectors">
                  {Object.keys(themes).map(tName => (
                    <button
                      key={tName}
                      className={`theme-selector-btn ${tName} ${accent === tName ? 'active' : ''}`}
                      onClick={() => setAccent(tName)}
                    >
                      <span className="color-dot"></span>
                      {tName.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="tab-panel animate-fade">
                <h3>Vite Dev Monitor</h3>
                <p>Observe state stats and simulate compile feedback loops.</p>
                
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">HMR Latency</span>
                    <span className="stat-value">{stats.latency}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Transform Time</span>
                    <span className="stat-value">{stats.buildTime}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Bundle Size</span>
                    <span className="stat-value">{stats.size}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">App Status</span>
                    <span className="stat-value text-accent">{stats.status}</span>
                  </div>
                </div>

                <div className="console-wrapper">
                  <div className="console-header">
                    <span>Terminal output (HMR logs)</span>
                    <button 
                      className={`btn btn-sm btn-terminal ${isCompiling ? 'loading' : ''}`}
                      onClick={runMockCompilation}
                      disabled={isCompiling}
                    >
                      {isCompiling ? 'Triggering HMR...' : 'Simulate Change'}
                    </button>
                  </div>
                  <div className="console-body">
                    {logs.map((log, index) => (
                      <div key={index} className="console-line">
                        <span className="console-prefix">&gt;</span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Footer Section */}
      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Resources &amp; Docs</h2>
          <p>Read developer documentation for configuring frameworks.</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="Vite logo" />
                Vite Config
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="React logo" />
                React Docs
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect &amp; Share</h2>
          <p>Join the communities and repositories.</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default App
