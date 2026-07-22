import { useEffect, useState } from 'react'
import { Receipt, Package, BarChart3, User as UserIcon } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import InvoiceOverview from './components/InvoiceOverview'
import InvoiceScreen from './components/InvoiceScreen'
import StockScreen from './components/StockScreen'
import ReportScreen from './components/ReportScreen'
import AccountScreen from './components/AccountScreen'
import SubscriptionModal from './components/SubscriptionModal'
import { COLORS } from './lib/theme'

type Tab = 'invoices' | 'stock' | 'report' | 'account'
type InvoiceView = 'list' | 'editor'

export interface Profile {
  id: string
  business_name: string | null
  username: string | null
  phone: string | null
  is_locked: boolean | null
  trial_started_at: string | null
  qr_code_url: string | null
  avatar_url: string | null
  subscription_qr_url: string | null
}

interface Props {
  onLogout: () => void
}

const TABS: { key: Tab; icon: typeof Receipt; labelKh: string; labelEn: string }[] = [
  { key: 'invoices', icon: Receipt, labelKh: 'វិក្កយបត្រ', labelEn: 'Invoices' },
  { key: 'stock', icon: Package, labelKh: 'ស្តុក', labelEn: 'Stock' },
  { key: 'report', icon: BarChart3, labelKh: 'របាយការណ៍', labelEn: 'Reports' },
  { key: 'account', icon: UserIcon, labelKh: 'គណនី', labelEn: 'Account' },
]

function getTrialDaysRemaining(trialStartedAt: string | null): number {
  const TRIAL_DAYS = 30
  if (!trialStartedAt) return TRIAL_DAYS
  const start = new Date(trialStartedAt).getTime()
  const now = Date.now()
  const elapsedDays = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return Math.max(0, TRIAL_DAYS - elapsedDays)
}

export default function Dashboard({ onLogout }: Props) {
  const [lang, setLang] = useState<'KH' | 'EN'>('KH')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [tab, setTab] = useState<Tab>('invoices')
  const [invoiceView, setInvoiceView] = useState<InvoiceView>('list')
  const [editInvoiceId, setEditInvoiceId] = useState<string | null>(null)

  const [showSubscription, setShowSubscription] = useState(false)

  const loadProfile = async () => {
    setLoading(true)
    setLoadError('')
    const { data: userData } = await supabase.auth.getUser()
    const uid = userData.user?.id
    if (!uid) {
      setLoading(false)
      return
    }
    const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()
    if (error) {
      setLoadError(error.message)
      setLoading(false)
      return
    }
    if (data) {
      setProfile(data as Profile)
    } else {
      // Safety net: a profile row should already exist from sign-up, but
      // create one on the fly if it's somehow missing so the app never
      // gets stuck on a blank screen.
      const { data: created, error: createErr } = await supabase
        .from('profiles')
        .insert({ id: uid })
        .select()
        .single()
      if (!createErr) setProfile(created as Profile)
      else setLoadError(createErr.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const goHome = (t: Tab) => {
    setTab(t)
    setInvoiceView('list')
    setEditInvoiceId(null)
  }

  if (loading) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${COLORS.navyGradientStart}, ${COLORS.navyGradientEnd})` }}
      >
        <div
          className="w-10 h-10 rounded-full border-4 border-white/25"
          style={{ borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }}
        />
      </div>
    )
  }

  if (loadError || !profile) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: `linear-gradient(160deg, ${COLORS.navyGradientStart}, ${COLORS.navyGradientEnd})` }}
      >
        <p className="text-white text-sm khmer">
          {lang === 'KH' ? 'មិនអាចផ្ទុកគណនីបានទេ' : 'Could not load your account'}
        </p>
        {loadError && <p className="text-white/60 text-xs">{loadError}</p>}
        <button
          className="px-5 py-2.5 rounded-xl bg-white text-sm font-bold"
          style={{ color: COLORS.navy }}
          onClick={loadProfile}
        >
          {lang === 'KH' ? 'ព្យាយាមម្តងទៀត' : 'Try again'}
        </button>
        <button className="text-white/70 text-xs underline" onClick={onLogout}>
          {lang === 'KH' ? 'ចាកចេញ' : 'Sign out'}
        </button>
      </div>
    )
  }

  const trialDaysRemaining = getTrialDaysRemaining(profile.trial_started_at)

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: COLORS.bgApp }}>
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === 'invoices' && invoiceView === 'list' && (
          <InvoiceOverview
            lang={lang}
            onBack={() => {}}
            onEditInvoice={(id) => {
              setEditInvoiceId(id)
              setInvoiceView('editor')
            }}
            onPreviewInvoice={(id) => {
              setEditInvoiceId(id)
              setInvoiceView('editor')
            }}
            onCreateInvoice={() => {
              setEditInvoiceId(null)
              setInvoiceView('editor')
            }}
          />
        )}

        {tab === 'invoices' && invoiceView === 'editor' && (
          <InvoiceScreen
            lang={lang}
            profile={profile}
            editInvoiceId={editInvoiceId}
            onBack={() => setInvoiceView('list')}
          />
        )}

        {tab === 'stock' && <StockScreen lang={lang} onBack={() => goHome('invoices')} />}

        {tab === 'report' && <ReportScreen lang={lang} profile={profile} onBack={() => goHome('invoices')} />}

        {tab === 'account' && (
          <AccountScreen
            lang={lang}
            profile={profile}
            onBack={() => goHome('invoices')}
            onLogout={onLogout}
            onLangToggle={() => setLang((l) => (l === 'KH' ? 'EN' : 'KH'))}
            onProfileUpdated={(p) => setProfile(p as Profile)}
            onOpenSubscription={() => setShowSubscription(true)}
          />
        )}
      </div>

      {/* Bottom tab bar */}
      <div
        className="flex-shrink-0 flex items-stretch border-t"
        style={{
          borderColor: COLORS.border,
          backgroundColor: '#FFFFFF',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS.map((t) => {
          const active = tab === t.key
          const Icon = t.icon
          return (
            <button
              key={t.key}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5"
              onClick={() => goHome(t.key)}
            >
              <Icon size={22} color={active ? COLORS.navy : COLORS.muted} strokeWidth={active ? 2.4 : 2} />
              <span
                className="text-[11px] khmer"
                style={{ color: active ? COLORS.navy : COLORS.muted, fontWeight: active ? 700 : 500 }}
              >
                {lang === 'KH' ? t.labelKh : t.labelEn}
              </span>
            </button>
          )
        })}
      </div>

      {showSubscription && (
        <SubscriptionModal
          lang={lang}
          profile={profile}
          trialDaysRemaining={trialDaysRemaining}
          onClose={() => setShowSubscription(false)}
          onOpenTelegram={() => window.open('https://t.me/kh_invoice_support', '_blank')}
        />
      )}
    </div>
  )
}
