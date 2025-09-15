# Site Content Guide

This guide provides comprehensive information for creating and managing content on the Modern Jekyll Blog. Whether you're writing blog posts, adding images, or organizing content, this guide will help you maintain consistency and quality.

## 📝 Writing Blog Posts

### Front Matter Standards

Every blog post must include proper front matter in YAML format. Here's the complete specification:

```yaml
---
layout: post                 # Required: Always use 'post'
title: "Your Post Title"     # Required: Descriptive title
date: 2024-09-10 10:00:00 -0000  # Required: ISO format with timezone
author: username             # Required: Author's GitHub username
tags: [tag1, tag2, tag3]     # Required: Array of relevant tags
excerpt: "Brief description" # Required: 1-2 sentence summary (max 160 chars)
featured: false             # Optional: Set to true for featured posts
cover: /assets/images/posts/filename.jpg  # Optional: Hero image path
comments: true              # Optional: Control comments on this post (true/false)
---
```

#### Field Descriptions

**Required Fields:**
- **`layout`**: Always use `post` for blog posts
- **`title`**: Clear, descriptive title (max 60 characters for SEO)
- **`date`**: ISO 8601 format with timezone (`YYYY-MM-DD HH:MM:SS -0000`)
- **`author`**: GitHub username of the author
- **`tags`**: Array of 3-5 relevant tags (see [Tag Guidelines](#tag-guidelines))
- **`excerpt`**: Brief description for social sharing and previews

**Optional Fields:**
- **`featured`**: Set to `true` to highlight on homepage (limit to 3 posts)
- **`cover`**: Path to hero image (see [Image Guidelines](#image-guidelines))
- **`comments`**: Set to `false` to disable comments on this post, `true` to explicitly enable them (defaults to enabled if not specified)
- **`github_issue`**: Automatically added by Issue-to-Post workflow

### File Naming Convention

Blog posts must follow Jekyll's naming convention:

```
_posts/YYYY-MM-DD-title-slug.md
```

**Examples:**
- `_posts/2024-09-10-getting-started-with-jekyll.md`
- `_posts/2024-09-15-advanced-css-techniques.md`
- `_posts/2024-10-01-javascript-performance-tips.md`

**Rules:**
- Use hyphens (`-`) instead of spaces or underscores
- Keep slugs short but descriptive (max 50 characters)
- Use lowercase letters only
- Include year, month, and day with leading zeros

### Content Structure

#### Recommended Post Structure

```markdown
---
# Front matter here
---

Brief introduction paragraph that hooks the reader and provides context.

## Main Section 1

Content with clear headings, subheadings, and proper formatting.

### Subsection

More detailed content with examples.

```code
Code examples with proper syntax highlighting
```

## Main Section 2

Continue with logical flow and clear organization.

### Key Points

- Use bullet points for lists
- Keep items parallel in structure
- Limit to 7±2 items per list

## Conclusion

Summarize key takeaways and provide next steps or call to action.

---

*Optional: Add personal note, related resources, or acknowledgments*
```

#### Content Guidelines

**Writing Style:**
- **Clear and Concise**: Use simple, direct language
- **Active Voice**: Prefer active over passive voice
- **Scannable**: Use headings, lists, and short paragraphs
- **Engaging**: Include examples, stories, and practical tips
- **Accessible**: Explain technical terms and provide context

**Technical Content:**
- **Code Examples**: Always include working, tested code
- **Syntax Highlighting**: Specify language for code blocks
- **Screenshots**: Include relevant visuals with alt text
- **Links**: Use descriptive link text, not "click here"
- **References**: Link to official documentation and sources

**SEO Best Practices:**
- **Headings**: Use proper hierarchy (H1 → H2 → H3)
- **Keywords**: Include relevant keywords naturally
- **Meta Description**: Write compelling excerpts
- **Internal Links**: Link to related posts when relevant
- **External Links**: Link to authoritative sources

## 🏷️ Tag Guidelines

### Tag Standards

**Format:**
- Use lowercase with hyphens: `web-development`, `javascript`, `css-grid`
- Maximum 5 tags per post
- Minimum 2 tags per post
- Be specific but not too narrow

**Categories:**

**Technology Tags:**
- Languages: `javascript`, `python`, `ruby`, `css`, `html`
- Frameworks: `react`, `vue`, `jekyll`, `rails`, `express`
- Tools: `git`, `webpack`, `sass`, `docker`, `github-actions`
- Concepts: `accessibility`, `performance`, `security`, `testing`

**Content Type Tags:**
- `tutorial` - Step-by-step guides
- `tips` - Quick tips and tricks
- `review` - Product or tool reviews  
- `opinion` - Personal opinions and thoughts
- `case-study` - Real-world examples
- `announcement` - Project updates and news

**Skill Level Tags:**
- `beginner` - New to the topic
- `intermediate` - Some experience required
- `advanced` - Expert level content

**Example Tag Combinations:**
```yaml
# Good combinations
tags: [javascript, tutorial, beginner, dom-manipulation]
tags: [css, performance, advanced, web-optimization]
tags: [jekyll, github-pages, tutorial, static-sites]

# Avoid these
tags: [js, Javascript, JAVASCRIPT] # Inconsistent formatting
tags: [web, dev, coding, programming, software] # Too generic
tags: [very-specific-library-version-2-1-3] # Too specific
```

### Creating New Tags

Before creating a new tag:
1. **Check existing tags** to avoid duplicates
2. **Consider scope** - will other posts use this tag?
3. **Use established patterns** from similar tags
4. **Keep it general enough** for reuse but specific enough to be useful

## 🖼️ Image Guidelines

### Image Specifications

**File Formats:**
- **JPEG**: For photographs and complex images
- **PNG**: For images with transparency or simple graphics
- **WebP**: For modern browsers (provide JPEG/PNG fallback)
- **SVG**: For icons and simple graphics

**Dimensions:**
- **Hero Images**: 1200×630px (1.91:1 ratio for social sharing)
- **Inline Images**: Max width 800px, maintain aspect ratio
- **Thumbnails**: 400×300px (4:3 ratio)
- **Icons**: 24×24px or 48×48px for high-DPI

**File Size:**
- **Hero Images**: < 200KB
- **Inline Images**: < 100KB
- **Thumbnails**: < 50KB
- **Use optimization tools** like ImageOptim, TinyPNG, or Squoosh

### Image Organization

**Directory Structure:**
```
assets/images/
├── posts/           # Blog post images
│   ├── 2024/       # Organize by year
│   └── covers/     # Hero/cover images
├── authors/        # Author profile images  
├── icons/          # Site icons and favicons
└── ui/            # UI elements and graphics
```

**File Naming:**
```
# Good examples
hero-jekyll-tutorial.jpg
css-grid-example-1.png  
performance-metrics-chart.svg
author-profile-johndoe.jpg

# Avoid these
IMG_1234.jpg
screenshot.png
image.gif
final-version-v2-updated.png
```

### Image Usage in Markdown

**Basic Image:**
```markdown
![Alt text description]({{ "/assets/images/posts/2024/filename.jpg" | relative_url }})
```

**Image with Caption:**
```markdown
![Performance comparison chart showing 50% improvement]({{ "/assets/images/posts/2024/performance-chart.jpg" | relative_url }})
*Performance metrics before and after optimization*
```

**Responsive Image (HTML):**
```html
<img src="{{ '/assets/images/posts/2024/hero-image.jpg' | relative_url }}" 
     alt="Descriptive alt text" 
     loading="lazy" 
     width="800" 
     height="400">
```

### Alt Text Guidelines

Write descriptive alt text that:
- **Describes the image content** for screen readers
- **Provides context** for how the image relates to the content
- **Is concise** but informative (max 125 characters)
- **Includes important text** visible in the image
- **Explains charts/graphs** rather than just saying "chart"

**Examples:**
```markdown
# Good alt text
![Bar chart showing Jekyll build times: 2.3s baseline, 1.8s optimized](...)
![Code editor screenshot highlighting CSS Grid syntax](...)
![Author profile photo of Jane Doe smiling outdoors](...)

# Poor alt text  
![Image](...)
![Screenshot](...)
![Chart about performance](...)
```

## 📊 Performance Guidelines

### Content Performance

**Text Content:**
- **Post Length**: 1000-3000 words for in-depth content
- **Reading Time**: 3-15 minutes (aim for 5-7 minutes)
- **Paragraph Length**: 2-4 sentences maximum
- **Sentence Length**: 20 words or less when possible

**Media Optimization:**
- **Lazy Loading**: All images below the fold
- **Compressed Images**: Use appropriate compression levels
- **Modern Formats**: Provide WebP with JPEG/PNG fallbacks
- **Critical CSS**: Inline critical styles for above-the-fold content

**Code Examples:**
- **Syntax Highlighting**: Specify language for better performance
- **Code Length**: Keep examples focused and concise
- **Working Code**: Test all code examples before publishing
- **Explanation**: Provide context and explanation for code

### SEO Optimization

**On-Page SEO:**
- **Title Tags**: 50-60 characters, include primary keyword
- **Meta Descriptions**: 150-160 characters, compelling and descriptive
- **Headings**: Proper H1-H6 hierarchy, include keywords naturally
- **URL Structure**: Clean, descriptive permalinks
- **Internal Links**: Link to related content when relevant

**Content SEO:**
- **Keyword Research**: Use tools like Google Keyword Planner
- **Keyword Density**: 1-2% target keyword density
- **LSI Keywords**: Include related terms and synonyms
- **Content Freshness**: Update older posts with new information
- **User Intent**: Match content to search intent

## ♿ Accessibility Standards

### Content Accessibility

**Text Content:**
- **Plain Language**: Use simple, clear language
- **Logical Structure**: Organize content with proper headings
- **Contrast**: Ensure text meets WCAG AA standards (4.5:1 ratio)
- **Font Size**: Minimum 16px base font size
- **Line Height**: 1.5x font size for readability

**Links and Navigation:**
- **Descriptive Links**: Use meaningful link text
- **Skip Links**: Provide ways to skip to main content
- **Focus Indicators**: Ensure keyboard navigation is visible
- **Consistent Navigation**: Keep navigation patterns consistent

**Media Accessibility:**
- **Alt Text**: Descriptive alternative text for all images
- **Captions**: For video content (when applicable)
- **Audio Descriptions**: For complex visual content
- **Transcripts**: For audio content (when applicable)

### Testing Accessibility

**Automated Testing:**
```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Test a page
axe http://localhost:4000/your-post-url

# Use browser extensions
# - axe DevTools
# - WAVE Web Accessibility Evaluator
# - Lighthouse accessibility audit
```

**Manual Testing:**
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
- **Color Blindness**: Use tools like Stark to test color combinations
- **Zoom**: Test at 200% and 400% zoom levels

## 🔍 Content Review Process

### Pre-Publication Checklist

**Content Quality:**
- [ ] Post has clear value proposition
- [ ] Information is accurate and up-to-date
- [ ] Writing is clear, concise, and engaging
- [ ] Code examples work and are tested
- [ ] Links are valid and relevant
- [ ] Grammar and spelling are correct

**Technical Requirements:**
- [ ] Front matter is complete and correct
- [ ] File naming follows convention
- [ ] Images are optimized and have alt text
- [ ] Tags follow established guidelines
- [ ] Excerpt is compelling and under 160 characters

**Accessibility & Performance:**
- [ ] Heading hierarchy is logical
- [ ] Links have descriptive text
- [ ] Images load quickly and have proper alt text
- [ ] Content is readable without CSS
- [ ] Keyboard navigation works properly

**SEO Optimization:**
- [ ] Title is under 60 characters
- [ ] Meta description is compelling
- [ ] Primary keyword appears in title and headings
- [ ] Internal links to related content
- [ ] URL is clean and descriptive

### Post-Publication Tasks

**Monitor Performance:**
- Check site build status in GitHub Actions
- Verify post appears correctly on live site
- Test functionality on different devices
- Monitor for any broken links or errors

**Promote Content:**
- Share on relevant social media platforms
- Engage with comments and discussions
- Consider cross-posting to relevant platforms
- Update bio and portfolio as appropriate

## 📈 Analytics and Metrics

### Content Performance Metrics

**Engagement Metrics:**
- **Page Views**: Total and unique visitors
- **Time on Page**: Average reading time
- **Bounce Rate**: Percentage of single-page visits
- **Comments**: Number and quality of discussions
- **Social Shares**: Shares across platforms

**Technical Metrics:**
- **Page Load Speed**: Time to first contentful paint
- **Core Web Vitals**: LCP, FID, CLS scores
- **Accessibility Score**: Lighthouse accessibility rating
- **SEO Score**: Overall SEO health

**Tools for Monitoring:**
- **GitHub Insights**: Repository traffic and engagement
- **Google Analytics**: Detailed visitor analytics
- **PageSpeed Insights**: Performance monitoring
- **Search Console**: SEO performance tracking

### Content Improvement

**Regular Reviews:**
- **Monthly**: Review top-performing content
- **Quarterly**: Update outdated information
- **Annually**: Comprehensive content audit
- **Ongoing**: Monitor comments and feedback

**Optimization Strategies:**
- **Update Content**: Keep information current
- **Improve SEO**: Optimize based on search performance
- **Enhance Accessibility**: Fix identified issues
- **User Feedback**: Incorporate reader suggestions

## 🔄 Content Maintenance

### Regular Maintenance Tasks

**Monthly:**
- [ ] Review and respond to comments
- [ ] Check for broken links
- [ ] Update any outdated information
- [ ] Monitor site performance metrics

**Quarterly:**
- [ ] Comprehensive content audit
- [ ] Update author bios and information
- [ ] Review and update tag taxonomy
- [ ] Analyze content performance and trends

**Annually:**
- [ ] Major design and structure reviews
- [ ] Accessibility audit and improvements
- [ ] SEO strategy review and updates
- [ ] Technology stack updates

### Content Archival

**When to Archive:**
- Content is severely outdated
- Technology is deprecated
- Information is no longer relevant
- Better content covers the same topic

**How to Archive:**
- Add deprecation notice to front matter
- Update content with current alternatives
- Redirect to updated content when possible
- Maintain for SEO if still receiving traffic

---

## 📚 Resources

### Writing Resources
- [Hemingway Editor](https://hemingwayapp.com/) - Improve readability
- [Grammarly](https://grammarly.com/) - Grammar and style checking
- [Google Style Guide](https://developers.google.com/style) - Technical writing guidelines

### Image Resources  
- [Unsplash](https://unsplash.com/) - Free stock photography
- [Squoosh](https://squoosh.app/) - Image compression tool
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

### SEO Resources
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)
- [Moz Keyword Explorer](https://moz.com/explorer)
- [Yoast SEO Guide](https://yoast.com/complete-guide-seo/)

### Accessibility Resources
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Accessibility resources
- [A11y Checklist](https://a11yproject.com/checklist/)

---

**Questions about content creation?** Check our [GitHub Discussions](https://github.com/jukomol/blogs/discussions) or [open an issue](https://github.com/jukomol/blogs/issues).

**Happy writing!** ✍️