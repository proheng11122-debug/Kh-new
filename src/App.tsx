import React, { useState } from 'react'
import { Apple, Smartphone, Download, LogIn, UserPlus } from 'lucide-react'
import Banner from './Banner'
import InstallModal from './InstallModal'
import AuthScreen from './AuthScreen'

const Battambang: React.CSSProperties = { fontFamily: "'Battambang', sans-serif" }

type View = 'landing' | 'auth'
type Mode = 'login' | 'signup'

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing')
  const [authMode, setAuthMode] = useState<Mode>('login')
  const [installOpen, setInstallOpen] = useState(false)

  const goToAuth = (mode: Mode) => {
    setAuthMode(mode)
    setView('auth')
  }

  const goBack = () => setView('landing')

  if (view === 'auth') {
    return <AuthScreen initialMode={authMode} onBack={goBack} />
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Sticky Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
        background: 'rgba(11,42,74,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'#D9A441', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#0B2A4A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 12h6M9 16h4" stroke="#0B2A4A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ ...Battambang, fontSize:16, fontWeight:700, color:'#fff' }}>KH Invoice</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => goToAuth('login')}
            style={{
              ...Battambang, display:'flex', alignItems:'center', gap:6,
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)',
              borderRadius:10, padding:'8px 16px', color:'#fff', fontSize:13, fontWeight:600, transition:'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            <LogIn size={15} />
            ចូលប្រើ
          </button>
          <button
            onClick={() => goToAuth('signup')}
            style={{
              ...Battambang, display:'flex', alignItems:'center', gap:6,
              background:'linear-gradient(135deg, #D9A441, #C8923A)',
              borderRadius:10, padding:'8px 16px', color:'#0B2A4A', fontSize:13, fontWeight:700,
              transition:'all 0.2s', boxShadow:'0 4px 12px rgba(217,164,65,0.25)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(217,164,65,0.35)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(217,164,65,0.25)' }}
          >
            <UserPlus size={15} />
            បង្កើតគណនី
          </button>
        </div>
      </header>

      {/* Landing content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px 40px', gap: 20, width: '100%', maxWidth: 480, margin: '0 auto',
      }}>
        <div style={{ width:'100%', display:'flex', justifyContent:'center', animation:'fadeIn 0.6s ease' }}>
          <Banner />
        </div>

        <div style={{ textAlign:'center', maxWidth:420, ...Battambang, animation:'slideUp 0.5s ease 0.1s both' }}>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.9)', lineHeight:1.6 }}>
            គ្រប់គ្រងវិក្កយបត្រ ស្តុក និងហិរញ្ញវត្ថុអាជីវកម្មអ្នក
            ប្រើប្រាស់បានគ្រប់ទីកន្លែង — លឿន ងាយ និងសុវត្ថិភាព។
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', animation:'slideUp 0.5s ease 0.15s both' }}>
          <button
            onClick={() => goToAuth('signup')}
            style={{
              ...Battambang, display:'flex', alignItems:'center', gap:8,
              background:'linear-gradient(135deg, #D9A441, #C8923A)',
              borderRadius:14, padding:'14px 28px', color:'#0B2A4A', fontSize:15, fontWeight:700,
              transition:'all 0.2s', boxShadow:'0 6px 20px rgba(217,164,65,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(217,164,65,0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,164,65,0.3)' }}
          >
            <UserPlus size={18} />
            បង្កើតគណនីឥឡូវនេះ
          </button>
          <button
            onClick={() => goToAuth('login')}
            style={{
              ...Battambang, display:'flex', alignItems:'center', gap:8,
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)',
              borderRadius:14, padding:'14px 28px', color:'#fff', fontSize:15, fontWeight:600, transition:'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            <LogIn size={18} />
            ចូលប្រើ
          </button>
        </div>

        {/* Download buttons */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', animation:'slideUp 0.5s ease 0.2s both' }}>
          <DownloadButton icon={<Apple size={22} />} topLabel="Download on the" bottomLabel="App Store" onClick={() => setInstallOpen(true)} />
          <DownloadButton icon={<Smartphone size={22} />} topLabel="GET IT ON" bottomLabel="Google Play" onClick={() => setInstallOpen(true)} />
        </div>

        <button
          onClick={() => setInstallOpen(true)}
          style={{
            ...Battambang, background:'rgba(217,164,65,0.15)', border:'1px solid rgba(217,164,65,0.4)',
            borderRadius:30, padding:'8px 18px', color:'#D9A441', fontSize:12, fontWeight:700,
            display:'flex', alignItems:'center', gap:6, animation:'slideUp 0.5s ease 0.25s both', transition:'all 0.2s',
          }}
        >
          <Download size={14} />
          របៀបដំឡើងទៅ Home Screen
        </button>

        <p style={{ textAlign:'center', fontSize:11, color:'rgba(255,255,255,0.35)', maxWidth:380, ...Battambang }}>
          ដោយចូលប្រើ អ្នកយល់ព្រមនឹងលក្ខខណ្ឌប្រើប្រាស់ និងគោលការណ៍ឯកជនភាពរបស់ KH Invoice
        </p>
      </div>

      <InstallModal open={installOpen} onClose={() => setInstallOpen(false)} />
    </div>
  )
}

const DownloadButton: React.FC<{ icon:React.ReactNode; topLabel:string; bottomLabel:string; onClick:()=>void }> = ({ icon, topLabel, bottomLabel, onClick }) => (
  <button onClick={onClick} style={{
    display:'flex', alignItems:'center', gap:10, background:'rgba(0,0,0,0.3)',
    border:'1px solid rgba(255,255,255,0.2)', borderRadius:14, padding:'10px 18px', color:'#fff', transition:'all 0.2s',
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background='rgba(0,0,0,0.5)'; e.currentTarget.style.transform='translateY(-2px)' }}
    onMouseLeave={(e) => { e.currentTarget.style.background='rgba(0,0,0,0.3)'; e.currentTarget.style.transform='translateY(0)' }}
  >
    {icon}
    <div style={{ textAlign:'left' }}>
      <div style={{ fontSize:9, opacity:0.7, letterSpacing:0.5 }}>{topLabel}</div>
      <div style={{ fontSize:14, fontWeight:700 }}>{bottomLabel}</div>
    </div>
  </button>
)

export default App
