---
layout: default
title: Tags
permalink: /tags/
---

<div class="container">
  <div class="post-content">
    <header class="post-header">
      <h1 class="post-title">Browse by Tags</h1>
      <p class="post-excerpt">Explore our content organized by topics and themes.</p>
    </header>

    <div class="tags-content">
      {% assign all_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq | sort %}
      {% assign tag_counts = '' | split: '' %}
      
      <!-- Create tag counts array -->
      {% for post in site.posts %}
        {% for tag in post.tags %}
          {% assign tag_counts = tag_counts | push: tag %}
        {% endfor %}
      {% endfor %}

      <!-- Tag Cloud -->
      <div class="tag-cloud">
        <h2>Tag Cloud</h2>
        <div class="tag-cloud-container">
          {% for tag in all_tags %}
            {% unless tag == empty %}
              {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
              {% assign count = tag_posts.size %}
              {% assign size_class = '' %}
              {% if count >= 5 %}
                {% assign size_class = 'tag-large' %}
              {% elsif count >= 3 %}
                {% assign size_class = 'tag-medium' %}
              {% else %}
                {% assign size_class = 'tag-small' %}
              {% endif %}
              
              <a href="#{{ tag | slugify }}" 
                 class="tag-cloud-item {{ size_class }}" 
                 data-count="{{ count }}"
                 title="{{ count }} posts tagged with {{ tag }}">
                {{ tag }}
                <span class="tag-count">({{ count }})</span>
              </a>
            {% endunless %}
          {% endfor %}
        </div>
      </div>

      <!-- Tag Filter -->
      <div class="tag-filter-section">
        <h2>Filter Tags</h2>
        <div class="tag-filter-controls">
          <input type="search" 
                 id="tag-filter-input" 
                 placeholder="Search tags..." 
                 aria-label="Filter tags">
          <select id="tag-sort-select" aria-label="Sort tags">
            <option value="alphabetical">Alphabetical</option>
            <option value="count">By Post Count</option>
            <option value="recent">Recently Used</option>
          </select>
        </div>
      </div>

      <!-- Tag Listing -->
      <div class="tag-listing" id="tag-listing">
        {% for tag in all_tags %}
          {% unless tag == empty %}
            {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
            {% assign latest_post = tag_posts | first %}
            
            <div class="tag-section" id="{{ tag | slugify }}" data-tag="{{ tag | downcase }}" data-count="{{ tag_posts.size }}" data-latest="{{ latest_post.date | date: '%Y%m%d' }}">
              <div class="tag-header">
                <h3 class="tag-title">
                  <span class="tag-chip tag-chip-large">{{ tag }}</span>
                  <span class="tag-meta">{{ tag_posts.size }} post{% if tag_posts.size != 1 %}s{% endif %}</span>
                </h3>
                <p class="tag-description">Latest: {{ latest_post.date | date: "%B %d, %Y" }}</p>
              </div>
              
              <div class="tag-posts">
                {% for post in tag_posts limit: 6 %}
                <article class="tag-post">
                  <div class="tag-post-meta">
                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {{ post.date | date: "%b %d, %Y" }}
                    </time>
                    {% if post.featured %}
                      <span class="featured-indicator" title="Featured post">★</span>
                    {% endif %}
                  </div>
                  <h4 class="tag-post-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                  </h4>
                  {% if post.excerpt %}
                  <p class="tag-post-excerpt">{{ post.excerpt | strip_html | truncate: 100 | escape }}</p>
                  {% endif %}
                  <div class="tag-post-stats">
                    {% assign words = post.content | number_of_words %}
                    {% assign reading_time = words | divided_by: 200 | plus: 1 %}
                    {{ reading_time }} min read
                    {% if post.tags.size > 1 %}
                      • {{ post.tags.size }} tags
                    {% endif %}
                  </div>
                </article>
                {% endfor %}
                
                {% if tag_posts.size > 6 %}
                <div class="tag-show-more">
                  <button class="show-more-btn" data-tag="{{ tag | slugify }}">
                    Show {{ tag_posts.size | minus: 6 }} more posts
                  </button>
                  <div class="more-posts hidden" id="more-{{ tag | slugify }}">
                    {% for post in tag_posts offset: 6 %}
                    <article class="tag-post">
                      <div class="tag-post-meta">
                        <time datetime="{{ post.date | date_to_xmlschema }}">
                          {{ post.date | date: "%b %d, %Y" }}
                        </time>
                        {% if post.featured %}
                          <span class="featured-indicator" title="Featured post">★</span>
                        {% endif %}
                      </div>
                      <h4 class="tag-post-title">
                        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                      </h4>
                      {% if post.excerpt %}
                      <p class="tag-post-excerpt">{{ post.excerpt | strip_html | truncate: 100 | escape }}</p>
                      {% endif %}
                      <div class="tag-post-stats">
                        {% assign words = post.content | number_of_words %}
                        {% assign reading_time = words | divided_by: 200 | plus: 1 %}
                        {{ reading_time }} min read
                        {% if post.tags.size > 1 %}
                          • {{ post.tags.size }} tags
                        {% endif %}
                      </div>
                    </article>
                    {% endfor %}
                  </div>
                </div>
                {% endif %}
              </div>
            </div>
          {% endunless %}
        {% endfor %}
      </div>

      <!-- Tag Statistics -->
      <div class="tag-stats">
        <h2>Tag Statistics</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ all_tags.size }}</span>
            <span class="stat-label">Total Tags</span>
          </div>
          
          {% assign most_used_tag = '' %}
          {% assign max_count = 0 %}
          {% for tag in all_tags %}
            {% unless tag == empty %}
              {% assign tag_posts = site.posts | where_exp: "post", "post.tags contains tag" %}
              {% if tag_posts.size > max_count %}
                {% assign max_count = tag_posts.size %}
                {% assign most_used_tag = tag %}
              {% endif %}
            {% endunless %}
          {% endfor %}
          
          <div class="stat-item">
            <span class="stat-number">{{ max_count }}</span>
            <span class="stat-label">Most Posts in "{{ most_used_tag }}"</span>
          </div>
          
          {% assign avg_tags = site.posts | map: 'tags' | map: 'size' %}
          {% assign total_tag_count = 0 %}
          {% for count in avg_tags %}
            {% assign total_tag_count = total_tag_count | plus: count %}
          {% endfor %}
          {% assign average = total_tag_count | divided_by: site.posts.size %}
          
          <div class="stat-item">
            <span class="stat-number">{{ average }}</span>
            <span class="stat-label">Avg Tags per Post</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.tags-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) 0;
}

