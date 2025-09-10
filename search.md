---
layout: default
title: Search
permalink: /search/
---

<div class="container">
  <div class="post-content">
    <header class="post-header">
      <h1 class="post-title">Search Posts</h1>
      <p class="post-excerpt">Find exactly what you're looking for across all our blog posts.</p>
    </header>

    <div class="search-page-content">
      <div class="search-container">
        <input type="search" 
               id="search-input" 
               placeholder="Search posts, tags, and content..." 
               aria-label="Search posts"
               autocomplete="off">
        <div id="search-results" class="search-results-container"></div>
      </div>
      
      <div class="search-help" id="search-help">
        <h3>Search Tips</h3>
        <ul>
          <li>Use quotes for exact phrases: <code>"jekyll tutorial"</code></li>
          <li>Use multiple keywords to narrow results</li>
          <li>Search includes post titles, content, and tags</li>
          <li>Results are ranked by relevance</li>
        </ul>

        <h3>Popular Tags</h3>
        <div class="popular-tags">
          {% assign tag_counts = '' | split: '' %}
          {% for post in site.posts %}
            {% for tag in post.tags %}
              {% assign tag_counts = tag_counts | push: tag %}
            {% endfor %}
          {% endfor %}
          
          {% assign unique_tags = tag_counts | uniq | sort %}
          {% for tag in unique_tags limit: 15 %}
            <a href="#" class="tag-chip" data-search="{{ tag }}">{{ tag }}</a>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.search-page-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) 0;
}

.search-container {
  position: relative;
  margin-bottom: var(--spacing-2xl);
}

.search-container #search-input {
  width: 100%;
  padding: var(--spacing-lg);
  font-size: 1.125rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  background: var(--card-bg);
  color: var(--color-text);
  transition: all var(--transition);
}

.search-container #search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-results-container {
  margin-top: var(--spacing-lg);
  min-height: 200px;
}

.search-help {
  background: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.search-help h3 {
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.search-help ul {
  margin-bottom: var(--spacing-lg);
}

.search-help li {
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
}

.search-help code {
  background: var(--color-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.popular-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.popular-tags .tag-chip {
  cursor: pointer;
  transition: all var(--transition);
}

.popular-tags .tag-chip:hover {
  transform: translateY(-1px);
}

/* Search results styling */
.pagefind-ui__search-input {
  display: none; /* Hide Pagefind's default input since we have our own */
}

.pagefind-ui__results-area {
  margin-top: var(--spacing-lg);
}

.pagefind-ui__result {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  transition: all var(--transition);
}

.pagefind-ui__result:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-1px);
}

.pagefind-ui__result-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.pagefind-ui__result-title a {
  color: var(--color-text);
  text-decoration: none;
}

.pagefind-ui__result-title a:hover {
  color: var(--color-primary);
}

.pagefind-ui__result-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.pagefind-ui__result-excerpt mark {
  background: var(--color-accent);
  color: var(--color-bg);
  padding: 1px 3px;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .search-container #search-input {
    font-size: 1rem;
    padding: var(--spacing-md);
  }
  
  .popular-tags {
    justify-content: center;
  }
}
</style>

<script type="module">
// Enhanced search functionality for the search page
class SearchPage {
  constructor() {
    this.init();
  }

  init() {
    const searchInput = document.getElementById('search-input');
    const searchHelp = document.getElementById('search-help');
    const tagChips = document.querySelectorAll('.popular-tags .tag-chip');
    
    if (!searchInput) return;

    // Initialize Pagefind UI if available
    this.initializePagefind(searchInput);
    
    // Handle tag chip clicks
    tagChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = chip.getAttribute('data-search');
        searchInput.value = tag;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    });

    // Hide help when searching
    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim()) {
        searchHelp.style.display = 'none';
      } else {
        searchHelp.style.display = 'block';
      }
    });

    // Auto-focus search input
    searchInput.focus();
    
    // Handle URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input'));
    }
  }

  async initializePagefind(searchInput) {
    try {
      // Wait for Pagefind to be available
      await this.waitForPagefind();
      
      const pagefind = new PagefindUI({
        element: document.getElementById('search-results'),
        showImages: false,
        showSubResults: true,
        excerptLength: 150,
        resetStyles: false,
        bundlePath: '/blogs/pagefind/' // Adjust for GitHub Pages baseurl
      });
      
      // Connect our input to Pagefind
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query) {
          pagefind.triggerSearch(query);
        } else {
          pagefind.triggerSearch('');
        }
      });
      
      console.log('Pagefind search initialized');
      
    } catch (error) {
      console.warn('Pagefind not available, using fallback search:', error);
      this.initializeFallbackSearch(searchInput);
    }
  }

  waitForPagefind(timeout = 5000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const check = () => {
        if (typeof PagefindUI !== 'undefined') {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Pagefind timeout'));
        } else {
          setTimeout(check, 100);
        }
      };
      
      check();
    });
  }

  initializeFallbackSearch(searchInput) {
    console.log('Using fallback search functionality');
    
    searchInput.addEventListener('input', this.debounce(() => {
      const query = searchInput.value.trim();
      if (query) {
        this.performFallbackSearch(query);
      } else {
        this.clearResults();
      }
    }, 300));
  }

  performFallbackSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
      <div class="search-fallback">
        <p>Search functionality requires JavaScript and Pagefind. Please enable JavaScript or use the tag filters above to browse content.</p>
        <p>Alternatively, you can <a href="/">browse all posts</a> or check out our <a href="/archive/">archive</a>.</p>
      </div>
    `;
  }

  clearResults() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize search page
new SearchPage();
</script>