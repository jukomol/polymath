# Contributing to Modern Jekyll Blog

Thank you for your interest in contributing to our modern Jekyll blog! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume positive intent
- Respect different viewpoints and experiences

## 🎯 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **🐛 Bug Reports**: Help us identify and fix issues
- **✨ Feature Requests**: Suggest new features or improvements
- **📝 Content**: Write blog posts and improve documentation
- **🔧 Code**: Fix bugs, implement features, improve performance
- **🎨 Design**: Improve UI/UX, accessibility, and visual design
- **📖 Documentation**: Enhance guides, add examples, fix typos

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Discuss major changes** in an issue before implementing
3. **Read the documentation** to understand the project structure
4. **Test locally** to ensure everything works as expected

## 🚀 Getting Started

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/blogs.git
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Create a development branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

5. **Make your changes** and test thoroughly

### Testing Your Changes

Always test your changes before submitting:

```bash
# Build the site
bundle exec jekyll build

# Check for issues
bundle exec jekyll doctor

# Test HTML validity (optional)
bundle exec htmlproofer ./_site --disable-external
```

## 📝 Content Contributions

### Writing Blog Posts

You can contribute blog posts in two ways:

#### Method 1: Issue-to-Post (Recommended for collaborators)
1. Create a new issue with the `post` label
2. Write your content in Markdown in the issue body
3. The automation will convert it to a blog post

#### Method 2: Direct PR
1. Create a new file in `_posts/` following the naming convention: `YYYY-MM-DD-title-slug.md`
2. Add proper front matter (see [SITE_GUIDE.md](SITE_GUIDE.md))
3. Submit a pull request

### Content Guidelines

- **Quality**: Ensure content is well-written, informative, and valuable
- **Originality**: Only submit original content or properly attributed work
- **Relevance**: Content should be relevant to web development, technology, or the blog's theme
- **Formatting**: Use proper Markdown syntax and follow our style guide
- **Images**: Optimize images and use appropriate alt text

See [SITE_GUIDE.md](SITE_GUIDE.md) for detailed content creation guidelines.

## 💻 Code Contributions

### Branch Naming

Use descriptive branch names with prefixes:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code style improvements
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

Examples:
- `feature/add-newsletter-signup`
- `fix/mobile-navigation-bug`
- `docs/update-installation-guide`

### Commit Messages

