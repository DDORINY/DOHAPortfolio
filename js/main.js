const sections = [...document.querySelectorAll('.portfolio-section')];
const navList = document.querySelector('#section-nav-list');
navList.style.setProperty('--section-count', sections.length);

const detailToggle = document.querySelector('.noir-detail-toggle');
const detailViewport = document.querySelector('#noir-detail-viewport');
if (detailToggle && detailViewport) {
  detailToggle.hidden = false;
  detailToggle.addEventListener('click', () => {
    const expanded = detailViewport.classList.toggle('is-expanded');
    detailToggle.setAttribute('aria-pressed', String(expanded));
    detailToggle.textContent = expanded ? '전체 폭으로 보기' : '상세페이지 확대';
    if (!expanded) detailViewport.scrollLeft = 0;
  });
}

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

const motionSelectors = [
  '.release-visual', '.release-system', '.release-social', '.release-final',
  '.commercial-product-row', '.commercial-features', '.commercial-flow',
  '.commercial-output', '.ai-comparison', '.ai-direction', '.ai-stage-final',
  '.track-card', '#process .process-list li'
];
const motionElements = [...document.querySelectorAll(motionSelectors.join(','))];
motionElements.forEach((element, index) => {
  element.classList.add('motion-reveal');
  element.style.setProperty('--motion-delay', `${Math.min(index % 5, 4) * 70}ms`);
});

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
  motionElements.forEach((element) => observer.observe(element));
}
sections[0]?.classList.add('is-visible');

const allAudio = [...document.querySelectorAll('audio')];
const trackCards = [...document.querySelectorAll('.track-card')];

function syncTrackState(card, isPlaying) {
  const audio = card.querySelector('audio');
  const control = card.querySelector('.track-artwork-control');
  const title = card.querySelector('h3')?.textContent.trim() || 'track';
  card.classList.toggle('is-playing', isPlaying);
  if (control) {
    control.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${title}`);
    control.setAttribute('aria-pressed', String(isPlaying));
  }
  if (!isPlaying && audio && !audio.paused) audio.pause();
}

trackCards.forEach((card) => {
  const artwork = card.querySelector('.track-artwork');
  const image = artwork?.querySelector('img');
  const audio = card.querySelector('audio');
  const title = card.querySelector('h3')?.textContent.trim() || 'track';
  if (!artwork || !image || !audio) return;

  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'track-artwork-control';
  control.setAttribute('aria-label', `Play ${title}`);
  control.setAttribute('aria-pressed', 'false');
  control.append(image);
  artwork.append(control);

  control.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => syncTrackState(card, false));
    else audio.pause();
  });
});

allAudio.forEach((audio) => {
  audio.addEventListener('play', () => {
    allAudio.forEach((other) => { if (other !== audio && !other.paused) other.pause(); });
    trackCards.forEach((card) => syncTrackState(card, card.contains(audio)));
  });
  audio.addEventListener('pause', () => {
    const card = audio.closest('.track-card');
    if (card) syncTrackState(card, false);
  });
  audio.addEventListener('ended', () => {
    const card = audio.closest('.track-card');
    if (card) syncTrackState(card, false);
  });
});

let scheduled = false;
function updateNavigation() {
  const readingLine = window.innerHeight * .35;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  });
  // A compact final section may never reach the reading line.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }
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
