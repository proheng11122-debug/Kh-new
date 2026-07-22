import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const screenshots = [
  {
    src: 'https://images.pexels.com/photos/669454/pexels-photo-669454.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'ផ្ទាំង Dashboard',
    subtitle: 'មើលស្ថិតិវិក្កយបត្ររួម',
  },
  {
    src: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'បង្កើតវិក្កយបត្រ',
    subtitle: 'បង្កើតវិក្កយបត្រងាយស្រួល',
  },
  {
    src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'គ្រប់គ្រងអតិថិជន',
    subtitle: 'រក្សាទុកព័ត៌មានអតិថិជន',
  },
  {
    src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'របាយការណ៍',
    subtitle: 'មើលរបាយការណ៍ប្រចាំខែ',
  },
]

export default function Screenshots() {
  const [index, setIndex] = useState(0)
  const go = (dir: number) =>
    setIndex((i) => (i + dir + screenshots.length) % screenshots.length)

  return (
    <section className="screenshots-section">
      <div className="section-head">
        <h2 className="section-title khmer">រូបភាពផ្ទាំងកម្មវិធី</h2>
        <p className="section-subtitle">
          មើលផ្ទាំងកម្មវិធីមុនពេលដំឡើង
        </p>
      </div>

      <div className="carousel">
        <button
          className="carousel-arrow prev"
          onClick={() => go(-1)}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-track">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {screenshots.map((s, i) => (
              <div className="screenshot-slide" key={i}>
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <img src={s.src} alt={s.title} loading="lazy" />
                  <div className="phone-caption">
                    <span className="phone-caption-title khmer">{s.title}</span>
                    <span className="phone-caption-sub khmer">{s.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow next"
          onClick={() => go(1)}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-dots">
        {screenshots.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
