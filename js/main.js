const sections = [...document.querySelectorAll('.portfolio-section')];
const navList = document.querySelector('#section-nav-list');

sections.forEach((section, index) => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${section.id}`;
  link.textContent = String(index + 1).padStart(2, '0');
  link.setAttribute('aria-label', `${index + 1}. ${section.dataset.label}`);
  if (index === 0) link.classList.add('active');
  item.append(link);
  navList.append(item);
});

const links = [...navList.querySelectorAll('a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sections.forEach((section) => section.classList.toggle('is-visible', section === entry.target));
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}, { threshold: 0.55 });

sections.forEach((section) => observer.observe(section));
sections[0]?.classList.add('is-visible');