/* Tag Cloud */
.tag-cloud {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.tag-cloud h2 {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-sm);
  align-items: baseline;
}

.tag-cloud-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--card-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition);
  font-weight: 500;
}

.tag-cloud-item:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

.tag-small {
  font-size: 0.875rem;
}

.tag-medium {
  font-size: 1rem;
}

.tag-large {
  font-size: 1.125rem;
  font-weight: 600;
}

.tag-count {
  font-size: 0.75em;
  opacity: 0.8;
}

/* Filter Section */
.tag-filter-section {
  margin-bottom: var(--spacing-2xl);
}

.tag-filter-controls {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-md);
  align-items: center;
}

.tag-filter-controls input,
.tag-filter-controls select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--color-text);
  font-size: 1rem;
}

.tag-filter-controls input:focus,
.tag-filter-controls select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

/* Tag Listing */
.tag-section {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  scroll-margin-top: 80px; /* Account for sticky nav */
}

.tag-header {
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.tag-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag-chip-large {
  font-size: 1.125rem;
  padding: var(--spacing-sm) var(--spacing-md);
}

.tag-meta {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 400;
}

.tag-description {
  color: var(--color-text-secondary);
  margin: 0;
}

.tag-posts {
  display: grid;
  gap: var(--spacing-lg);
}

.tag-post {
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition);
}

.tag-post:hover {
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  transform: translateY(-1px);
}

.tag-post-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.featured-indicator {
  color: var(--color-accent);
  font-size: 1.25em;
}

.tag-post-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.tag-post-title a {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition);
}

.tag-post-title a:hover {
  color: var(--color-primary);
}

.tag-post-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.tag-post-stats {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Show More */
.tag-show-more {
  margin-top: var(--spacing-lg);
  text-align: center;
}

.show-more-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition);
}

.show-more-btn:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.more-posts {
  margin-top: var(--spacing-lg);
}

.more-posts.hidden {
  display: none;
}

/* Statistics */
.tag-stats {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--color-border);
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

/* Responsive Design */
@media (max-width: 768px) {
  .tag-filter-controls {
    grid-template-columns: 1fr;
  }
  
  .tag-title {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tag-cloud-container {
    justify-content: flex-start;
  }
}
</style>

<script type="module">
// Tags page functionality
class TagsPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupFilter();
    this.setupSort();
    this.setupShowMore();
    this.handleHashNavigation();
  }

  setupFilter() {
    const filterInput = document.getElementById('tag-filter-input');
    
    if (!filterInput) return;
    
    filterInput.addEventListener('input', this.debounce(() => {
      const query = filterInput.value.toLowerCase().trim();
      this.filterTags(query);
    }, 300));
  }

  setupSort() {
    const sortSelect = document.getElementById('tag-sort-select');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', () => {
      this.sortTags(sortSelect.value);
    });
  }

  setupShowMore() {
    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    
    showMoreBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        const morePosts = document.getElementById(`more-${tag}`);
        
        if (morePosts) {
          morePosts.classList.toggle('hidden');
          btn.textContent = morePosts.classList.contains('hidden') 
            ? btn.textContent.replace('Show fewer', 'Show')
            : btn.textContent.replace('Show', 'Show fewer');
        }
      });
    });
  }

  filterTags(query) {
    const tagSections = document.querySelectorAll('.tag-section');
    let visibleCount = 0;
    
    tagSections.forEach(section => {
      const tagName = section.getAttribute('data-tag');
      
      if (!query || tagName.includes(query)) {
        section.style.display = '';
        visibleCount++;
      } else {
        section.style.display = 'none';
      }
    });
    
    // Update tag cloud
    const cloudItems = document.querySelectorAll('.tag-cloud-item');
    cloudItems.forEach(item => {
      const tagName = item.textContent.toLowerCase().replace(/\(\d+\)/, '').trim();
      
      if (!query || tagName.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  sortTags(sortBy) {
    const listing = document.getElementById('tag-listing');
    const sections = Array.from(listing.querySelectorAll('.tag-section'));
    
    sections.sort((a, b) => {
      switch (sortBy) {
        case 'count':
          return parseInt(b.getAttribute('data-count')) - parseInt(a.getAttribute('data-count'));
        
        case 'recent':
          return parseInt(b.getAttribute('data-latest')) - parseInt(a.getAttribute('data-latest'));
        
        case 'alphabetical':
        default:
          return a.getAttribute('data-tag').localeCompare(b.getAttribute('data-tag'));
      }
    });
    
    // Re-append sorted sections
    sections.forEach(section => {
      listing.appendChild(section);
    });
  }

  handleHashNavigation() {
    // Smooth scroll to tag sections
    const tagLinks = document.querySelectorAll('.tag-cloud-item');
    
    tagLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without triggering scroll
            history.pushState(null, null, href);
          }
        }
      });
    });
    
    // Handle initial hash
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
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

// Initialize tags page
new TagsPage();
</script>