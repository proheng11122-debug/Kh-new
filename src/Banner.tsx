import React from 'react'

const Battambang: React.CSSProperties = { fontFamily: "'Battambang', sans-serif" }

const FeatureBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    padding: '6px 12px',
    borderRadius: 20,
    whiteSpace: 'nowrap',
  }}>{children}</div>
)

const RowItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{
    display: 'flex',
    padding: '4px 6px',
    fontSize: 6,
    borderTop: '0.5px solid #EFEDE5',
    color: '#0B2A4A',
  }}>
    <span style={{ flex: 2 }}>{label}</span>
    <span style={{ flex: 1, textAlign: 'right' }}>{value}</span>
  </div>
)

const StatBar: React.FC<{ label: string; value: string; color: string; track: string; width: string }> = ({ label, value, color, track, width }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6.5, marginBottom: 2 }}>
      <span style={{ color: '#0B2A4A' }}>{label}</span>
      <span style={{ color, fontWeight: 700 }}>{value}</span>
    </div>
    <div style={{ height: 4, borderRadius: 3, background: track, marginBottom: 6 }}>
      <div style={{ width, height: 4, borderRadius: 3, background: color }} />
    </div>
  </>
)

const ReportBar: React.FC<{ label: string; value: string; width: string }> = ({ label, value, width }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 5.5, marginBottom: 2 }}>
      <span style={{ color: '#0B2A4A' }}>{label}</span>
      <span style={{ color: '#378ADD', fontWeight: 700 }}>{value}</span>
    </div>
    <div style={{ height: 3, borderRadius: 2, background: '#E6F1FB', marginBottom: 5 }}>
      <div style={{ width, height: 3, borderRadius: 2, background: '#378ADD' }} />
    </div>
  </>
)

const InvoiceCard: React.FC = () => (
  <div style={{ width: 150, transform: 'translateY(18px) rotate(-6deg)', zIndex: 1 }}>
    <div style={{ background: '#08213A', borderRadius: 20, padding: 5, boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}>
      <div style={{ background: '#FAFAF8', borderRadius: 15, overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg,#0C447C,#0B2A4A)',
          padding: '14px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ color: '#fff', fontSize: 7, fontWeight: 700 }}>INVOICE #0139</div>
          <div style={{ color: '#D9A441', fontSize: 8, fontWeight: 700 }}>$1,280</div>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ background: '#fff', borderRadius: 8, border: '0.5px solid #E5E3DA', overflow: 'hidden' }}>
            <RowItem label="កាហ្វេទឹកកក" value="$300" />
            <RowItem label="ខូគី" value="$180" />
            <RowItem label="នំបុ័ង" value="$800" />
          </div>
          <div style={{
            background: '#0B2A4A',
            borderRadius: 7,
            padding: 6,
            marginTop: 6,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 6, color: '#fff' }}>សរុប</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#D9A441' }}>$1,280</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const DashboardCard: React.FC = () => (
  <div style={{ width: 172, zIndex: 2, margin: '0 -6px' }}>
    <div style={{ background: '#08213A', borderRadius: 26, padding: 6, boxShadow: '0 24px 50px rgba(0,0,0,0.4)' }}>
      <div style={{ background: '#FAFAF8', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg,#0C447C,#0B2A4A)', padding: '12px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 9, fontWeight: 700, flexShrink: 0,
            }}>D</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: 8.5, fontWeight: 700, whiteSpace: 'nowrap' }}>ហាងកាហ្វេ ដានី</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 6.5 }}>012 345 678</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 5.5, marginTop: 6 }}>អង្គារ ២១ កក្កដា | ១២:២៤:០៧</div>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ background: 'linear-gradient(135deg,#0C447C,#0B2A4A)', borderRadius: 14, padding: 11 }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 6.5 }}>សមតុល្យសរុប (Total Balance)</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 6 }}>USD</div>
                <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>$2,480.50</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 6 }}>KHR</div>
                <div style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>1,240,000 ៛</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 9, marginTop: 7 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: '#0B2A4A', marginBottom: 6 }}>ស្ថិតិសរុប — កក្កដា ២០២៦</div>
            <StatBar label="ចំណូលខែនេះ" value="$3,120.00" color="#1F9D6B" track="#E1F5EE" width="80%" />
            <StatBar label="ចំណាយខែនេះ" value="$640.00" color="#E5533D" track="#FAECE7" width="35%" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ReportCard: React.FC = () => (
  <div style={{ width: 150, transform: 'translateY(18px) rotate(6deg)', zIndex: 1 }}>
    <div style={{ background: '#08213A', borderRadius: 20, padding: 5, boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}>
      <div style={{ background: '#FAFAF8', borderRadius: 15, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg,#0C447C,#0B2A4A)', padding: '14px 8px' }}>
          <div style={{ color: '#fff', fontSize: 8, fontWeight: 700 }}>របាយការណ៍</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 6 }}>កក្កដា ២០២៦</div>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 6, fontWeight: 700, color: '#0B2A4A', marginBottom: 5 }}>អតិថិជនកំពូល</div>
            <ReportBar label="សុខា ត្រេង" value="$1,280" width="90%" />
            <ReportBar label="ដារ៉ា ម៉េង" value="$860" width="60%" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Banner: React.FC = () => (
  <div style={{
    ...Battambang,
    background: 'linear-gradient(160deg,#0B2A4A,#0C447C 55%,#0B2A4A)',
    borderRadius: 20,
    padding: '36px 24px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 460,
    boxSizing: 'border-box',
  }}>
    <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
      រូបភាព design ពេញលេញសម្រាប់ផ្សព្វផ្សាយ app KH Invoice កំណែទី២
    </h2>

    <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: -80, right: -60 }} />
    <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(217,164,65,0.12)', bottom: -40, left: -30 }} />

    <div style={{ position: 'relative', textAlign: 'center', marginBottom: 28 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: '#D9A441',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 10px',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#0B2A4A" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h4" stroke="#0B2A4A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: 0.5 }}>KH INVOICE</div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>វិក្កយបត្រ និង គ្រប់គ្រងទិន្នន័យអាជីវកម្មគ្រប់ប្រភេទ</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        <FeatureBadge>$ ពហុរូបិយប័ណ្ណ</FeatureBadge>
        <FeatureBadge>☁ ធានាទិន្នន័យស្វ័យប្រវត្តិ</FeatureBadge>
        <FeatureBadge>ខ្មែរ / EN</FeatureBadge>
      </div>
    </div>

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
      <InvoiceCard />
      <DashboardCard />
      <ReportCard />
    </div>

    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 18, marginTop: 32, flexWrap: 'wrap' }}>
      <div style={{ color: '#fff', fontSize: 11 }}>📄 វិក្កយបត្រលឿន</div>
      <div style={{ color: '#fff', fontSize: 11 }}>📦 គ្រប់គ្រងស្តុក</div>
      <div style={{ color: '#fff', fontSize: 11 }}>📊 របាយការណ៍លម្អិត</div>
      <div style={{ color: '#fff', fontSize: 11 }}>💰 តាមដានលុយ</div>
    </div>
  </div>
)

export default Banner
