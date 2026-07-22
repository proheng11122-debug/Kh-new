import React from 'react'
import { Apple, Smartphone, X, Share, PlusSquare, Home } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const Battambang: React.CSSProperties = { fontFamily: "'Battambang', sans-serif" }

const InstallModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...Battambang,
          background: '#FAFAF8',
          borderRadius: 20,
          padding: '28px 24px',
          maxWidth: 380,
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          color: '#0B2A4A',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          animation: 'slideUp 0.3s ease',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(11,42,74,0.08)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0B2A4A',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: '#D9A441',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#0B2A4A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 12h6M9 16h4" stroke="#0B2A4A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>ដំឡើង KH Invoice ទៅ Home Screen</h3>
          <p style={{ fontSize: 13, color: 'rgba(11,42,74,0.65)', marginTop: 6 }}>
            ប្រើប្រាស់ដូចជា app ដោយមិនចាំបាច់ទាញយកពី App Store
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <PlatformTab active label="iOS (Safari)" icon={<Apple size={16} />} />
          <PlatformTab label="Android (Chrome)" icon={<Smartphone size={16} />} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Step
            num={1}
            text="បើកគេហទំព័រ KH Invoice ក្នុង Safari"
          />
          <Step
            num={2}
            text="ចុចប៊ូតុង Share នៅខាងក្រោម"
            icon={<Share size={16} />}
          />
          <Step
            num={3}
            text="ជ្រើសរើស «Add to Home Screen»"
            icon={<PlusSquare size={16} />}
          />
          <Step
            num={4}
            text="ចុច «Add» ហើយ icon KH Invoice នឹងបង្ហាញនៅ Home Screen"
            icon={<Home size={16} />}
          />
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: 24,
            padding: '14px',
            borderRadius: 12,
            background: '#0B2A4A',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            ...Battambang,
          }}
        >
          យល់ហើយ
        </button>
      </div>
    </div>
  )
}

const PlatformTab: React.FC<{ active?: boolean; label: string; icon: React.ReactNode }> = ({ active, label, icon }) => (
  <div style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '10px 8px',
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    background: active ? '#0B2A4A' : 'rgba(11,42,74,0.06)',
    color: active ? '#fff' : '#0B2A4A',
    transition: 'all 0.2s',
  }}>
    {icon}
    {label}
  </div>
)

const Step: React.FC<{ num: number; text: string; icon?: React.ReactNode }> = ({ num, text, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'rgba(217,164,65,0.15)',
      color: '#D9A441',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, flexShrink: 0,
    }}>{num}</div>
    <div style={{ fontSize: 13, color: '#0B2A4A', display: 'flex', alignItems: 'center', gap: 6 }}>
      {text}
      {icon && <span style={{ color: '#378ADD' }}>{icon}</span>}
    </div>
  </div>
)

export default InstallModal
