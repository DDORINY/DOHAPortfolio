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

const kvTabs = [...document.querySelectorAll('[data-kv]')];
const kvPanels = [...document.querySelectorAll('[data-panel]')];

function selectKeyVisual(key, moveFocus = false) {
  kvTabs.forEach((tab) => {
    const selected = tab.dataset.kv === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  kvPanels.forEach((panel) => {
    const selected = panel.dataset.panel === key;
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);
  });
}

kvTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectKeyVisual(tab.dataset.kv));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % kvTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + kvTabs.length) % kvTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = kvTabs.length - 1;
    selectKeyVisual(kvTabs[nextIndex].dataset.kv, true);
  });
});
