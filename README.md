# Modern Jekyll Blog

A modern, fast, and accessible blog built with Jekyll and hosted on GitHub Pages. Features a sleek UI, powerful search, interactive comments, and an innovative GitHub Issues-based publishing workflow.

[![Build and Deploy](https://github.com/jukomol/blogs/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/jukomol/blogs/actions/workflows/build-and-deploy.yml)
[![Lighthouse Performance](https://img.shields.io/badge/lighthouse-90%2B-brightgreen)](https://pagespeed.web.dev/)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

## 🚀 Features

### Core Features
- **⚡ Lightning Fast**: Static site generation with optimized assets
- **🌙 Dark Mode**: System preference detection with manual toggle
- **📱 Fully Responsive**: Works perfectly on all devices
- **♿ Accessible**: WCAG 2.1 AA compliant with proper semantics
- **🔍 Powerful Search**: Pagefind-powered static search
- **💬 Interactive Comments**: Giscus integration with GitHub Discussions
- **🏷️ Tag System**: Organize and filter content by tags

### Publishing Workflow
- **📝 Issue-to-Post**: Convert GitHub issues to blog posts automatically
- **🔐 Access Control**: Only collaborators can publish posts
- **🤖 Automated Deployment**: GitHub Actions handle everything
- **✅ Quality Assurance**: Lighthouse testing and performance monitoring

### Performance & SEO
- **📈 Optimized**: Lighthouse scores 90+ across all categories
- **🔗 SEO Ready**: Open Graph, Twitter Cards, sitemap generation
- **🖼️ Image Optimization**: Lazy loading and responsive images
- **📡 RSS Feed**: Automatic feed generation for subscribers

## 🛠️ Tech Stack

- **[Jekyll 4.3.2](https://jekyllrb.com/)** - Static site generator
- **[GitHub Pages](https://pages.github.com/)** - Hosting and deployment
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[Giscus](https://giscus.app/)** - Comment system via GitHub Discussions
- **[Pagefind](https://pagefind.app/)** - Static site search
- **Modern CSS** - Custom properties, Grid, and Flexbox
- **Vanilla JavaScript** - No heavy frameworks, just modern ES modules

## 🏃 Quick Start

### Prerequisites

- Ruby 3.2+ with Bundler
- Git
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jukomol/blogs.git
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   ```
   http://localhost:4000/polymath
   ```

### GitHub Pages Deployment

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Enable GitHub Discussions** in repository settings
4. **Configure Giscus** (see [Giscus Setup](#giscus-setup))
5. **Push to main branch** - automatic deployment via GitHub Actions

## 📝 Publishing Content

### Method 1: Issue-to-Post Workflow (Recommended)

1. **Create a new issue** with your blog post content
2. **Add the `post` label** to the issue
3. **Wait for the automation** to create and deploy your post

**Issue Format:**
```markdown
Title: Your Post Title

Your post content in Markdown...

## Headings work great
- Lists are supported
- Images and links too

Tags: tutorial, jekyll, web-development
```

### Method 2: Direct File Creation

1. **Create a new file** in `_posts/` directory
2. **Follow the naming convention**: `YYYY-MM-DD-title-slug.md`
3. **Add proper front matter**:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2024-09-10 10:00:00 -0000
   author: your-username
   tags: [tag1, tag2, tag3]
   excerpt: "Brief description of your post"
   featured: false
   ---
   
   Your post content here...
   ```

## ⚙️ Configuration

### Site Configuration

Edit `_config.yml` to customize your blog:

```yaml
title: "Your Blog Title"
description: "Your blog description"
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"

author:
  name: "Your Name"
  email: "your-email@example.com"

# Enable/disable features
features:
  dark_mode: true
  search: true
  comments: true
```

### Giscus Setup

1. **Enable GitHub Discussions** in your repository settings
2. **Install the Giscus app**: https://github.com/apps/giscus
3. **Configure Giscus** at https://giscus.app/
4. **Update `_config.yml`** with your settings:
   ```yaml
   giscus:
     repo: "username/repository"
     repo_id: "your-repo-id"
     category: "General"
     category_id: "your-category-id"
   ```

### Search Configuration

Pagefind is automatically configured and built during deployment. To customize:

1. **Exclude content** from search by adding `data-pagefind-ignore` to HTML elements
2. **Customize search UI** in `assets/js/search.js`
3. **Adjust search settings** in `.github/workflows/build-and-deploy.yml`

## 🎨 Customization

### Styling

- **CSS Variables**: Customize colors and spacing in `assets/css/style.scss`
- **Dark Mode**: Colors automatically adapt using CSS custom properties
- **Typography**: Change fonts by updating the `--font-family` variable

### Layout Customization

- **Homepage**: Edit `_layouts/home.html`
- **Post Layout**: Modify `_layouts/post.html`
- **Navigation**: Update `_includes/nav.html`
- **Footer**: Customize `_includes/footer.html`

### Adding New Pages

1. Create a new `.md` file in the root directory
2. Add proper front matter with `layout` and `permalink`
3. Update navigation in `_includes/nav.html`

## 🔧 Development

### Project Structure

```
├── _config.yml              # Jekyll configuration
├── _data/                   # Data files (YAML, JSON, CSV)
├── _includes/               # Reusable template partials
│   ├── nav.html
│   ├── footer.html
│   ├── giscus.html
│   └── post-card.html
├── _layouts/                # Page templates
│   ├── default.html
│   ├── home.html
│   └── post.html
├── _posts/                  # Blog posts
├── _sass/                   # Sass partials
├── assets/                  # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── .github/workflows/       # GitHub Actions
│   ├── build-and-deploy.yml
│   └── issue-to-post.yml
└── pages/                   # Static pages
    ├── about.md
    ├── search.md
    ├── archive.md
    └── tags.md
```

### Build Commands

```bash
# Development server with live reload
bundle exec jekyll serve --livereload

# Production build
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean

# Check for broken links
bundle exec jekyll doctor
```

### Testing

```bash
# Run all tests
bundle exec rake test

# Check HTML validity
bundle exec htmlproofer ./_site

# Lighthouse CI (requires deployment)
npm install -g @lhci/cli
lhci autorun
```

## 📊 Performance

This blog is optimized for exceptional performance:

- **Lighthouse Scores**: 90+ across Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals**: Excellent scores for LCP, FID, CLS
- **Bundle Size**: Minimal JavaScript, optimized CSS
- **Image Optimization**: Lazy loading, responsive images
- **Caching**: Proper cache headers for static assets

### Performance Tips

1. **Optimize images** before uploading (use WebP when possible)
2. **Minimize external resources** to reduce network requests
3. **Use the `loading="lazy"` attribute** for images below the fold
4. **Test performance** regularly with Lighthouse

## ♿ Accessibility

Committed to WCAG 2.1 AA compliance:

- **Semantic HTML** with proper heading hierarchy
- **Keyboard Navigation** for all interactive elements
- **Screen Reader Support** with ARIA labels and descriptions
- **Color Contrast** meeting AA standards
- **Focus Management** with visible focus indicators
- **Skip Links** for main content navigation

### Accessibility Testing

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Test accessibility
axe http://localhost:4000/polymath

# Or use browser extensions:
# - axe DevTools
# - Lighthouse accessibility audit
# - WAVE Web Accessibility Evaluator
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit with conventional commits** (`git commit -m 'feat: add amazing feature'`)
5. **Push to your fork** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Content Guidelines

See [SITE_GUIDE.md](SITE_GUIDE.md) for detailed content creation guidelines, including:
- Front matter standards
- Image specifications
- Tag conventions
- Writing style guide

## 📋 Roadmap

- [ ] Newsletter integration with ConvertKit/Mailchimp
- [ ] Related posts recommendations
- [ ] Reading progress indicator
- [ ] Social sharing buttons with privacy focus
- [ ] Enhanced analytics with privacy-first solutions
- [ ] Multi-language support
- [ ] Comment reactions and moderation tools
- [ ] Advanced search filters and sorting

## 🐛 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and rebuild
bundle exec jekyll clean
rm -rf _site .jekyll-cache
bundle exec jekyll build
```

**Giscus Comments Not Loading**
- Check repository settings for Discussions
- Verify Giscus configuration in `_config.yml`
- Ensure repository is public or Giscus app is installed

**Search Not Working**
- Pagefind requires deployment to work properly
- Check browser console for JavaScript errors
- Verify Pagefind files are generated in `_site/pagefind/`

**Performance Issues**
- Optimize large images
- Check for blocking resources
- Use browser DevTools Performance tab

### Getting Help

- **Documentation**: Check our [docs](https://github.com/jukomol/blogs/wiki)
- **Issues**: [Report bugs or request features](https://github.com/jukomol/blogs/issues)
- **Discussions**: [Join the community](https://github.com/jukomol/blogs/discussions)
- **Jekyll Help**: [Jekyll Documentation](https://jekyllrb.com/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Jekyll](https://jekyllrb.com/)** - The amazing static site generator
- **[GitHub](https://github.com/)** - For hosting and actions
- **[Giscus](https://giscus.app/)** - For the comment system
- **[Pagefind](https://pagefind.app/)** - For static site search
- **[Inter Font](https://rsms.me/inter/)** - Beautiful typography
- **Open Source Community** - For inspiration and best practices

---

**Made with ❤️ and modern web technologies**

[Live Demo](https://jukomol.github.io/polymath) • [Report Bug](https://github.com/jukomol/polymath/issues) • [Request Feature](https://github.com/jukomol/polymath/issues)
