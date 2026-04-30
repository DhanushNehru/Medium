<div align="center">
  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="DevelopersGlobal Medium" width="100%" style="border-radius: 12px; margin-bottom: 20px;">

  <h1>DevelopersGlobal Medium Showcase</h1>
  <p><strong>A sleek, automated frontend for the DevelopersGlobal Medium publication.</strong></p>

  <p>
    <a href="https://github.com/DevelopersGlobal/Medium/actions"><img src="https://github.com/DevelopersGlobal/Medium/workflows/Auto-Update%20Medium%20Articles/badge.svg" alt="Auto-Update Status"></a>
    <a href="https://medium.com/developersglobal"><img src="https://img.shields.io/badge/Medium-DevelopersGlobal-black?logo=medium" alt="Medium Publication"></a>
  </p>
</div>

## ✨ Overview

This repository powers a dedicated, high-performance web page to showcase the latest articles from the **DevelopersGlobal** Medium publication. 

Instead of relying on rate-limited third-party APIs or struggling with Cross-Origin Resource Sharing (CORS) errors on the frontend, this project uses **GitHub Actions** to fetch, parse, and serve the articles statically.

### Key Features
- 🚀 **Lightning Fast**: Articles are pre-fetched and saved as a static JSON file. Zero server delays.
- 🎨 **Premium Aesthetic**: A custom, responsive UI with dark mode, glassmorphism elements, and subtle micro-animations.
- 🤖 **Zero-Maintenance**: A GitHub Actions workflow automatically updates the site every 6 hours with the 9 most recent articles.
- 💀 **Skeleton Loaders**: Provides a polished user experience even while the client loads the data.

## 🛠️ Architecture

The system consists of three main parts:
1. **The Fetcher (`scripts/fetch-articles.js`)**: A Node.js script using `rss-parser` to scrape the Medium RSS feed (`https://medium.com/feed/developersglobal`), extract images and text snippets, and generate a clean `data/articles.json` file.
2. **The Automator (`.github/workflows/update.yml`)**: A cron-based GitHub Action that runs the fetcher. If new articles are detected, it commits and pushes the updated JSON file directly back to the `main` branch.
3. **The Presenter (`index.html` & `js/app.js`)**: A Vanilla JS frontend hosted on GitHub Pages that reads the static `articles.json` and dynamically constructs the article cards.

## 🚀 Getting Started (Local Development)

If you'd like to run or modify this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevelopersGlobal/Medium.git
   cd Medium
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Fetch the latest articles**:
   ```bash
   node scripts/fetch-articles.js
   ```

4. **Serve the site locally**:
   Use any static file server. For example:
   ```bash
   npx serve .
   ```
   *Then open `http://localhost:3000` in your browser.*

## 🤝 Contributing

Contributions are welcome! If you have ideas for improving the UI, optimizing the script, or adding new features (like category filtering), feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built for the <strong><a href="https://github.com/DevelopersGlobal">DevelopersGlobal</a></strong> community.</p>
</div>
