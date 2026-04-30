const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded']
    ]
  }
});

const FEED_URL = 'https://medium.com/feed/developersglobal';
const OUTPUT_FILE = path.join(__dirname, '../data/articles.json');

// Extract image from HTML content
function extractImage(content) {
  if (!content) return null;
  const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  const match = imgRegex.exec(content);
  return match ? match[1] : null;
}

// Extract a short plain-text snippet from HTML content
function extractSnippet(content, maxLength = 150) {
  if (!content) return '';
  // Remove HTML tags
  let text = content.replace(/<\/?[^>]+(>|$)/g, "");
  // Replace multiple spaces/newlines with a single space
  text = text.replace(/\s+/g, ' ').trim();
  
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

async function fetchArticles() {
  try {
    console.log(`Fetching RSS feed from ${FEED_URL}...`);
    const feed = await parser.parseURL(FEED_URL);
    
    console.log(`Found ${feed.items.length} articles.`);
    
    const articles = feed.items.map(item => {
      // The medium feed gives content in contentEncoded or content
      const htmlContent = item.contentEncoded || item.content || '';
      
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.creator || item.author,
        categories: item.categories || [],
        thumbnail: extractImage(htmlContent) || '',
        snippet: extractSnippet(htmlContent, 180),
        guid: item.guid
      };
    });
    
    // Save to JSON
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
      publication: feed.title,
      description: feed.description,
      lastUpdate: new Date().toISOString(),
      articles: articles
    }, null, 2));
    
    console.log(`Successfully saved ${articles.length} articles to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    process.exit(1);
  }
}

fetchArticles();
