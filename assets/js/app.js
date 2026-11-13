/**
 * DREAMEXCH24 - Core Website & Mobile App Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initTelegramLinks();
  initMobileDrawer();
  initProductFilters();
  initContactForm();
  initActiveNav();
  initScrollEffects();
  initFaqAccordion();
  initBlogPage();
});

/**
 * Configure all Telegram triggers dynamically from window.CONFIG
 */
function initTelegramLinks() {
  const config = window.CONFIG || {
    telegramUrl: "https://t.me/dreamexchonline"
  };
  const tgButtons = document.querySelectorAll('[data-telegram-btn], .floating-telegram, .floating-telegram-banner');
  tgButtons.forEach(btn => {
    btn.setAttribute('href', config.telegramUrl || "https://t.me/dreamexchonline");
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * Configure all WhatsApp triggers dynamically from window.CONFIG
 */
function initWhatsAppLinks() {
  const config = window.CONFIG || {
    whatsappNumber: "9549376324",
    whatsappCountryCode: "91",
    getWhatsAppUrl: function(msg) {
      return `https://wa.me/919549376324?text=${encodeURIComponent(msg || "Hello DREAMEXCH24, I want to get my Sports ID.")}`;
    }
  };

  // Find all elements marked with data-wa-trigger
  const waButtons = document.querySelectorAll('[data-wa-btn], .floating-whatsapp, .floating-whatsapp-circle');
  waButtons.forEach(btn => {
    const customMsg = btn.getAttribute('data-wa-msg') || config.defaultInquiryMessage;
    btn.setAttribute('href', config.getWhatsAppUrl(customMsg));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Update dynamic phone placeholders if any
  document.querySelectorAll('[data-wa-number]').forEach(el => {
    el.textContent = config.whatsappDisplay || '+91 ' + config.whatsappNumber;
  });
}

/**
 * Mobile Drawer / Offcanvas Logic
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when clicking internal navigation links
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Filter & Sort for Shop / Services
 */
function initProductFilters() {
  const filterChips = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('[data-category]');

  if (!filterChips.length || !productCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Contact Form Direct WhatsApp Dispatch
 */
function initContactForm() {
  const form = document.getElementById('directQueryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim() || 'Sports Enthusiast';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const query = form.querySelector('[name="query"]')?.value.trim() || '';
    const sport = form.querySelector('[name="sport"]')?.value || 'General Inquiry';

    const message = `*DREAMEXCH24 New Inquiry*\n• *Name:* ${name}\n• *Phone:* ${phone}\n• *Category:* ${sport}\n• *Message:* ${query}`;

    const config = window.CONFIG;
    const waUrl = config ? config.getWhatsAppUrl(message) : `https://wa.me/919549376324?text=${encodeURIComponent(message)}`;

    // Show instant success feedback
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>Connecting to WhatsApp...</span>`;
      btn.disabled = true;

      setTimeout(() => {
        window.open(waUrl, '_blank');
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
      }, 600);
    } else {
      window.open(waUrl, '_blank');
    }
  });
}

/**
 * Highlight Current Nav Page
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link, .bottom-bar-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize comparison
    const linkPath = href.split('/').pop();
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Scroll Header Blur & Floating Button Dynamics
 */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(5, 8, 17, 0.96)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'var(--bg-glass-strong)';
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * FAQ Accordion Expand & Collapse
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items for clean accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Interactive Blog Page Filtering & Full Article Modal Reader
 */
function initBlogPage() {
  const filterChips = document.querySelectorAll('.blog-filter-chip');
  const blogCards = document.querySelectorAll('.blog-card');
  const featuredCard = document.querySelector('.blog-featured-card');
  const modalBackdrop = document.getElementById('blogModalBackdrop');
  const modalCloseBtn = document.getElementById('blogModalClose');

  // Category Filtering
  if (filterChips.length) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const selectedCat = chip.getAttribute('data-category');

        if (blogCards.length) {
          blogCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (selectedCat === 'all' || cardCat === selectedCat) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        }

        if (featuredCard) {
          const featuredCat = featuredCard.getAttribute('data-category');
          if (selectedCat === 'all' || featuredCat === selectedCat) {
            featuredCard.style.display = '';
          } else {
            featuredCard.style.display = 'none';
          }
        }
      });
    });
  }

  // Article Modal Reader
  if (modalBackdrop) {
    const readBtns = document.querySelectorAll('[data-read-modal]');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalImage = document.getElementById('modalImage');
    const modalBody = document.getElementById('modalBody');

    const closeModal = () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    readBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = btn.getAttribute('data-article-id');
        const articleDataEl = document.getElementById('article-data-' + articleId);

        if (articleDataEl) {
          try {
            const data = JSON.parse(articleDataEl.textContent);
            if (modalBadge) {
              modalBadge.textContent = data.categoryLabel;
              modalBadge.className = 'blog-badge ' + (data.badgeClass || 'blog-badge-cricket');
            }
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalMeta) {
              modalMeta.innerHTML = `
                <span class="blog-meta-item">📅 ${data.date}</span>
                <span class="blog-meta-item">⏱️ ${data.readTime}</span>
                <span class="blog-meta-item">✍️ ${data.author}</span>
              `;
            }
            if (modalImage && data.image) {
              modalImage.src = data.image;
              modalImage.alt = data.title;
            }
            if (modalBody && data.body) {
              modalBody.innerHTML = data.body;
            }
            modalBackdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
          } catch (err) {
            console.error('Error parsing article data:', err);
          }
        }
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }
}
