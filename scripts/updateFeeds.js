const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();

const RSS_FEEDS = [
  {
    "url": "https://www.theblock.co/rss.xml",
    "source": "The Block"
  },
  {
    "url": "https://decrypt.co/feed",
    "source": "Decrypt"
  },
  {
    "url": "https://cointelegraph.com/rss/tag/nft",
    "source": "Cointelegraph NFT"
  },
  {
    "url": "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml&tag=DeFi",
    "source": "CoinDesk DeFi"
  },
  {
    "url": "https://defillama.com/rss.xml",
    "source": "DeFi Llama"
  }
];

async function fetchAllFeeds() {
  const allItems = [];

  for (const feedConfig of RSS_FEEDS) {
    try {
      console.log(`Fetching from ${feedConfig.source}...`);
      const feed = await parser.parseURL(feedConfig.url);

      const items = feed.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        source: feedConfig.source,
        contentSnippet: item.contentSnippet?.substring(0, 200) || item.summary?.substring(0, 200) || ''
      }));

      allItems.push(...items);
    } catch (error) {
      console.error(`Error fetching ${feedConfig.source}:`, error.message);
    }
  }

  // Sort by date (newest first)
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Take top 50 items
  const topItems = allItems.slice(0, 50);

  // Save to JSON file
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'news.json');
  fs.writeFileSync(outputPath, JSON.stringify(topItems, null, 2));

  console.log(`✅ Successfully saved ${topItems.length} news items to ${outputPath}`);
}

fetchAllFeeds().catch(console.error);
