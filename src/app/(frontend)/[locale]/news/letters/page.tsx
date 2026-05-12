import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/payload-types'

const getLetters = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 12,
      depth: 1,
    })
    return docs as Post[]
  },
  ['missionary-letters'],
  { tags: ['posts'] },
)

export default async function LettersPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const posts = await getLetters().catch(() => [] as Post[])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教士代禱信' : 'Missionary Letters'}
        </h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh ? '來自前線宣教士的最新消息與代禱事項' : 'Latest updates and prayer requests from our missionaries'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {!posts.length ? (
          <p className="text-center text-gray-400 py-12" style={{ fontFamily: font }}>
            {isZh ? '最新代禱信即將發布' : 'Missionary letters coming soon'}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const image = typeof post.heroImage === 'object' && post.heroImage !== null
                ? post.heroImage : null
              return (
                <Link
                  key={post.id}
                  href={`/${locale}/posts/${post.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 bg-gray-100">
                    {image && (image as any).url ? (
                      <Image src={(image as any).url} alt={post.title} fill className="object-cover" sizes="33vw" />
                    ) : (
                      <div className="w-full h-full bg-purple-50" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: font }}>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(isZh ? 'zh-TW' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        : ''}
                    </p>
                    <h2 className="font-bold leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                      {post.title}
                    </h2>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
