const sections = [...document.querySelectorAll('.portfolio-section')];
const navList = document.querySelector('#section-nav-list');

sections.forEach((section, index) => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${section.id}`;
  link.textContent = String(index + 1).padStart(2, '0');
  link.setAttribute('aria-label', `${index + 1}. ${section.dataset.label}`);
  if (index === 0) { link.classList.add('active'); link.setAttribute('aria-current', 'location'); }
  item.append(link);
  navList.append(item);
});


const links = [...navList.querySelectorAll('a')];

// Keep reveal observation independent of navigation: tall sections must remain readable.
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
sections[0]?.classList.add('is-visible');

let scheduled = false;
function updateNavigation() {
  const readingLine = window.innerHeight * .35;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  });
  links.forEach((link) => {
    const active = link.hash === `#${current?.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
function scheduleNavigation() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('hashchange', scheduleNavigation);
updateNavigation();

const mobileAssetQuery = window.matchMedia('(max-width: 720px)');

document.querySelectorAll('[data-hero-asset]').forEach((asset) => {
  const section = asset.closest('.portfolio-section');
  const image = asset.querySelector('img');
  let loadVersion = 0;

  function loadHeroAsset() {
    const version = ++loadVersion;
    const desktopSource = asset.dataset.desktopSrc;
    if (!desktopSource || !image) return;
    const preferredSource = mobileAssetQuery.matches ? (asset.dataset.mobileSrc || desktopSource) : desktopSource;
    const sources = preferredSource === desktopSource ? [desktopSource] : [preferredSource, desktopSource];

    function trySource(index) {
      if (version !== loadVersion || index >= sources.length) {
        asset.hidden = true;
        section?.classList.remove('has-hero-asset');
        return;
      }
      const probe = new Image();
      probe.onload = () => {
        if (version !== loadVersion) return;
        image.src = sources[index];
        asset.hidden = false;
        section?.classList.add('has-hero-asset');
      };
      probe.onerror = () => trySource(index + 1);
      probe.src = sources[index];
    }
    trySource(0);
  }

  loadHeroAsset();
  mobileAssetQuery.addEventListener?.('change', loadHeroAsset);
});
