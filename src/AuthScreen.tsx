import React, { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react'

interface Props {
  initialMode: 'login' | 'signup'
  onBack: () => void
}

const Battambang: React.CSSProperties = { fontFamily: "'Battambang', sans-serif" }

type Mode = 'login' | 'signup'

const AuthScreen: React.FC<Props> = ({ initialMode, onBack }) => {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Wire to Supabase auth later
    console.log(mode, form)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            ...Battambang,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10,
            padding: '8px 14px',
            color: 'rgba(255,255,255,0.8)',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
            transition: 'all 0.2s',
          }}
        >
          <ArrowLeft size={16} />
          ត្រឡប់
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: '#D9A441',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#0B2A4A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 12h6M9 16h4" stroke="#0B2A4A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 style={{ ...Battambang, fontSize: 22, fontWeight: 700, color: '#fff' }}>KH INVOICE</h1>
        </div>

        {/* Auth card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          padding: '28px 24px',
          animation: 'slideUp 0.4s ease',
        }}>
          {/* Toggle */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            <TabButton active={mode === 'login'} onClick={() => setMode('login')} label="ចូលប្រើ" />
            <TabButton active={mode === 'signup'} onClick={() => setMode('signup')} label="បង្កើតគណនី" />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <Input icon={<User size={18} />} type="text" placeholder="ឈ្មោះពេញ" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            )}
            <Input icon={<Mail size={18} />} type="email" placeholder="អ៊ីមែល" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input
              icon={<Lock size={18} />}
              type={showPassword ? 'text' : 'password'}
              placeholder="ពាក្យសម្ងាត់"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              trailing={
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', display:'flex', padding:0 }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {mode === 'login' && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 12, color: '#D9A441', cursor: 'pointer', ...Battambang }}>ភ្លេចពាក្យសម្ងាត់?</span>
              </div>
            )}

            <button
              type="submit"
              style={{
                ...Battambang,
                background: 'linear-gradient(135deg, #D9A441, #C8923A)',
                color: '#0B2A4A',
                borderRadius: 12,
                padding: '14px',
                fontSize: 16,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 4,
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 6px 20px rgba(217,164,65,0.3)',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {mode === 'login' ? 'ចូលប្រើ' : 'បង្កើតគណនី'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', ...Battambang }}>ឬ</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
          </div>

          <button style={{
            ...Battambang, width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff',
            borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            បន្តជាមួយ Google
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 20, ...Battambang }}>
            {mode === 'login' ? 'មិនទាន់មានគណនី? ' : 'មានគណនីរួចហើយ? '}
            <span style={{ color: '#D9A441', fontWeight: 700, cursor: 'pointer' }} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'បង្កើតគណនី' : 'ចូលប្រើ'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button onClick={onClick} style={{
    ...Battambang, flex: 1, padding: '10px', borderRadius: 10, fontSize: 14, fontWeight: 700,
    background: active ? 'linear-gradient(135deg,#D9A441,#C8923A)' : 'transparent',
    color: active ? '#0B2A4A' : 'rgba(255,255,255,0.6)', transition: 'all 0.25s',
  }}>{label}</button>
)

const Input: React.FC<{
  icon: React.ReactNode; type: string; placeholder: string; value: string;
  onChange: (v: string) => void; trailing?: React.ReactNode
}> = ({ icon, type, placeholder, value, onChange, trailing }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '0 14px', height: 50, transition: 'border 0.2s',
  }}>
    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }}>{icon}</span>
    <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      style={{ ...Battambang, flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 14, height: '100%' }} />
    {trailing}
  </div>
)

export default AuthScreen
