---
layout: default
title: About
permalink: /about/
---

<div class="container">
  <div class="post-content">
    <header class="post-header">
      <h1 class="post-title">About This Blog</h1>
      <p class="post-excerpt">Learn more about our modern Jekyll-powered blog and how it's built.</p>
    </header>

    <div class="post-body">
      <h2>Our Mission</h2>
      <p>This blog is dedicated to sharing knowledge, insights, and discoveries in web development, with a focus on modern, performant, and accessible solutions.</p>

      <h2>Technology Stack</h2>
      <p>This blog is built using cutting-edge web technologies:</p>
      <ul>
        <li><strong>Jekyll 4.3.2</strong> - Static site generator</li>
        <li><strong>GitHub Pages</strong> - Hosting and deployment</li>
        <li><strong>GitHub Actions</strong> - CI/CD pipeline</li>
        <li><strong>Giscus</strong> - Comment system via GitHub Discussions</li>
        <li><strong>Pagefind</strong> - Static site search</li>
        <li><strong>Modern CSS</strong> - Custom properties and responsive design</li>
        <li><strong>Vanilla JavaScript</strong> - No heavy frameworks</li>
      </ul>

      <h2>Key Features</h2>
      <ul>
        <li>⚡ **Lightning fast performance** with static site generation</li>
        <li>🌙 **Dark mode support** with system preference detection</li>
        <li>📱 **Fully responsive design** for all devices</li>
        <li>♿ **Accessibility focused** following WCAG 2.1 AA guidelines</li>
        <li>🔍 **Powerful search** with Pagefind integration</li>
        <li>💬 **Interactive comments** via GitHub Discussions</li>
        <li>🏷️ **Tag-based organization** with client-side filtering</li>
        <li>📝 **Issue-to-post workflow** for seamless publishing</li>
      </ul>

      <h2>Publishing Workflow</h2>
      <p>We use an innovative GitHub Issues-based workflow for content creation:</p>
      <ol>
        <li>Create a GitHub issue with your post content</li>
        <li>Add the <code>post</code> label to the issue</li>
        <li>Our GitHub Action automatically converts it to a blog post</li>
        <li>The site rebuilds and deploys automatically</li>
      </ol>
      <p>This approach ensures all content is version-controlled and allows for collaborative editing through GitHub's familiar interface.</p>

      <h2>Performance & Accessibility</h2>
      <p>We're committed to excellence in web standards:</p>
      <ul>
        <li>Lighthouse scores of 90+ across all categories</li>
        <li>WCAG 2.1 AA accessibility compliance</li>
        <li>Semantic HTML and proper heading hierarchy</li>
        <li>Optimized images with lazy loading</li>
        <li>Minimal external dependencies</li>
        <li>Progressive enhancement principles</li>
      </ul>

      <h2>Open Source</h2>
      <p>This blog is fully open source and available on GitHub. Feel free to:</p>
      <ul>
        <li>Explore the source code</li>
        <li>Report issues or bugs</li>
        <li>Suggest improvements</li>
        <li>Fork and adapt for your own projects</li>
      </ul>

      <h2>Contact & Contributing</h2>
      <p>We welcome contributions and feedback:</p>
      <ul>
        <li><strong>GitHub:</strong> <a href="https://github.com/{{ site.github_username }}">@{{ site.github_username }}</a></li>
        <li><strong>Issues:</strong> <a href="https://github.com/{{ site.repository }}/issues">Report bugs or request features</a></li>
        <li><strong>Discussions:</strong> <a href="https://github.com/{{ site.repository }}/discussions">Join the conversation</a></li>
      </ul>

      <p>Thank you for visiting and being part of our community! 🚀</p>
    </div>
  </div>
</div>