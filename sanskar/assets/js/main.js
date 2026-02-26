/**
* Template Name: Learner
* Template URL: https://bootstrapmade.com/learner-bootstrap-course-template/
* Updated: Jul 08 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  async function loadPartial(placeholderId, partialPath) {
    const placeholder = document.querySelector(`#${placeholderId}`);
    if (!placeholder) {
      return false;
    }

    try {
      const response = await fetch(partialPath, {
        cache: 'no-cache'
      });

      if (!response.ok) {
        return false;
      }

      placeholder.outerHTML = await response.text();
      return true;
    } catch (error) {
      return false;
    }
  }

  function ensureStylesheet(href) {
    const normalizedHref = href.split('?')[0];
    const hasStylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]'))
      .some((stylesheet) => stylesheet.getAttribute('href').split('?')[0] === normalizedHref);

    if (hasStylesheet) {
      return;
    }

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  }

  function normalizePagePath(pathValue) {
    if (!pathValue || pathValue === '/') {
      return 'index.html';
    }

    const noHash = pathValue.split('#')[0];
    const noQuery = noHash.split('?')[0];
    const pageName = noQuery.split('/').pop();

    return pageName || 'index.html';
  }

  function setActiveNavLink() {
    const navLinks = document.querySelectorAll('#navmenu a[href]');
    if (!navLinks.length) {
      return;
    }

    const currentPage = normalizePagePath(window.location.pathname);
    let matchingLink = null;

    navLinks.forEach((link) => {
      link.classList.remove('active');

      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      if (!matchingLink && normalizePagePath(href) === currentPage) {
        matchingLink = link;
      }
    });

    if (matchingLink) {
      matchingLink.classList.add('active');
    }
  }

  function isDropdownTrigger(linkEl) {
    if (!linkEl) {
      return false;
    }

    return !!(linkEl.nextElementSibling && linkEl.nextElementSibling.tagName === 'UL');
  }

  let ctaModalLastTrigger = null;

  function syncBodyScrollLock() {
    const shouldLock = document.body.classList.contains('mobile-nav-active') || document.body.classList.contains('cta-modal-open');
    document.body.style.overflow = shouldLock ? 'hidden' : '';
  }

  function showPhpFormError(thisForm, errorText) {
    const loading = thisForm.querySelector('.loading');
    const errorMessage = thisForm.querySelector('.error-message');

    if (loading) {
      loading.classList.remove('d-block');
    }

    if (!errorMessage) {
      return;
    }

    errorMessage.textContent = String(errorText || 'Form submission failed.');
    errorMessage.classList.add('d-block');
  }

  async function submitPhpAjaxForm(action, formData) {
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} ${response.url}`);
    }

    const data = await response.text();
    if (data.trim() !== 'OK') {
      throw new Error(data || `Form submission failed from: ${action}`);
    }
  }

  function bindDynamicPhpEmailForms(root = document) {
    const forms = root.querySelectorAll('.js-dynamic-php-form.php-email-form');
    if (!forms.length) {
      return;
    }

    forms.forEach((formEl) => {
      if (formEl.dataset.ajaxBound === 'true') {
        return;
      }

      formEl.dataset.ajaxBound = 'true';
      formEl.addEventListener('submit', async (event) => {
        event.preventDefault();

        const thisForm = event.currentTarget;
        const action = thisForm.getAttribute('action');
        const loading = thisForm.querySelector('.loading');
        const errorMessage = thisForm.querySelector('.error-message');
        const sentMessage = thisForm.querySelector('.sent-message');

        if (!action) {
          showPhpFormError(thisForm, 'The form action property is not set.');
          return;
        }

        if (loading) {
          loading.classList.add('d-block');
        }
        if (errorMessage) {
          errorMessage.classList.remove('d-block');
          errorMessage.textContent = '';
        }
        if (sentMessage) {
          sentMessage.classList.remove('d-block');
        }

        try {
          const formData = new FormData(thisForm);
          await submitPhpAjaxForm(action, formData);

          if (loading) {
            loading.classList.remove('d-block');
          }
          if (sentMessage) {
            sentMessage.classList.add('d-block');
          }

          thisForm.reset();

          const insideCtaModal = thisForm.closest('#cta-enquiry-modal');
          if (insideCtaModal) {
            window.setTimeout(() => {
              closeCtaModal();
            }, 900);
          }
        } catch (error) {
          showPhpFormError(thisForm, error.message || error);
        }
      });
    });
  }

  function getCtaModal() {
    return document.querySelector('#cta-enquiry-modal');
  }

  function closeCtaModal() {
    const ctaModal = getCtaModal();
    if (!ctaModal || !ctaModal.classList.contains('is-open')) {
      return;
    }

    ctaModal.classList.remove('is-open');
    ctaModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cta-modal-open');
    syncBodyScrollLock();

    if (ctaModalLastTrigger) {
      ctaModalLastTrigger.focus();
      ctaModalLastTrigger = null;
    }
  }

  function openCtaModal(triggerEl) {
    const ctaModal = getCtaModal();
    if (!ctaModal) {
      return false;
    }

    ctaModalLastTrigger = triggerEl || null;
    ctaModal.classList.add('is-open');
    ctaModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cta-modal-open');
    syncBodyScrollLock();

    const firstField = ctaModal.querySelector('input, select, textarea');
    if (firstField) {
      window.requestAnimationFrame(() => firstField.focus());
    }

    return true;
  }

  async function initSharedLayout() {
    ensureStylesheet('assets/css/components/cta-sanskar.css?v=20260226a');
    ensureStylesheet('assets/css/components/contact-form-sanskar.css?v=20260226a');

    await Promise.all([
      loadPartial('header-placeholder', 'header.html'),
      loadPartial('cta-placeholder', 'cta.html'),
      loadPartial('contact-form-placeholder', 'contact-form.html'),
      loadPartial('footer-placeholder', 'footer.html')
    ]);

    bindDynamicPhpEmailForms(document);

    if (window.AOS) {
      AOS.refreshHard();
    }

    setActiveNavLink();
    toggleScrolled();
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    if (!selectHeader) {
      return;
    }

    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  function syncMobileMenuOffset(navMenu) {
    if (!navMenu || !isMobileNavViewport()) {
      return;
    }

    const header = document.querySelector('#header');
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 88;
    navMenu.style.setProperty('--mobile-menu-top', `${headerHeight + 8}px`);
  }

  function mobileNavToogle() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navmenu');
    if (!mobileNavToggleBtn || !navMenu) {
      return;
    }

    const shouldOpen = !navMenu.classList.contains('navmenu-open');

    document.querySelector('body').classList.toggle('mobile-nav-active', shouldOpen);
    navMenu.classList.toggle('navmenu-open', shouldOpen);
    mobileNavToggleBtn.classList.toggle('bi-list', !shouldOpen);
    mobileNavToggleBtn.classList.toggle('bi-x', shouldOpen);
    syncBodyScrollLock();

    if (shouldOpen) {
      syncMobileMenuOffset(navMenu);
    } else {
      navMenu.style.removeProperty('--mobile-menu-top');
    }

    if (!shouldOpen) {
      navMenu.querySelectorAll('a.active').forEach((anchor) => {
        if (isDropdownTrigger(anchor)) {
          anchor.classList.remove('active');
          anchor.setAttribute('aria-expanded', 'false');
        }
      });
      navMenu.querySelectorAll('.dropdown-active').forEach((dropdown) => {
        dropdown.classList.remove('dropdown-active');
      });
    }
  }

  function isMobileNavViewport() {
    return window.matchMedia('(max-width: 1199px)').matches;
  }

  function toggleMobileDropdown(anchorEl) {
    if (!anchorEl) {
      return;
    }

    const dropdownPanel = anchorEl.nextElementSibling;
    if (!dropdownPanel || dropdownPanel.tagName !== 'UL') {
      return;
    }

    const isOpen = !dropdownPanel.classList.contains('dropdown-active');
    anchorEl.classList.toggle('active', isOpen);
    anchorEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    dropdownPanel.classList.toggle('dropdown-active', isOpen);
  }

  document.addEventListener('click', (event) => {
    const ctaOpenTrigger = event.target.closest('[data-open-cta-modal]');
    if (ctaOpenTrigger) {
      const modalOpened = openCtaModal(ctaOpenTrigger);
      if (modalOpened) {
        event.preventDefault();
      }
      return;
    }

    const ctaCloseTrigger = event.target.closest('[data-close-cta-modal]');
    if (ctaCloseTrigger) {
      event.preventDefault();
      closeCtaModal();
      return;
    }

    const navMenu = document.querySelector('#navmenu');
    const isMobileMenuOpen = !!document.querySelector('#navmenu.navmenu-open');

    const mobileToggle = event.target.closest('.mobile-nav-toggle');
    if (mobileToggle) {
      event.preventDefault();
      mobileNavToogle();
      return;
    }

    const dropdownToggle = event.target.closest('.navmenu .toggle-dropdown');
    if (dropdownToggle && isMobileNavViewport()) {
      event.preventDefault();
      toggleMobileDropdown(dropdownToggle.parentNode);
      event.stopImmediatePropagation();
      return;
    }

    const navLink = event.target.closest('#navmenu a[href]');
    const hasDropdown = isDropdownTrigger(navLink);

    if (navLink && hasDropdown && !isMobileNavViewport()) {
      event.preventDefault();
      return;
    }

    if (navLink && isMobileMenuOpen) {
      if (hasDropdown && isMobileNavViewport()) {
        event.preventDefault();
        toggleMobileDropdown(navLink);
        return;
      }

      mobileNavToogle();
      return;
    }

    if (isMobileMenuOpen && navMenu && event.target === navMenu) {
      mobileNavToogle();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCtaModal();
    }
  });

  window.addEventListener('resize', () => {
    const navMenu = document.querySelector('#navmenu');

    if (!navMenu) {
      return;
    }

    if (isMobileNavViewport()) {
      if (navMenu.classList.contains('navmenu-open')) {
        syncMobileMenuOffset(navMenu);
      }
      return;
    }

    if (navMenu.classList.contains('navmenu-open')) {
      mobileNavToogle();
      return;
    }

    navMenu.style.removeProperty('--mobile-menu-top');
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const body = document.body;
    let preloaderRemoved = false;
    const preloaderStart = performance.now();
    const minVisibleMs = 1300;
    const fadeOutMs = 540;

    body.classList.add('preloader-active');

    const dismissPreloader = () => {
      if (preloaderRemoved) {
        return;
      }
      preloaderRemoved = true;
      preloader.classList.add('preloader-hidden');
      window.setTimeout(() => {
        preloader.remove();
        body.classList.remove('preloader-active');
      }, fadeOutMs);
    };

    const dismissPreloaderWithDelay = () => {
      const elapsed = performance.now() - preloaderStart;
      const waitTime = Math.max(0, minVisibleMs - elapsed);
      window.setTimeout(dismissPreloader, waitTime);
    };

    window.addEventListener('load', dismissPreloaderWithDelay, {
      once: true
    });

    // Fail-safe so scroll is never locked if load event is delayed.
    window.setTimeout(dismissPreloader, 6500);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    if (!pricingSwitch || !monthlyText || !yearlyText) {
      return;
    }

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  initSharedLayout();

})();
