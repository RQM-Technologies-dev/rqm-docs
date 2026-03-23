(function () {
  'use strict';

  function injectPdfButton() {
    // Find all nav links in the primary (left) sidebar
    var navLinks = document.querySelectorAll(
      '.md-nav--primary .md-nav__link, .md-sidebar--primary .md-nav__link'
    );

    navLinks.forEach(function (link) {
      if (link.textContent.trim() !== 'QCE 2026 Paper Draft') return;

      var item = link.closest('.md-nav__item');
      if (!item || item.querySelector('.rqm-pdf-export-btn')) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'rqm-pdf-export-btn';
      wrapper.style.cssText =
        'padding: 0.3rem 0.6rem 0.6rem 0.6rem;';

      var btn = document.createElement('button');
      btn.textContent = '\uD83D\uDCC4 Export PDF';
      btn.title = 'Export this page as PDF';
      btn.style.cssText = [
        'display: block',
        'width: 100%',
        'padding: 0.4rem 0.6rem',
        'background: var(--md-primary-fg-color, #3f51b5)',
        'color: var(--md-primary-bg-color, #fff)',
        'border: none',
        'border-radius: 0.2rem',
        'font-size: 0.7rem',
        'font-family: inherit',
        'cursor: pointer',
        'text-align: center',
        'letter-spacing: 0.02rem',
      ].join(';');

      btn.addEventListener('mouseover', function () {
        btn.style.opacity = '0.85';
      });
      btn.addEventListener('mouseout', function () {
        btn.style.opacity = '1';
      });
      btn.addEventListener('click', function () {
        window.print();
      });

      wrapper.appendChild(btn);
      item.appendChild(wrapper);
    });
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPdfButton);
  } else {
    injectPdfButton();
  }

  // Re-run on MkDocs Material instant navigation events
  document.addEventListener('DOMContentSwitch', injectPdfButton);

  // Fallback: observe the primary nav for dynamic rendering
  document.addEventListener('DOMContentLoaded', function () {
    var target =
      document.querySelector('.md-sidebar--primary') || document.body;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.addedNodes.length) injectPdfButton();
      });
    });

    observer.observe(target, { childList: true, subtree: true });
  });
})();
