import fs from 'fs'
import path from 'path'

interface NewsItem {
  title: string
  link: string
  pubDate: string
  source: string
  contentSnippet?: string
}

export default function Home() {
  let newsItems: NewsItem[] = []

  try {
    const dataPath = path.join(process.cwd(), 'data', 'news.json')
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    newsItems = JSON.parse(fileContents)
  } catch (error) {
    console.log('News data not found, using sample data')
    newsItems = [
      {
        title: 'サンプルニュース: Next.js 14リリース',
        link: '#',
        pubDate: new Date().toISOString(),
        source: 'Tech Blog',
        contentSnippet: 'Next.js 14がリリースされました。パフォーマンスとDXの向上が特徴です。'
      }
    ]
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>Tech News Hub</h1>
          <p>最新技術ニュースを毎日自動更新</p>
        </div>
      </header>

      <main className="container">
        {/* AdSense広告枠（将来的に実装） */}
        <div className="ad-placeholder">
          Google AdSense広告エリア（申請後に実装）
        </div>

        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article key={index} className="news-card">
              <h2>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h2>
              <div className="news-meta">
                <span className="news-source">{item.source}</span>
                <time>{new Date(item.pubDate).toLocaleDateString('ja-JP')}</time>
              </div>
              {item.contentSnippet && (
                <p className="news-description">{item.contentSnippet}</p>
              )}
            </article>
          ))}
        </div>

        {/* AdSense広告枠（将来的に実装） */}
        <div className="ad-placeholder">
          Google AdSense広告エリア（申請後に実装）
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Tech News Hub - 技術ニュースアグリゲーター</p>
      </footer>
    </>
  )
}
