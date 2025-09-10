// Theme toggle functionality
class ThemeToggle {
  constructor() {
    this.init();
  }

  init() {
    const toggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (toggle) {
      toggle.addEventListener('click', this.toggleTheme.bind(this));
    }
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
      
      // Close mobile menu when clicking outside
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          this.closeMobileMenu();
        }
      });
      
      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.style.display === 'block') {
          this.closeMobileMenu();
        }
      });
    }
    
    // Apply saved theme on page load
    this.applyTheme();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update Giscus theme if present
    this.updateGiscusTheme(theme);
  }

  applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    
    this.setTheme(theme);
  }

  updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('.giscus-frame');
    if (giscusFrame) {
      const message = {
        type: 'set-theme',
        theme: theme === 'dark' ? 'dark' : 'light'
      };
      giscusFrame.contentWindow.postMessage(message, 'https://giscus.app');
    }
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const isOpen = mobileMenu.style.display === 'block';
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    mobileMenu.style.display = 'block';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) {
      firstLink.focus();
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    mobileMenu.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    toggle.focus();
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
} else {
  new ThemeToggle();
}