import React, { useState } from 'react'
import { Apple, Smartphone, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Banner from './Banner'
import InstallModal from './InstallModal'

const Battambang: React.CSSProperties = { fontFamily: "'Battambang', sans-serif" }

type Mode = 'login' | 'signup'

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // placeholder — wire to Supabase auth later
    console.log(mode, form)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 16px 40px',
      gap: 20,
    }}>
      {/* Banner */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', animation: 'fadeIn 0.6s ease' }}>
        <Banner />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Caption */}
      <div style={{ textAlign: 'center', maxWidth: 420, ...Battambang, animation: 'slideUp 0.5s ease 0.1s both' }}>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
          គ្រប់គ្រងវិក្កយបត្រ ស្តុក និងហិរញ្ញវត្ថុអាជីវកម្មអ្នក
          ប្រើប្រាស់បានគ្រប់ទីកន្លែង — លឿន ងាយ និងសុវត្ថិភាព។
        </p>
      </div>

      {/* Download buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', animation: 'slideUp 0.5s ease 0.15s both' }}>
        <DownloadButton
          icon={<Apple size={20} />}
          topLabel="Download on the"
          bottomLabel="App Store"
          onClick={() => setInstallOpen(true)}
        />
        <DownloadButton
          icon={<Smartphone size={20} />}
          topLabel="GET IT ON"
          bottomLabel="Google Play"
          onClick={() => setInstallOpen(true)}
        />
      </div>

      {/* Install hint */}
      <button
        onClick={() => setInstallOpen(true)}
        style={{
          ...Battambang,
          background: 'rgba(217,164,65,0.15)',
          border: '1px solid rgba(217,164,65,0.4)',
          borderRadius: 30,
          padding: '8px 18px',
          color: '#D9A441',
          fontSize: 12,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          animation: 'slideUp 0.5s ease 0.2s both',
          transition: 'all 0.2s',
        }}
      >
        📲 របៀបដំឡើងទៅ Home Screen
      </button>

      {/* Auth card */}
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 20,
        padding: '28px 24px',
        animation: 'slideUp 0.5s ease 0.25s both',
      }}>
        {/* Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
        }}>
          <TabButton active={mode === 'login'} onClick={() => setMode('login')} label="ចូលប្រើ" />
          <TabButton active={mode === 'signup'} onClick={() => setMode('signup')} label="បង្កើតគណនី" />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'signup' && (
            <Input
              icon={<User size={18} />}
              type="text"
              placeholder="ឈ្មោះពេញ"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
          )}
          <Input
            icon={<Mail size={18} />}
            type="email"
            placeholder="អ៊ីមែល"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Input
            icon={<Lock size={18} />}
            type={showPassword ? 'text' : 'password'}
            placeholder="ពាក្យសម្ងាត់"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', display: 'flex', padding: 0 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {mode === 'login' && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 12, color: '#D9A441', cursor: 'pointer', ...Battambang }}>
                ភ្លេចពាក្យសម្ងាត់?
              </span>
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

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: '20px 0',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', ...Battambang }}>ឬ</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
        </div>

        <button
          style={{
            ...Battambang,
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: 12,
            padding: '13px',
            fontSize: 14,
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.2s',
          }}
        >
          បន្តជាមួយ Google
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 20,
          ...Battambang,
        }}>
          {mode === 'login' ? 'មិនទាន់មានគណនី? ' : 'មានគណនីរួចហើយ? '}
          <span
            style={{ color: '#D9A441', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'បង្កើតគណនី' : 'ចូលប្រើ'}
          </span>
        </p>
      </div>

      <InstallModal open={installOpen} onClose={() => setInstallOpen(false)} />
    </div>
  )
}

const DownloadButton: React.FC<{
  icon: React.ReactNode
  topLabel: string
  bottomLabel: string
  onClick: () => void
}> = ({ icon, topLabel, bottomLabel, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 14,
      padding: '10px 18px',
      color: '#fff',
      transition: 'all 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(0,0,0,0.5)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
  >
    {icon}
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: 9, opacity: 0.7, letterSpacing: 0.5 }}>{topLabel}</div>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{bottomLabel}</div>
    </div>
  </button>
)

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      ...Battambang,
      flex: 1,
      padding: '10px',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      background: active ? 'linear-gradient(135deg,#D9A441,#C8923A)' : 'transparent',
      color: active ? '#0B2A4A' : 'rgba(255,255,255,0.6)',
      transition: 'all 0.25s',
    }}
  >
    {label}
  </button>
)

const Input: React.FC<{
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  trailing?: React.ReactNode
}> = ({ icon, type, placeholder, value, onChange, trailing }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '0 14px',
    height: 50,
    transition: 'border 0.2s',
  }}>
    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }}>{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...Battambang,
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: 14,
        height: '100%',
      }}
    />
    {trailing}
  </div>
)

export default App
