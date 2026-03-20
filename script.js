// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page navigation
  initPageNavigation();

  // Initialize hamburger menu
  initHamburgerMenu();

  // Initialize accordions
  initAccordions();

  // Initialize navbar scroll effect
  initNavbarScroll();

  // Initialize skill bars (will run when About page is shown)
  initSkillBars();

  // Keyboard accessibility
  initKeyboardAccessibility();
});

// Page Navigation
function initPageNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-menu a)');
  const ctaButtons = document.querySelectorAll('.cta-buttons button');
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
    });
  });

  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
    });
  });

  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const activityId = this.getAttribute('data-activity');
      showPage('activities');
      switchActivity(activityId);
    });
  });
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu if open
  document.querySelector('.nav-links').classList.remove('open');
  document.querySelector('.hamburger').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Initialize page-specific features
  if (pageId === 'about') {
    animateSkillBars();
  } else if (pageId === 'activities') {
    // Ensure first activity is shown if none is active
    const activePanel = document.querySelector('.activity-panel.active');
    if (!activePanel) {
      switchActivity('activity1');
    }
  }
}

// Hamburger Menu
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// Accordions
function initAccordions() {
  const toggles = document.querySelectorAll('.part-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const part = this.parentElement;
      part.classList.toggle('open');
    });
  });
}

function switchActivity(activityId) {
  // Hide all panels
  document.querySelectorAll('.activity-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Show target panel
  const targetPanel = document.getElementById(activityId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Skill Bars Animation
let skillBarsAnimated = false;

function initSkillBars() {
  // This will be called when About page is shown
}

function animateSkillBars() {
  if (skillBarsAnimated) return;
  skillBarsAnimated = true;

  const fills = document.querySelectorAll('.skill-fill');

  fills.forEach((fill, index) => {
    const width = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = width + '%';
    }, index * 200);
  });
}

// Keyboard Accessibility
function initKeyboardAccessibility() {
  document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      document.querySelector('.nav-links').classList.remove('open');
      document.querySelector('.hamburger').classList.remove('open');
    }
  });
}

// Call mobile activities init
initMobileActivities();