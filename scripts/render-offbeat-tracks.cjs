const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'data', 'offbeat-tracks.json');
const INDEX_PATH = path.join(ROOT, 'index.html');
const START_MARKER = '<!-- OFFBEAT_TRACKS:START -->';
const END_MARKER = '<!-- OFFBEAT_TRACKS:END -->';

function fail(message) { throw new Error(`OFFBEAT tracks: ${message}`); }
function isNonEmptyString(value) { return typeof value === 'string' && value.trim().length > 0; }

function assertCaseSensitiveFile(relativePath, expectedExtension, root = ROOT) {
  if (!isNonEmptyString(relativePath) || path.isAbsolute(relativePath) || relativePath.includes('\\')) fail(`invalid asset path: ${relativePath}`);
  const parts = relativePath.split('/');
  if (parts.some(part => !part || part === '.' || part === '..')) fail(`unsafe asset path: ${relativePath}`);
  if (path.posix.extname(relativePath) !== expectedExtension) fail(`expected ${expectedExtension} asset: ${relativePath}`);
  let current = root;
  for (const part of parts) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) fail(`missing asset directory for: ${relativePath}`);
    if (!fs.readdirSync(current).includes(part)) fail(`asset path case mismatch or missing file: ${relativePath}`);
    current = path.join(current, part);
  }
  if (!fs.statSync(current).isFile()) fail(`asset is not a file: ${relativePath}`);
}

function validateTracks(input, { checkAssets = true, root = ROOT } = {}) {
  if (!Array.isArray(input) || input.length === 0) fail('data must be a non-empty array');
  const ids = new Set(), orders = new Set();
  input.forEach((track, index) => {
    const at = `track ${index + 1}`;
    if (!track || typeof track !== 'object' || Array.isArray(track)) fail(`${at} must be an object`);
    for (const field of ['id', 'title', 'cover', 'audio']) if (!isNonEmptyString(track[field])) fail(`${at}.${field} is required`);
    if (typeof track.vocal !== 'string') fail(`${at}.vocal must be a string (empty when unknown)`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(track.id)) fail(`${at}.id must be a stable lowercase kebab-case id`);
    if (ids.has(track.id)) fail(`duplicate id: ${track.id}`); ids.add(track.id);
    if (!Number.isInteger(track.order) || track.order < 1) fail(`${at}.order must be a positive integer`);
    if (orders.has(track.order)) fail(`duplicate order: ${track.order}`); orders.add(track.order);
    if (!Number.isInteger(track.year) || track.year < 1900 || track.year > 9999) fail(`${at}.year must be a four-digit integer`);
    if (typeof track.featured !== 'boolean') fail(`${at}.featured must be boolean`);
    if (!Array.isArray(track.genre) || track.genre.some(value => !isNonEmptyString(value))) fail(`${at}.genre must be a string array`);
    if (!Array.isArray(track.character) || ![0, 3].includes(track.character.length) || track.character.some(value => !isNonEmptyString(value))) fail(`${at}.character must contain zero or three strings`);
    if (checkAssets) {
      assertCaseSensitiveFile(track.cover, '.png', root);
      assertCaseSensitiveFile(track.audio, '.mp3', root);
    }
  });
  return [...input].sort((a, b) => a.order - b.order);
}

function loadTracks(dataPath = DATA_PATH) {
  let parsed;
  try { parsed = JSON.parse(fs.readFileSync(dataPath, 'utf8')); }
  catch (error) { fail(`cannot read valid JSON from ${path.relative(ROOT, dataPath)}: ${error.message}`); }
  return validateTracks(parsed);
}

