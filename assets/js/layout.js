function loadComponent(id, file) {
  const mount = document.getElementById(id);
  if (!mount) {
    return Promise.resolve();
  }

  return fetch(file)
    .then((res) => res.text())
    .then((html) => {
      mount.innerHTML = html;
    });
}

function setActiveLearnerNavLink(header) {
  const navLinks = header.querySelectorAll(".navmenu a[href]");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#" || href.startsWith("javascript:")) {
      return;
    }

    if (href === currentPage) {
      link.classList.add("active");

      let parent = link.closest("li");
      while (parent) {
        const parentAnchor = parent.querySelector(":scope > a");
        if (parentAnchor) {
          parentAnchor.classList.add("active");
        }
        parent = parent.parentElement ? parent.parentElement.closest("li") : null;
      }
    }
  });
}

function initLearnerHeader() {
  const header = document.querySelector(".learner-main-header");
  if (!header) {
    return;
  }

  const navMenu = header.querySelector(".navmenu");
  const mobileToggleBtn = header.querySelector(".mobile-nav-toggle");

  const closeMobileNav = () => {
    document.body.classList.remove("mobile-nav-active");
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove("bi-x");
      mobileToggleBtn.classList.add("bi-list");
    }
  };

  const toggleScrolled = () => {
    document.body.classList.toggle("scrolled", window.scrollY > 100);
  };

  window.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);
  toggleScrolled();

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("mobile-nav-active");
      mobileToggleBtn.classList.toggle("bi-list");
      mobileToggleBtn.classList.toggle("bi-x");
    });
  }

  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href.startsWith("javascript:")) {
          return;
        }

        if (document.body.classList.contains("mobile-nav-active") && window.innerWidth <= 1199) {
          closeMobileNav();
        }
      });
    });

    navMenu.querySelectorAll(".toggle-dropdown").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth > 1199) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const parentLink = toggle.parentElement;
        const submenu = parentLink ? parentLink.nextElementSibling : null;

        if (parentLink) {
          parentLink.classList.toggle("active");
        }
        if (submenu) {
          submenu.classList.toggle("dropdown-active");
        }
      });
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1199) {
      closeMobileNav();
    }
  });

  setActiveLearnerNavLink(header);
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    loadComponent("header", "header.html"),
    loadComponent("contactpage", "contactpage.html"),
    loadComponent("footer", "footer.html"),
  ])
    .then(() => {
      initLearnerHeader();
    })
    .catch((error) => {
      console.error("Component load failed:", error);
    });
});
