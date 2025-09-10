---
layout: default
title: Archive
permalink: /archive/
---

<div class="container">
  <div class="post-content">
    <header class="post-header">
      <h1 class="post-title">Post Archive</h1>
      <p class="post-excerpt">Browse all {{ site.posts.size }} blog posts organized by date and category.</p>
    </header>

    <div class="archive-content">
      <!-- Archive Statistics -->
      <div class="archive-stats">
        <div class="stat-item">
          <span class="stat-number">{{ site.posts.size }}</span>
          <span class="stat-label">Total Posts</span>
        </div>
        
        {% assign total_words = 0 %}
        {% for post in site.posts %}
          {% assign words = post.content | number_of_words %}
          {% assign total_words = total_words | plus: words %}
        {% endfor %}
        
        <div class="stat-item">
          <span class="stat-number">{{ total_words | divided_by: 1000 }}k</span>
          <span class="stat-label">Words Written</span>
        </div>
        
        {% assign all_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq %}
        <div class="stat-item">
          <span class="stat-number">{{ all_tags.size }}</span>
          <span class="stat-label">Unique Tags</span>
        </div>
      </div>

      <!-- Archive Navigation -->
      <div class="archive-nav">
        <button class="archive-nav-btn active" data-view="timeline">Timeline</button>
        <button class="archive-nav-btn" data-view="categories">By Tags</button>
      </div>

      <!-- Timeline View -->
      <div class="archive-view" id="timeline-view">
        {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
        {% for year_group in posts_by_year %}
        <div class="archive-year">
          <h2 class="year-heading">{{ year_group.name }}</h2>
          
          {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%B'" %}
          {% for month_group in posts_by_month %}
          <div class="archive-month">
            <h3 class="month-heading">{{ month_group.name }}</h3>
            <div class="archive-posts">
              {% for post in month_group.items %}
              <article class="archive-post">
                <div class="archive-post-meta">
                  <time class="archive-post-date" datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%b %d" }}
                  </time>
                  {% if post.tags.size > 0 %}
                  <div class="archive-post-tags">
                    {% for tag in post.tags limit: 3 %}
                      <span class="tag-chip tag-chip-small">{{ tag }}</span>
                    {% endfor %}
                  </div>
                  {% endif %}
                </div>
                <div class="archive-post-content">
                  <h4 class="archive-post-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                  </h4>
                  {% if post.excerpt %}
                  <p class="archive-post-excerpt">{{ post.excerpt | strip_html | truncate: 120 | escape }}</p>
                  {% endif %}
                  <div class="archive-post-stats">
                    {% assign words = post.content | number_of_words %}
                    {% assign reading_time = words | divided_by: 200 | plus: 1 %}
                    <span>{{ reading_time }} min read</span>
                    <span>{{ words }} words</span>
                  </div>
                </div>
              </article>
              {% endfor %}
            </div>
          </div>
          {% endfor %}
        </div>
        {% endfor %}
      </div>

      <!-- Categories View -->
      <div class="archive-view hidden" id="categories-view">
        {% assign all_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq | sort %}
        {% for tag in all_tags %}
          {% unless tag == empty %}
          {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
          <div class="archive-category">
            <h3 class="category-heading">
              <span class="tag-chip">{{ tag }}</span>
              <span class="category-count">({{ tag_posts.size }} posts)</span>
            </h3>
            <div class="category-posts">
              {% for post in tag_posts limit: 10 %}
              <article class="archive-post-compact">
                <time class="archive-post-date" datetime="{{ post.date | date_to_xmlschema }}">
                  {{ post.date | date: "%b %d, %Y" }}
                </time>
                <h4 class="archive-post-title">
                  <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                </h4>
              </article>
              {% endfor %}
              {% if tag_posts.size > 10 %}
              <p class="category-more">
                <a href="/tags/#{{ tag | slugify }}">View all {{ tag_posts.size }} posts tagged "{{ tag }}" →</a>
              </p>
              {% endif %}
            </div>
          </div>
          {% endunless %}
        {% endfor %}
      </div>

      <!-- Archive Search -->
      <div class="archive-search">
        <input type="search" 
               id="archive-search" 
               placeholder="Filter posts by title or content..." 
               aria-label="Filter archive">
        <div id="archive-search-results" class="hidden"></div>
      </div>
    </div>
  </div>
</div>

<style>
.archive-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) 0;
}

.archive-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.archive-nav {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--color-border);
}

