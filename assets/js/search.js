// Basic search functionality (will be enhanced with Pagefind)
class Search {
  constructor() {
    this.init();
  }

  init() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) {
      return;
    }

    this.searchInput = searchInput;
    this.searchResults = searchResults;
    this.isPagefindLoaded = false;
    
    // Initialize search functionality
    this.setupEventListeners();
    
    // Try to initialize Pagefind
    this.initializePagefind();
  }

  setupEventListeners() {
    // Handle input
    this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    
    // Handle focus and blur
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.trim()) {
        this.showResults();
      }
    });
    
    this.searchInput.addEventListener('blur', () => {
      // Delay hiding to allow for click events
      setTimeout(() => {
        this.hideResults();
      }, 200);
    });
    
    // Handle escape key
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
        this.searchInput.blur();
      }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults?.contains(e.target)) {
        this.hideResults();
      }
    });
  }

  async initializePagefind() {
    try {
      // Check if Pagefind is available
      if (typeof PagefindUI !== 'undefined') {
        this.setupPagefind();
      } else {
        // Fallback to basic search
        this.setupBasicSearch();
      }
    } catch (error) {
      console.warn('Pagefind not available, using basic search:', error);
      this.setupBasicSearch();
    }
  }

  setupPagefind() {
    try {
      // Initialize Pagefind UI
      const pagefind = new PagefindUI({
        element: this.searchResults,
        showImages: false,
        showSubResults: true,
        excerptLength: 120,
        resetStyles: true
      });
      
      this.isPagefindLoaded = true;
      this.searchInput.placeholder = 'Search posts with Pagefind...';
      
      console.log('Pagefind search initialized');
    } catch (error) {
      console.warn('Failed to initialize Pagefind:', error);
      this.setupBasicSearch();
    }
  }

  setupBasicSearch() {
    this.searchInput.placeholder = 'Search posts...';
    console.log('Using basic search functionality');
  }

  async handleSearch(event) {
    const query = event.target.value.trim();
    
    if (!query) {
      this.hideResults();
      return;
    }

    if (this.isPagefindLoaded) {
      // Pagefind handles its own UI
      return;
    }
    
    // Basic search fallback
    await this.performBasicSearch(query);
  }

  async performBasicSearch(query) {
    try {
      this.showLoadingState();
      
      // Simple search through page content (fallback)
      const results = await this.searchPageContent(query);
      this.displayResults(results, query);
      
    } catch (error) {
      console.error('Search error:', error);
      this.showErrorState();
    }
  }

  async searchPageContent(query) {
    // Basic search through available content
    const results = [];
    const queryLower = query.toLowerCase();
    
    // First, try to search through any existing post data on the page
    const postCards = document.querySelectorAll('.post-card');
    
    if (postCards.length > 0) {
      // We're on a page with post cards, search through them
      postCards.forEach((card, index) => {
        const title = card.querySelector('.post-card-title a')?.textContent || '';
        const excerpt = card.querySelector('.post-card-excerpt')?.textContent || '';
        const tags = card.getAttribute('data-tags') || '';
        
        const searchText = `${title} ${excerpt} ${tags}`.toLowerCase();
        
        if (searchText.includes(queryLower)) {
          const url = card.querySelector('.post-card-title a')?.getAttribute('href');
          if (url) {
            results.push({
              title,
              excerpt: excerpt.substring(0, 120) + '...',
              url,
              relevance: this.calculateRelevance(searchText, queryLower)
            });
          }
        }
      });
    } else {
      // We're likely on the search page, fetch posts via the site structure
      const samplePosts = [
        {
          title: "Test",
          excerpt: "This is a sample post to test the features with both tutorial content and podcast tag.",
          url: "/polymath/2025/09/10/test/",
          tags: "tutorial jekyll web-development formatting podcast"
        },
        {
          title: "Getting Started with Jekyll",
          excerpt: "Learn how to build static websites with Jekyll, the powerful static site generator.",
          url: "/polymath/2024/09/08/getting-started-with-jekyll/",
          tags: "jekyll tutorial web-development static-site"
        },
        {
          title: "Welcome to the Blog",
          excerpt: "Welcome to our new blog where we'll share insights about web development and technology.",
          url: "/polymath/2024/09/10/welcome-to-the-blog/",
          tags: "welcome introduction blog"
        },
        {
          title: "Building a Webcam CCTV Recorder using Flask",
          excerpt: "Learn how to create a webcam CCTV recording system using Python Flask.",
          url: "/polymath/2025/09/14/building-a-webcam-cctv-recorder-using-flask/",
          tags: "python flask webcam cctv tutorial"
        },
        {
          title: "Podcast Test",
          excerpt: "This is a test podcast post to check the podcast functionality.",
          url: "/polymath/2025/01/15/podcast-test/",
          tags: "podcast test audio"
        }
      ];
      
      samplePosts.forEach(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.tags}`.toLowerCase();
        
        if (searchText.includes(queryLower)) {
          results.push({
            title: post.title,
            excerpt: post.excerpt,
            url: post.url,
            relevance: this.calculateRelevance(searchText, queryLower)
          });
        }
      });
    }
    
    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
  }

  calculateRelevance(text, query) {
    const titleMatch = text.includes(query) ? 10 : 0;
    const wordMatches = query.split(' ').filter(word => text.includes(word)).length;
    return titleMatch + wordMatches;
  }

  displayResults(results, query) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No results found for "${query}"</p>
        </div>
      `;
    } else {
      const resultsHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
          <h4 class="search-result-title">${this.highlightQuery(result.title, query)}</h4>
          <p class="search-result-excerpt">${this.highlightQuery(result.excerpt, query)}</p>
        </a>
      `).join('');
      
      this.searchResults.innerHTML = `
        <div class="search-results-header">
          <p>${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</p>
        </div>
        ${resultsHTML}
      `;
    }
    
    this.showResults();
  }

  highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showLoadingState() {
    if (!this.searchResults) return;
    
    this.searchResults.innerHTML = `
      <div class="search-loading">
        <p>Searching...</p>
      </div>
    `;
    this.showResults();
  }

  showErrorState() {
    if (!this.searchResults) return;
    
    this.searchResults.innerHTML = `
      <div class="search-error">
        <p>Search temporarily unavailable. Please try again.</p>
      </div>
    `;
    this.showResults();
  }

  showResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'block';
    }
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }

  clearSearch() {
    this.searchInput.value = '';
    this.hideResults();
  }

  // Utility function to debounce search input
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

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Search());
} else {
  new Search();
}