function escapeText(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escapeAttribute(value) { return escapeText(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function padCount(value) { return String(value).padStart(2, '0'); }

function selectTracks(sortedTracks) {
  if (sortedTracks.length <= 8) return { primary: sortedTracks, remaining: [] };
  const featured = sortedTracks.filter(track => track.featured);
  const primary = featured.slice(0, 3);
  if (primary.length < 3) {
    for (const track of sortedTracks) {
      if (!primary.includes(track)) primary.push(track);
      if (primary.length === 3) break;
    }
  }
  const selectedIds = new Set(primary.map(track => track.id));
  return { primary, remaining: sortedTracks.filter(track => !selectedIds.has(track.id)) };
}

function renderCard(track, position) {
  const title = escapeText(track.title);
  const titleAttribute = escapeAttribute(track.title);
  const metadata = [...track.genre, track.vocal].filter(Boolean).map(escapeText).join(' · ');
  const character = track.character.map(escapeText).join(' · ');
  const titleId = `track-title-${escapeAttribute(track.id)}`;
  return `<article class="track-card" aria-labelledby="${titleId}">
<p class="track-number">${padCount(position)} / SINGLE</p>
<figure class="track-artwork"><img src="${escapeAttribute(track.cover)}" width="1254" height="1254" loading="lazy" decoding="async" alt="${titleAttribute} 커버 아트워크"></figure>
<div class="track-content"><h3 id="${titleId}">${title}</h3>${metadata ? `<p class="track-meta">${metadata}</p>` : ''}${character ? `<p class="track-character">${character}</p>` : ''}<div class="track-player"><audio controls preload="metadata" aria-label="Listen to ${titleAttribute}"><source src="${escapeAttribute(track.audio)}" type="audio/mpeg">이 브라우저는 오디오 재생을 지원하지 않습니다. <a href="${escapeAttribute(track.audio)}">음원 파일 열기</a></audio></div></div>
</article>`;
}

function renderGeneratedBlock(inputTracks) {
  const tracks = validateTracks(inputTracks, { checkAssets: false });
  const { primary, remaining } = selectTracks(tracks);
  const years = [...new Set(tracks.map(track => track.year))].sort((a, b) => a - b);
  const yearLabel = years.length === 1 ? String(years[0]) : `${years[0]}–${years[years.length - 1]}`;
  const countLabel = remaining.length ? `${padCount(primary.length)} FEATURED / ${padCount(tracks.length)} ORIGINAL TRACKS` : `${padCount(tracks.length)} ORIGINAL TRACKS`;
  const expandedClass = tracks.length >= 5 ? ' is-expanded-archive' : '';
  const positions = new Map(tracks.map((track, index) => [track.id, index + 1]));
  const primaryMarkup = primary.map(track => renderCard(track, positions.get(track.id))).join('\n');
  const remainingMarkup = remaining.map(track => renderCard(track, positions.get(track.id))).join('\n');
  const details = remaining.length ? `
<details class="track-archive-more"><summary>VIEW ALL TRACKS · +${padCount(remaining.length)}</summary><div class="track-grid track-grid-more">
${remainingMarkup}
</div></details>` : '';
  return `<p class="track-section-meta reveal">${countLabel} · MUSIC &amp; ART DIRECTION · ${yearLabel}</p>
<dl class="track-role track-shared-role reveal"><dt>ROLE</dt><dd>Concept · Lyrics · Music Direction<br>AI-assisted Production · Artwork Direction</dd></dl>
<div class="track-archive${expandedClass}" data-track-count="${tracks.length}" data-visible-count="${primary.length}">
<div class="track-grid track-grid-primary">
${primaryMarkup}
</div>${details}
</div>`;
}

function markerRegion(html) {
  const startCount = html.split(START_MARKER).length - 1, endCount = html.split(END_MARKER).length - 1;
  if (startCount !== 1 || endCount !== 1) fail(`expected exactly one start and end marker; found ${startCount}/${endCount}`);
  const start = html.indexOf(START_MARKER), end = html.indexOf(END_MARKER);
  if (end < start) fail('end marker appears before start marker');
  return { start, end, current: html.slice(start + START_MARKER.length, end).replace(/^\r?\n|\r?\n$/g, '') };
}

function expectedBlock() { return renderGeneratedBlock(loadTracks()); }
function updateIndex({ check = false } = {}) {
  const html = fs.readFileSync(INDEX_PATH, 'utf8'), region = markerRegion(html), expected = expectedBlock();
  if (check) {
    if (region.current !== expected) fail('generated index.html region is out of date; run node scripts/render-offbeat-tracks.cjs');
    return false;
  }
  const next = `${html.slice(0, region.start + START_MARKER.length)}\n${expected}\n${html.slice(region.end)}`;
  if (next !== html) fs.writeFileSync(INDEX_PATH, next, 'utf8');
  return next !== html;
}

function fixtureTracks(count) {
  return Array.from({ length: count }, (_, index) => ({ id: `fixture-${index + 1}`, title: `Fixture ${index + 1}`,
    cover: 'assets/images/projects/saved-song/I Can Read You.png', audio: 'assets/audio/I Can Read You.mp3', genre: ['ALT POP'],
    vocal: 'FEMALE VOCAL', character: ['One', 'Two', 'Three'], year: 2026, featured: index % 2 === 0, order: index + 1 }));
}

function runFixtureTests() {
  const results = [];
  for (const count of [4, 5, 8, 9, 12, 20]) {
    const tracks = validateTracks(fixtureTracks(count), { checkAssets: false }), selection = selectTracks(tracks), html = renderGeneratedBlock(tracks);
    const expectedPrimary = count <= 8 ? count : 3, expectedRemaining = count <= 8 ? 0 : count - 3;
    assert.equal(selection.primary.length, expectedPrimary); assert.equal(selection.remaining.length, expectedRemaining);
    assert.equal(html.includes('is-expanded-archive'), count >= 5); assert.equal(html.includes('<details'), count >= 9);
    assert.equal((html.match(/class="track-card"/g) || []).length, count);
    assert.equal(new Set([...selection.primary, ...selection.remaining].map(track => track.id)).size, count);
    results.push({ tracks: count, primary: expectedPrimary, remaining: expectedRemaining, columns: count >= 5 ? 3 : 2, details: count >= 9 });
  }
  assert.deepEqual(selectTracks(validateTracks(fixtureTracks(9), { checkAssets: false })).primary.map(track => track.id),['fixture-1','fixture-3','fixture-5']);
  assert.deepEqual(selectTracks(validateTracks(fixtureTracks(20), { checkAssets: false })).primary.map(track => track.id),['fixture-1','fixture-3','fixture-5']);
  const escaped = fixtureTracks(1); escaped[0].title = 'Quote " & <한글>\'';
  const escapedMarkup = renderGeneratedBlock(escaped);
  assert.match(escapedMarkup,/Quote &quot; &amp; &lt;한글&gt;&#39; 커버 아트워크/);
  assert.match(escapedMarkup,/Quote " &amp; &lt;한글&gt;'/);
  assert.throws(()=>validateTracks([...fixtureTracks(1),...fixtureTracks(1)],{checkAssets:false}),/duplicate id/);
  const unknown = fixtureTracks(1);
  Object.assign(unknown[0], { genre: [], vocal: '', character: [] });
  validateTracks(unknown, { checkAssets: false });
  const unknownMarkup = renderGeneratedBlock(unknown);
  assert.equal(unknownMarkup.includes('class="track-meta"'), false);
  assert.equal(unknownMarkup.includes('class="track-character"'), false);
  assert.equal(unknownMarkup.includes('<audio controls'), true);
  assert.throws(()=>validateTracks([{ ...unknown[0], character: ['Unconfirmed'] }],{checkAssets:false}),/zero or three/);
  return results;
}

module.exports = { ROOT, DATA_PATH, INDEX_PATH, START_MARKER, END_MARKER, loadTracks, validateTracks, selectTracks, renderGeneratedBlock, markerRegion, expectedBlock, updateIndex, runFixtureTests };
if (require.main === module) {
  try {
    if (process.argv.includes('--check')) { updateIndex({ check: true }); console.log('OFFBEAT tracks generated region: PASS'); }
    else if (process.argv.includes('--self-test')) console.log(JSON.stringify(runFixtureTests(), null, 2));
    else console.log(updateIndex() ? 'OFFBEAT tracks rendered.' : 'OFFBEAT tracks already up to date.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