Follow [Conventional Commits](https://conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat(search): add advanced filtering options
fix(navigation): resolve mobile menu not closing
docs(readme): update installation instructions
style(css): improve dark mode color contrast
```

### Code Style

#### HTML/Liquid
- Use 2 spaces for indentation
- Include proper semantic HTML elements
- Add accessibility attributes (ARIA labels, alt text)
- Keep Liquid logic simple and readable

#### CSS/SCSS
- Use CSS custom properties for theming
- Follow BEM methodology for class names
- Group related properties together
- Include comments for complex logic
- Ensure responsive design principles

#### JavaScript
- Use modern ES6+ syntax
- Write modular, reusable code
- Add JSDoc comments for functions
- Handle errors gracefully
- Ensure accessibility (keyboard navigation, screen readers)

#### Jekyll/Ruby
- Follow Jekyll conventions
- Use meaningful variable names
- Keep configuration simple
- Comment complex logic

### Performance Guidelines

- **Optimize images**: Use appropriate formats and sizes
- **Minimize resources**: Keep CSS and JS bundles small
- **Lazy load content**: Use `loading="lazy"` for images
- **Cache effectively**: Leverage browser caching
- **Test performance**: Ensure Lighthouse scores remain high

### Accessibility Requirements

All contributions must maintain WCAG 2.1 AA compliance:

- **Semantic HTML**: Use proper heading hierarchy
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Color Contrast**: Maintain minimum 4.5:1 contrast ratio
- **Screen Readers**: Include proper ARIA labels and descriptions
- **Focus Management**: Ensure visible focus indicators
- **Alternative Text**: Provide descriptive alt text for images

## 🔍 Pull Request Process

### Before Submitting

1. **Test thoroughly** on different devices and browsers
2. **Check accessibility** with screen readers and keyboard navigation
3. **Validate HTML** and check for broken links
4. **Review your changes** for quality and completeness
5. **Update documentation** if necessary

### Pull Request Checklist

- [ ] Branch is up to date with main
- [ ] All tests pass locally
- [ ] Code follows project conventions
- [ ] Accessibility requirements met
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow conventional format
- [ ] Pull request has clear description

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Local development server
- [ ] Different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices
- [ ] Accessibility testing
- [ ] Performance testing

## Screenshots (if applicable)
Include before/after screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published
```

## 🎨 Design Contributions

### Design Principles
- **Accessibility First**: Design for all users, including those with disabilities
- **Performance Focused**: Prioritize fast loading and smooth interactions
- **Mobile First**: Design for mobile devices, then enhance for desktop
- **Consistent**: Maintain design consistency throughout the site
- **Minimalist**: Keep the design clean and focused on content

### UI/UX Guidelines
- Use the established color palette and typography
- Maintain consistent spacing using CSS custom properties
- Ensure interactive elements have clear hover and focus states
- Follow established patterns for navigation and layout
- Test designs on multiple devices and screen sizes

## 📖 Documentation Contributions

### Types of Documentation
- **README**: Project overview and quick start guide
- **API Documentation**: Code documentation and examples
- **Tutorials**: Step-by-step guides for common tasks
- **Site Guide**: Content creation and style guidelines
- **FAQ**: Common questions and troubleshooting

### Documentation Style
- **Clear and Concise**: Use simple, direct language
- **Well Structured**: Use headings, lists, and code blocks appropriately
- **Examples**: Include practical examples and code snippets
- **Up to Date**: Ensure information is current and accurate
- **Accessible**: Use proper heading hierarchy and alt text

## 🐛 Reporting Issues

### Before Reporting
1. **Search existing issues** to avoid duplicates
2. **Test with latest version** to ensure the issue still exists
3. **Reproduce the issue** consistently
4. **Gather relevant information** (browser, OS, steps to reproduce)

### Issue Template

```markdown
## Bug Description
Clear description of what the bug is

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 91.0.4472.124]
- Device: [e.g. Desktop, iPhone X, Samsung Galaxy]

## Additional Context
Any other context about the problem
```

## 🚀 Feature Requests

### Before Requesting
1. **Check existing requests** to avoid duplicates
2. **Consider the scope** - does it fit the project's goals?
3. **Think about implementation** - how would this work?
4. **Gather community input** - would others find this useful?

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature you'd like to see

## Use Case
Explain the problem this feature would solve

## Proposed Solution
Describe how you envision this working

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Any other relevant information, mockups, or examples
```

## 🏆 Recognition

We value all contributions and recognize contributors in several ways:

- **Contributors List**: All contributors are listed in our README
- **Commit Attribution**: Proper git attribution for all contributions
- **Community Recognition**: Highlighting great contributions in discussions
- **Learning Opportunities**: We're happy to mentor new contributors

## 📞 Getting Help

If you need help or have questions:

- **GitHub Discussions**: [Join our community discussions](https://github.com/jukomol/blogs/discussions)
- **Issues**: [Ask questions in issues](https://github.com/jukomol/blogs/issues)
- **Documentation**: Check our comprehensive documentation
- **Email**: Contact maintainers directly (see README for contact info)

## 📋 Development Workflow

### Typical Workflow
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with conventional messages
7. **Push** to your fork
8. **Create** a pull request
9. **Respond** to feedback
10. **Celebrate** when merged! 🎉

### Release Process
- **Main branch**: Always deployable, protected
- **Feature branches**: Individual features and fixes
- **Automated deployment**: Via GitHub Actions on merge to main
- **Semantic versioning**: Following semver principles
- **Release notes**: Generated from conventional commits

## 🔒 Security

If you discover a security vulnerability:
1. **Do not** create a public issue
2. **Email** maintainers directly (see README)
3. **Provide** detailed information about the vulnerability
4. **Allow** reasonable time for fix before disclosure

## 📚 Resources

### Learning Resources
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Modern CSS Techniques](https://web.dev/learn/css/)

### Tools
- [GitHub CLI](https://cli.github.com/) - Command line tool for GitHub
- [Visual Studio Code](https://code.visualstudio.com/) - Recommended editor
- [Axe Accessibility Checker](https://www.deque.com/axe/) - Accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing

---

**Thank you for contributing to make this blog better for everyone!** 🙏

If you have questions about contributing, feel free to ask in our [GitHub Discussions](https://github.com/jukomol/blogs/discussions).