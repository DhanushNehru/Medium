document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('articles-grid');
    const pubTitle = document.getElementById('pub-title');
    const pubDesc = document.getElementById('pub-desc');
    const lastUpdated = document.getElementById('last-updated');
    const template = document.getElementById('article-template');

    // Default image if thumbnail is not available
    const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    async function loadArticles() {
        try {
            const response = await fetch('data/articles.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update Header Info
            if (data.publication) {
                // Remove " - Medium" suffix if it exists
                pubTitle.textContent = data.publication.replace(' - Medium', '');
            }
            
            if (data.description) {
                pubDesc.textContent = data.description.replace(' - Medium', '');
            }
            
            if (data.lastUpdate) {
                const date = new Date(data.lastUpdate);
                lastUpdated.textContent = `Last updated: ${date.toLocaleString()}`;
            }

            // Clear Skeletons
            grid.innerHTML = '';

            // Render Articles
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach((article, index) => {
                    // Create a clone of the template
                    const clone = template.content.cloneNode(true);
                    
                    // Populate data
                    const card = clone.querySelector('.article-card');
                    card.style.animationDelay = `${index * 0.1}s`;
                    
                    const link = clone.querySelector('.article-link');
                    link.href = article.link;
                    
                    const img = clone.querySelector('img');
                    img.src = article.thumbnail || FALLBACK_IMAGE;
                    
                    // Format Date
                    const pubDateStr = clone.querySelector('.article-date');
                    const date = new Date(article.pubDate);
                    pubDateStr.textContent = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    clone.querySelector('.article-author').textContent = article.author || '';
                    clone.querySelector('.article-title').textContent = article.title;
                    clone.querySelector('.article-snippet').textContent = article.snippet;
                    
                    // Add tags
                    const tagsContainer = clone.querySelector('.article-tags');
                    if (article.categories && article.categories.length > 0) {
                        // Take up to 3 tags
                        article.categories.slice(0, 3).forEach(tag => {
                            const span = document.createElement('span');
                            span.className = 'tag';
                            span.textContent = tag;
                            tagsContainer.appendChild(span);
                        });
                    }
                    
                    grid.appendChild(clone);
                });
            } else {
                grid.innerHTML = '<div class="no-articles">No articles found.</div>';
            }
            
        } catch (error) {
            console.error('Error loading articles:', error);
            grid.innerHTML = `
                <div style="text-align: center; grid-column: 1/-1; padding: 3rem;">
                    <h3>Failed to load articles</h3>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">Please make sure the GitHub Actions have run and generated the data/articles.json file.</p>
                </div>
            `;
        }
    }

    loadArticles();
});
