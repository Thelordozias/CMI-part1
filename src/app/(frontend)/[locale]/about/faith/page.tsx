import { getLocale } from 'next-intl/server'

export default async function FaithPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const articles = isZh
    ? [
        { title: '聖經', body: '我們相信聖經舊約和新約是神的默示，完全可靠，是信仰與生活的最高準則。' },
        { title: '神', body: '我們相信三位一體的神——父、子、聖靈，三位一體，永恆、全能、全知、全在。' },
        { title: '耶穌基督', body: '我們相信耶穌基督是神子，藉著童貞女所生，過無罪的生活，為我們的罪死在十字架上，第三天身體復活，升天後坐在父神的右邊。' },
        { title: '聖靈', body: '我們相信聖靈是神，住在每位信徒的心中，賜力量給基督徒過聖潔的生活和有效地為主服事。' },
        { title: '救恩', body: '我們相信人因信靠耶穌基督得救，這是出於恩典，不是出於行為，使人得永生。' },
        { title: '教會', body: '我們相信教會是基督的身體，由所有真信徒組成。地方教會是信徒在一起敬拜、成長和服事的群體。' },
        { title: '基督再來', body: '我們相信耶穌基督會再來，審判活人死人，建立永恆的國度。' },
      ]
    : [
        { title: 'The Bible', body: 'We believe the Bible, consisting of the Old and New Testaments, is the inspired Word of God, fully reliable, and the supreme authority in all matters of faith and practice.' },
        { title: 'God', body: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit — eternal, omnipotent, omniscient, and omnipresent.' },
        { title: 'Jesus Christ', body: 'We believe Jesus Christ is the Son of God, born of a virgin, lived a sinless life, died on the cross for our sins, rose bodily on the third day, and ascended to the right hand of the Father.' },
        { title: 'The Holy Spirit', body: 'We believe the Holy Spirit is God, indwells every believer, and empowers Christians to live holy lives and serve effectively.' },
        { title: 'Salvation', body: 'We believe salvation is by grace through faith in Jesus Christ alone — not by works — resulting in eternal life.' },
        { title: 'The Church', body: 'We believe the Church is the body of Christ, consisting of all true believers. The local church is the community of believers gathered for worship, growth, and service.' },
        { title: 'The Return of Christ', body: 'We believe in the personal, bodily return of Jesus Christ to judge the living and the dead and to establish His eternal kingdom.' },
      ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '信仰告白' : 'Statement of Faith'}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
        {articles.map((a, i) => (
          <section key={i} className="flex gap-5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
              style={{ backgroundColor: '#6B21A8' }}
            >
              {i + 1}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                {a.title}
              </h2>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: font }}>
                {a.body}
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
