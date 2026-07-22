import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from './lib/supabaseClient'

// The app authenticates users by phone number, but Supabase Auth needs an
// email — so we derive a stable fake email from the digits of the phone.
function phoneToEmail(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `${digits}@khinvoice.app`
}

function friendlyError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('already registered') || m.includes('already been registered')) {
    return 'លេខទូរស័ព្ទនេះបានចុះឈ្មោះរួចហើយ។ សូមចូលគណនីវិញ។'
  }
  if (m.includes('invalid login credentials')) {
    return 'លេខទូរស័ព្ទ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។'
  }
  if (m.includes('password') && m.includes('character')) {
    return 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។'
  }
  if (m.includes('network') || m.includes('fetch')) {
    return 'មានបញ្ហាការតភ្ជាប់អ៊ីនធឺណិត។ សូមព្យាយាមម្តងទៀត។'
  }
  return 'មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត។'
}

interface SignInProps {
  onBack: () => void
  onSuccess: () => void
  onSwitchToSignUp: () => void
}

export function SignInForm({ onBack, onSuccess, onSwitchToSignUp }: SignInProps) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!phone.trim() || !password) {
      setError('សូមបំពេញលេខទូរស័ព្ទ និងពាក្យសម្ងាត់។')
      return
    }
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({
      email: phoneToEmail(phone),
      password,
    })
    setLoading(false)
    if (err) {
      setError(friendlyError(err.message))
      return
    }
    onSuccess()
  }

  return (
    <div className="auth-screen">
      <button className="auth-back" onClick={onBack} aria-label="back">
        <ArrowLeft size={20} />
      </button>

      <h2 className="auth-title khmer">ចូលគណនី</h2>
      <p className="auth-subtitle khmer">សូមស្វាគមន៍ត្រឡប់មកវិញ</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label khmer">លេខទូរស័ព្ទ</label>
        <input
          className="auth-input khmer"
          type="tel"
          inputMode="tel"
          placeholder="0XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />

        <label className="auth-label khmer">ពាក្យសម្ងាត់</label>
        <div className="auth-input-wrap">
          <input
            className="auth-input khmer"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button type="button" className="auth-eye" onClick={() => setShowPw((s) => !s)}>
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="auth-error khmer">{error}</p>}

        <button type="submit" className="auth-submit khmer" disabled={loading}>
          {loading ? <Loader2 size={18} className="spin" /> : null}
          {loading ? 'កំពុងចូល...' : 'ចូលគណនី'}
        </button>
      </form>

      <p className="auth-switch khmer">
        មិនទាន់មានគណនី?{' '}
        <button className="auth-link" onClick={onSwitchToSignUp}>
          បង្កើតគណនីថ្មី
        </button>
      </p>
    </div>
  )
}

interface SignUpProps {
  onBack: () => void
  onSuccess: () => void
  onSwitchToSignIn: () => void
}

export function SignUpForm({ onBack, onSuccess, onSwitchToSignIn }: SignUpProps) {
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!businessName.trim() || !phone.trim() || !password) {
      setError('សូមបំពេញព័ត៌មានទាំងអស់។')
      return
    }
    if (password.length < 6) {
      setError('ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។')
      return
    }
    if (password !== confirmPassword) {
      setError('ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។')
      return
    }

    setLoading(true)

    const email = phoneToEmail(phone)
    const { data, error: signUpErr } = await supabase.auth.signUp({ email, password })

    if (signUpErr) {
      setLoading(false)
      setError(friendlyError(signUpErr.message))
      return
    }

    const userId = data.user?.id
    if (userId) {
      const { error: profileErr } = await supabase.from('profiles').insert({
        id: userId,
        business_name: businessName.trim(),
        phone: phone.replace(/\D/g, ''),
      })
      if (profileErr && !profileErr.message.toLowerCase().includes('duplicate')) {
        setLoading(false)
        setError(friendlyError(profileErr.message))
        return
      }
    }

    setLoading(false)
    onSuccess()
  }

  return (
    <div className="auth-screen">
      <button className="auth-back" onClick={onBack} aria-label="back">
        <ArrowLeft size={20} />
      </button>

      <h2 className="auth-title khmer">បង្កើតគណនីថ្មី</h2>
      <p className="auth-subtitle khmer">ចាប់ផ្តើមគ្រប់គ្រងអាជីវកម្មរបស់អ្នក</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label khmer">ឈ្មោះអាជីវកម្ម</label>
        <input
          className="auth-input khmer"
          type="text"
          placeholder="ឧ. ហាងលក់ទំនិញ ស្រីមុំ"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          autoComplete="organization"
        />

        <label className="auth-label khmer">លេខទូរស័ព្ទ</label>
        <input
          className="auth-input khmer"
          type="tel"
          inputMode="tel"
          placeholder="0XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />

        <label className="auth-label khmer">ពាក្យសម្ងាត់</label>
        <div className="auth-input-wrap">
          <input
            className="auth-input khmer"
            type={showPw ? 'text' : 'password'}
            placeholder="យ៉ាងតិច ៦ តួអក្សរ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button type="button" className="auth-eye" onClick={() => setShowPw((s) => !s)}>
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="auth-label khmer">បញ្ជាក់ពាក្យសម្ងាត់</label>
        <input
          className="auth-input khmer"
          type={showPw ? 'text' : 'password'}
          placeholder="វាយពាក្យសម្ងាត់ម្តងទៀត"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        {error && <p className="auth-error khmer">{error}</p>}

        <button type="submit" className="auth-submit khmer" disabled={loading}>
          {loading ? <Loader2 size={18} className="spin" /> : null}
          {loading ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី'}
        </button>
      </form>

      <p className="auth-switch khmer">
        មានគណនីរួចហើយ?{' '}
        <button className="auth-link" onClick={onSwitchToSignIn}>
          ចូលគណនី
        </button>
      </p>
    </div>
  )
}
