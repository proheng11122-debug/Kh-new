import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Share, Plus } from 'lucide-react'

type Platform = 'android' | 'ios'

/* ── iOS photo steps ── */
const iosPhotoSteps = [
  {
    step: 1,
    title: 'បើក Safari ហើយចូលទំព័រ',
    subtitle: 'Open app in Safari',
    desc: 'បើក Safari ហើយចូល kh-invoice-v1.netlify.app · ចុចប៊ូតុង "ដំឡើង" ពណ៌ខៀវ',
    photo: '/images/Ios_install.png',
    highlight: 'ចុចប៊ូតុង "ដំឡើង" ពណ៌ខៀវ',
  },
  {
    step: 2,
    title: 'ចុចរូប Share នៅបាតអេក្រង់',
    subtitle: 'Tap the Share icon',
    desc: 'ចុចរូប Share នៅបាត Safari (ចន្លោះ ← →)',
    photo: null,
    icon: <Share size={52} strokeWidth={1.5} />,
    highlight: 'ចុចរូបនេះ ⬆',
  },
  {
    step: 3,
    title: 'ជ្រើស "Add to Home Screen"',
    subtitle: 'Select from the share sheet',
    desc: 'រំកិលចុះក្រោមក្នុងបន្ទះ Share ហើយចុច "Add to Home Screen"',
    photo: null,
    icon: <Plus size={52} strokeWidth={1.5} />,
    highlight: '"Add to Home Screen"',
  },
  {
    step: 4,
    title: 'ចុច "Add" ខាងស្ដាំ',
    subtitle: 'Tap Add to confirm',
    desc: 'ចុចប៊ូតុង "Add" នៅខាងស្ដាំខាងលើ ដើម្បីបញ្ជាក់',
    photo: null,
    icon: null,
    checkmark: true,
    highlight: 'ចុច Add → ដំណើរការបានដោយជោគជ័យ ✓',
  },
]

/* ── Android accordion steps ── */
const androidSteps = [
  { title: 'ចុចប៊ូតុង Install', sub: 'Tap Install button', desc: 'ចុចប៊ូតុង "Install" ខាងលើ ដើម្បីចាប់ផ្តើម។' },
  { title: 'បើកម៉ឺនុយ Browser ⋮', sub: 'Open Chrome menu', desc: 'ចុចរូប ⋮ នៅខាងស្ដាំខាងលើ ដើម្បីបើកម៉ឺនុយ Chrome។' },
  { title: 'ជ្រើស "Add to Home screen"', sub: 'Select option', desc: 'រុករករក "Add to Home screen" ហើយចុចលើវា។' },
  { title: 'ចុច "Install"', sub: 'Confirm install', desc: 'ចុចប៊ូតុង "Install" ដើម្បីបញ្ជាក់ការដំឡើង។' },
  { title: 'បានដំឡើងរួច ✓', sub: 'Done!', desc: 'KH Invoice នឹងបង្ហាញនៅ home screen របស់អ្នក។' },
]

function IosPhotoGuide({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const total = iosPhotoSteps.length
  const s = iosPhotoSteps[idx]
  const isLast = idx === total - 1

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card ios-photo-card" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-head">
          <span className="modal-badge ios">iOS</span>
          <h2 className="modal-title khmer">របៀបដំឡើងជា App</h2>
          <button className="modal-x" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="ios-step-counter">
          {iosPhotoSteps.map((_, i) => (
            <div key={i} className={`ios-step-dot ${i === idx ? 'on' : i < idx ? 'done' : ''}`} />
          ))}
        </div>

        <div className="ios-photo-wrap">
          {s.photo ? (
            <img src={s.photo} alt={s.title} className="ios-photo" />
          ) : s.icon ? (
            <div className="ios-icon-box">{s.icon}</div>
          ) : (
            <div className="ios-icon-box success-box">
              <div className="ios-checkmark">✓</div>
            </div>
          )}
        </div>

        <div className="ios-step-body">
          <div className="ios-step-num">ជំហានទី {s.step}</div>
          <h3 className="ios-step-title khmer">{s.title}</h3>
          <p className="ios-step-sub">{s.subtitle}</p>
          <div className="ios-highlight khmer">{s.highlight}</div>
          <p className="ios-step-desc khmer">{s.desc}</p>
        </div>

        <div className="ios-nav">
          <button
            className="ios-nav-btn prev"
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            <ChevronLeft size={20} />
            <span>ត្រឡប់</span>
          </button>
          {isLast ? (
            <button className="ios-nav-btn finish khmer" onClick={onClose}>
              យល់បាន ✓
            </button>
          ) : (
            <button className="ios-nav-btn next khmer" onClick={() => setIdx(i => Math.min(total - 1, i + 1))}>
              <span>បន្ទាប់</span>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function AndroidModal({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-head">
          <span className="modal-badge android">Android</span>
          <h2 className="modal-title khmer">របៀបដំឡើងកម្មវិធី</h2>
          <button className="modal-x" onClick={onClose}><X size={20} /></button>
        </div>
        <p className="modal-sub khmer">ធ្វើតាមជំហានខាងក្រោម ដើម្បីបន្ថែម KH Invoice ទៅ home screen។</p>
        <div className="modal-steps">
          {androidSteps.map((s, i) => (
            <div key={i} className={`mstep ${open === i ? 'active' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className="mstep-row">
                <span className={`mstep-num ${open === i ? 'on' : ''}`}>{i + 1}</span>
                <div className="mstep-labels">
                  <span className="mstep-title khmer">{s.title}</span>
                  <span className="mstep-sub">{s.sub}</span>
                </div>
              </div>
              {open === i && <p className="mstep-desc khmer">{s.desc}</p>}
            </div>
          ))}
        </div>
        <button className="modal-ok khmer" onClick={onClose}>យល់បាន</button>
      </div>
    </div>
  )
}

export default function InstallModal({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (platform === 'ios') return <IosPhotoGuide onClose={onClose} />
  return <AndroidModal onClose={onClose} />
}
