---
layout: default
title: Mobile Menu Test
---

<style>
/* Test background content to make the mobile menu issue visible */
.test-content {
  background: repeating-linear-gradient(
    45deg,
    #ffeb3b,
    #ffeb3b 10px,
    #ff9800 10px,
    #ff9800 20px
  );
  padding: 20px;
  margin: 20px 0;
  height: 200px;
  color: #000;
  font-weight: bold;
}
</style>

<h1>Mobile Menu Background Test</h1>

<p>This page tests the mobile menu background fix. The mobile menu should completely cover the test content below with an opaque background.</p>

<div class="test-content">
  <h2>Test Content with Strong Background</h2>
  <p>This content has a strong background pattern. When the mobile menu opens, it should be completely covered by an opaque background, making the menu items clearly readable.</p>
</div>

<div class="test-content">
  <h2>More Test Content</h2>
  <p>Additional test content to verify the mobile menu covers the entire viewport with a solid background.</p>
</div>

<p>To test: Open this page on a mobile device or narrow browser window, then toggle the mobile menu (hamburger icon). The menu should appear with a solid background that completely covers this page content.</p>