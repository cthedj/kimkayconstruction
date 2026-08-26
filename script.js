const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function syncHeader() {
  if (!header) return;
  if (window.scrollY > 20) header.classList.add('scrolled');
  else if (!header.classList.contains('inner-header')) header.classList.remove('scrolled');
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    portfolioItems.forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
    });
  });
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    formStatus.textContent = `Thanks${name ? `, ${name}` : ''}. This is a mock-up form, so nothing has been sent yet.`;
    formStatus.classList.add('show');
    contactForm.reset();
  });
}
