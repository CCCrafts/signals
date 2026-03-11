<template>
  <footer class="ccc-footer">
    <div class="ccc-footer-inner">
      <a href="https://cccrafts.ai" target="_blank" rel="noopener noreferrer">
        <img src="/ccc-logo.webp" alt="Creative Content Crafts" class="ccc-footer-logo" />
      </a>
      <p class="ccc-footer-copyright">&copy; 2026 Creative Content Crafts</p>
    </div>
  </footer>
</template>

<style scoped>
.ccc-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px 0;
  text-align: center;
  background: var(--vp-c-bg);
}
.ccc-footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.ccc-footer-logo {
  height: 40px;
  width: auto;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.ccc-footer-logo:hover {
  opacity: 1;
}
.ccc-footer-copyright {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
}
</style>
