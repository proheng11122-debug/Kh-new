import { useState, useEffect } from 'react'
import { Download, Check } from 'lucide-react'
import InstallModal from './InstallModal'
import { SignInForm, SignUpForm } from './AuthForms'
import Dashboard from './Dashboard'
import { supabase } from './lib/supabaseClient'
import './App.css'

type Platform = 'android' | 'ios'
type View = 'landing' | 'signin' | 'signup' | 'welcome'

const slides = [
  { src: 'https://images.pexels.com/photos/669454/pexels-photo-669454.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'ផ្ទាំង Dashboard' },
  { src: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'បង្កើតវិក្កយបត្រ' },
  { src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'គ្រប់គ្រងអតិថិជន' },
  { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400', label: 'របាយការណ៍' },
]

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'android'
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'ios' : 'android'
}

export default function App() {
  const [modal, setModal] = useState<Platform | null>(null)
  const [installed, setInstalled] = useState(false)
  const [deferred, setDeferred] = useState<any>(null)
  const [slide, setSlide] = useState(0)
  const [view, setView] = useState<View>('landing')
  const platform = detectPlatform()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setView('welcome')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setView((v) => (v === 'welcome' ? 'landing' : v))
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const h = (e: any) => { e.preventDefault(); setDeferred(e) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSlide(i => (i + 1) % slides.length), 3000)
    return () => clearInterval(t)
  }, [])

  const installAndroid = async () => {
    if (deferred) {
      deferred.prompt()
      const { outcome } = await deferred.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setDeferred(null)
    } else {
      setModal('android')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setView('landing')
  }

  if (view === 'signin') {
    return (
      <div className="page">
        <SignInForm
          onBack={() => setView('landing')}
          onSuccess={() => setView('welcome')}
          onSwitchToSignUp={() => setView('signup')}
        />
      </div>
    )
  }

  if (view === 'signup') {
    return (
      <div className="page">
        <SignUpForm
          onBack={() => setView('landing')}
          onSuccess={() => setView('welcome')}
          onSwitchToSignIn={() => setView('signin')}
        />
      </div>
    )
  }

  if (view === 'welcome') {
    return <Dashboard onLogout={handleSignOut} />
  }

  return (
    <div className="page">
      {/* ── TOP: Hero ── */}
      <section className="top">
        <div className="app-icon">
          <img src="/icon.svg" alt="KH Invoice" className="app-icon-img" />
        </div>
        <h1 className="app-name khmer">KH Invoice</h1>

        {/* ── App description ── */}
        <div className="app-desc">
          <p className="app-desc-line khmer app-desc-main">បង្កើតវិក្កយបត្រ គ្រប់គ្រងស្ដុកដោយស្វ័យប្រវត្តិ</p>
          <p className="app-desc-line khmer">តាមដានចំណូលចំណាយ &amp;បំណុល គ្រប់ប្រភេទប្រចាំខែ</p>
          <p className="app-desc-line khmer app-desc-cta">បង្កើតគណនីអាឡូវនេះដើម្បីភាពងាយស្រួលគ្រប់គ្រងអាជីកម្មរបស់អ្នក</p>
        </div>
      </section>

      {/* ── MIDDLE: Screenshots ── */}
      <section className="middle">
        <div className="phone-shell">
          <div className="phone-notch" />
          <div className="phone-screen">
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.src}
                alt={s.label}
                className={`phone-img ${i === slide ? 'visible' : ''}`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="phone-label khmer">{slides[slide].label}</div>
        </div>
        <div className="slide-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`sdot ${i === slide ? 'on' : ''}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        <div className="install-row">
          <button
            className={`ibtn android ${installed ? 'done' : ''}`}
            onClick={installAndroid}
          >
            {installed ? <Check size={19} /> : <Download size={19} />}
            <span className="ibtn-label">
              <span className="ibtn-top">Install on</span>
              <span className="ibtn-bot">Android</span>
            </span>
          </button>
          <button className={`ibtn ios ${installed ? 'done' : ''}`} onClick={() => setModal('ios')}>
            {installed ? <Check size={19} /> : <Download size={19} />}
            <span className="ibtn-label">
              <span className="ibtn-top">Install on</span>
              <span className="ibtn-bot">iOS</span>
            </span>
          </button>
        </div>
      </section>

      {/* ── BOTTOM: Auth ── */}
      <section className="bottom">
        <p className="bottom-caption khmer">ចូលគណនី ឬ បង្កើតគណនីថ្មី ដើម្បីចាប់ផ្តើមប្រើប្រាស់</p>
        <div className="auth-row">
          <button className="auth-btn primary khmer" onClick={() => setView('signin')}>
            ចូលគណនី (Sign In)
          </button>
          <button className="auth-btn outline khmer" onClick={() => setView('signup')}>
            បង្កើតគណនី (Sign Up)
          </button>
        </div>
        <p className="bottom-note">KH Invoice © 2026 · Made in Cambodia</p>
      </section>

      {modal && <InstallModal platform={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
