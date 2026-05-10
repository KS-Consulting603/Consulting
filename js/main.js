/* ============================================================
   KIEFER STOLLER — main.js
   Nav scroll state, reveal on scroll, mobile menu, form UX
   ============================================================ */

(function () {
  'use strict';

  // --- SET FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- NAV SCROLL STATE ---
  const nav = document.getElementById('nav');
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- MOBILE MENU ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal, .reveal-right')
          );
          const localIdx = siblings.indexOf(entry.target);
          const delay = Math.min(localIdx * 80, 400);

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- SMOOTH SCROLL (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- CONTACT FORM ---
  const form = document.getElementById('contactForm');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(input) {
    input.classList.add('error');
  }

  function clearError(input) {
    input.classList.remove('error');
  }

  if (form) {
    // Live validation on blur
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.required && !field.value.trim()) {
          setError(field);
        } else if (field.type === 'email' && field.value && !validateEmail(field.value)) {
          setError(field);
        } else {
          clearError(field);
        }
      });

      field.addEventListener('input', function () {
        clearError(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput  = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const msgInput   = document.getElementById('message');

      let valid = true;

      if (!nameInput.value.trim()) { setError(nameInput); valid = false; }
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) { setError(emailInput); valid = false; }

      if (!valid) return;

      // --- Mailto fallback (no backend required for GitHub Pages) ---
      const name    = encodeURIComponent(nameInput.value.trim());
      const email   = encodeURIComponent(emailInput.value.trim());
      const service = encodeURIComponent(document.getElementById('service').value);
      const message = encodeURIComponent(msgInput.value.trim());

      const subject = encodeURIComponent('Consulting Inquiry — Kiefer Stoller');
      const body = encodeURIComponent(
        'Name: ' + nameInput.value.trim() + '\n' +
        'Email: ' + emailInput.value.trim() + '\n' +
        'Service: ' + document.getElementById('service').value + '\n\n' +
        'Message:\n' + msgInput.value.trim()
      );

      window.location.href = 'mailto:stollerk@gmail.com?subject=' + subject + '&body=' + body;

      // Show success state after short delay
      setTimeout(function () {
        form.innerHTML =
          '<div class="form-success">' +
          '<h3>Message sent.</h3>' +
          '<p>Your email client should have opened with the message pre-filled. ' +
          'Expect a response within one business day.</p>' +
          '</div>';
      }, 500);
    });
  }

})();