.archive-nav-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--transition);
}

.archive-nav-btn:hover,
.archive-nav-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.archive-view.hidden {
  display: none;
}

.archive-year {
  margin-bottom: var(--spacing-2xl);
}

.year-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.archive-month {
  margin-bottom: var(--spacing-xl);
}

.month-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.archive-posts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.archive-post {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  transition: all var(--transition);
}

.archive-post:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-1px);
}

.archive-post-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-sm);
  min-width: 120px;
}

.archive-post-date {
  font-weight: 600;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.archive-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.archive-post-content {
  min-width: 0; /* Prevent overflow */
}

.archive-post-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.archive-post-title a {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition);
}

.archive-post-title a:hover {
  color: var(--color-primary);
}

.archive-post-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.archive-post-stats {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.archive-post-stats span:not(:last-child)::after {
  content: '•';
  margin-left: var(--spacing-md);
}

/* Categories View */
.archive-category {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.category-heading {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  font-size: 1.25rem;
  font-weight: 600;
}

.category-count {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.category-posts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.archive-post-compact {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-md);
  align-items: baseline;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.archive-post-compact:last-child {
  border-bottom: none;
}

.archive-post-compact .archive-post-date {
  min-width: 100px;
  font-size: 0.875rem;
}

.archive-post-compact .archive-post-title {
  font-size: 1rem;
  margin: 0;
}

.category-more {
  margin-top: var(--spacing-sm);
  font-style: italic;
}

.category-more a {
  color: var(--color-primary);
  text-decoration: none;
}

.category-more a:hover {
  text-decoration: underline;
}

/* Archive Search */
.archive-search {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 2px solid var(--color-border);
}

.archive-search input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--color-text);
  transition: all var(--transition);
}

.archive-search input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .archive-post {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .archive-post-meta {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .archive-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .archive-post-compact {
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
  }
  
  .archive-post-compact .archive-post-date {
    min-width: auto;
  }
}
</style>

<script type="module">
// Archive page functionality
class ArchivePage {
  constructor() {
    this.currentView = 'timeline';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSearch();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('.archive-nav-btn');
    
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const view = button.getAttribute('data-view');
        this.switchView(view);
        
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  switchView(view) {
    const timelineView = document.getElementById('timeline-view');
    const categoriesView = document.getElementById('categories-view');
    
    if (view === 'timeline') {
      timelineView.classList.remove('hidden');
      categoriesView.classList.add('hidden');
    } else if (view === 'categories') {
      timelineView.classList.add('hidden');
      categoriesView.classList.remove('hidden');
    }
    
    this.currentView = view;
  }

  setupSearch() {
    const searchInput = document.getElementById('archive-search');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', this.debounce(() => {
      const query = searchInput.value.trim().toLowerCase();
      this.filterPosts(query);
    }, 300));
  }

  filterPosts(query) {
    const posts = document.querySelectorAll('.archive-post, .archive-post-compact');
    let visibleCount = 0;
    
    posts.forEach(post => {
      const title = post.querySelector('.archive-post-title')?.textContent.toLowerCase() || '';
      const excerpt = post.querySelector('.archive-post-excerpt')?.textContent.toLowerCase() || '';
      const searchText = `${title} ${excerpt}`;
      
      if (!query || searchText.includes(query)) {
        post.style.display = '';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    // Hide empty sections
    const sections = document.querySelectorAll('.archive-month, .archive-category');
    sections.forEach(section => {
      const visiblePosts = section.querySelectorAll('.archive-post:not([style*="none"]), .archive-post-compact:not([style*="none"])');
      section.style.display = visiblePosts.length > 0 ? '' : 'none';
    });
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

// Initialize archive page
new ArchivePage();
</script>