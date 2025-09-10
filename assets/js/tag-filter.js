// Tag filtering functionality
class TagFilter {
  constructor() {
    this.init();
  }

  init() {
    const tagButtons = document.querySelectorAll('.tag-chip[data-tag]');
    const postsContainer = document.getElementById('posts-container');
    
    if (!tagButtons.length || !postsContainer) {
      return;
    }

    this.postsContainer = postsContainer;
    this.posts = Array.from(postsContainer.querySelectorAll('.post-card'));
    
    // Add click event listeners to tag buttons
    tagButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleTagClick(button);
      });
    });

    // Handle URL hash on page load
    this.handleInitialHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });
  }

  handleTagClick(clickedButton) {
    const tag = clickedButton.getAttribute('data-tag');
    
    // Update active state
    this.updateActiveTag(clickedButton);
    
    // Filter posts
    this.filterPosts(tag);
    
    // Update URL hash
    this.updateHash(tag);
    
    // Announce change for screen readers
    this.announceFilterChange(tag);
  }

  updateActiveTag(activeButton) {
    // Remove active class from all buttons
    document.querySelectorAll('.tag-chip[data-tag]').forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-pressed', 'true');
  }

  filterPosts(tag) {
    this.posts.forEach(post => {
      if (tag === 'all') {
        this.showPost(post);
      } else {
        const postTags = post.getAttribute('data-tags');
        if (postTags && postTags.includes(tag)) {
          this.showPost(post);
        } else {
          this.hidePost(post);
        }
      }
    });
    
    // Check if any posts are visible
    const visiblePosts = this.posts.filter(post => !post.classList.contains('hidden'));
    
    if (visiblePosts.length === 0) {
      this.showNoResults();
    } else {
      this.hideNoResults();
    }
  }

  showPost(post) {
    post.classList.remove('hidden');
    post.style.display = '';
    
    // Animate in
    requestAnimationFrame(() => {
      post.style.opacity = '1';
      post.style.transform = 'translateY(0)';
    });
  }

  hidePost(post) {
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    
    // Hide after animation
    setTimeout(() => {
      post.classList.add('hidden');
      post.style.display = 'none';
    }, 150);
  }

  showNoResults() {
    let noResults = document.getElementById('no-results');
    
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.id = 'no-results';
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <div class="no-results-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No posts found</h3>
          <p>Try selecting a different tag or <button class="reset-filter" onclick="tagFilter.resetFilter()">show all posts</button>.</p>
        </div>
      `;
      this.postsContainer.appendChild(noResults);
      
      // Add styles
      noResults.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: var(--color-text-secondary);
      `;
    }
    
    noResults.style.display = 'block';
  }

  hideNoResults() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.style.display = 'none';
    }
  }

  resetFilter() {
    const allButton = document.querySelector('.tag-chip[data-tag="all"]');
    if (allButton) {
      this.handleTagClick(allButton);
    }
  }

  updateHash(tag) {
    const newHash = tag === 'all' ? '' : `#tag-${tag}`;
    
    // Update URL without triggering hashchange event
    if (window.location.hash !== newHash) {
      history.replaceState(null, null, newHash || window.location.pathname);
    }
  }

  handleInitialHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#tag-')) {
      const tag = hash.replace('#tag-', '');
      const tagButton = document.querySelector(`.tag-chip[data-tag="${tag}"]`);
      if (tagButton) {
        this.handleTagClick(tagButton);
      }
    }
  }

  handleHashChange() {
    this.handleInitialHash();
  }

  announceFilterChange(tag) {
    // Create or update live region for screen readers
    let liveRegion = document.getElementById('filter-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'filter-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    const visibleCount = this.posts.filter(post => !post.classList.contains('hidden')).length;
    const message = tag === 'all' 
      ? `Showing all ${visibleCount} posts`
      : `Filtered to ${visibleCount} posts tagged "${tag}"`;
    
    liveRegion.textContent = message;
  }
}

// Initialize tag filtering
const tagFilter = new TagFilter();

// Export for global access
window.tagFilter = tagFilter;