# Foundation validation

## Current planning note — documentation only
Latest definition: OFFBEAT = Original Music Release & Content Brand;
RELEASE 001 = Saved Song. See offbeat-release-system.md.
The log below is Previous Direction / historical implementation evidence, including
curation-era expectations and the independent Side Project. It is not the new planning specification.
HTML/CSS/JS, media and validate-foundation.cjs expectations are unchanged in this document-only task.

## Baseline
- START HEAD: `1e58e9a5134eb17223fcbc30bba5c94811184d2b`
- Branch: `main`
- Initial working tree: clean
- Existing architecture: static HTML, 9 CSS layers, Vanilla JS; no package manager/build manifest.
- Original UI: 14 sections; generated numbered anchors, 55% intersection reveal, 1024/720 breakpoints, optional image probes.
- Existing Pages workflow is retained. No commit, push, rename, reset or deployment performed.

## Checks
- `node --check js/main.js`: pass.
- `git -c core.safecrlf=false diff --check`: pass.
- Python HTMLParser: balanced nesting, duplicate attributes/IDs, local references: pass.
- CSS: balanced braces and browser `CSS.supports` declaration checks: pass.
- Chromium: 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×720.
- All 12 navigation targets and active states: pass at each viewport.
- Horizontal page/text overflow: none at tested viewports.
- Runtime errors and failed page requests: none.
- Skip link keyboard focus and Enter: pass.
- Direct section URL with normal motion: pass.
- Reduced motion: all section content visible without reveal transitions.
- JavaScript disabled: body content remains visible.
- Former company/campaign terms: no matches in working-tree file contents (excluding Git internals).

## Reproduction
`validate-foundation.cjs` requires an available Playwright installation and Chromium.
Use `node validate-foundation.cjs` if Playwright resolves normally; otherwise set
`PLAYWRIGHT_MODULE` to an existing Playwright module directory before running.
It serves only this local project on 127.0.0.1:8000, opens a temporary headless browser,
saves review screenshots under TEMP and closes its browser and server afterward.
No project dependency or lockfile was added.

## Limits
HTML checks use Python's parser rather than a full HTML conformance validator.
CSS checks use browser declaration parsing rather than a dedicated linter.
No Safari/Firefox, screen-reader or physical-device testing was performed.
No project artwork or audio exists yet; real media playback and final image semantics
must be tested when those assets are supplied. Optional legacy image fallback code is retained,
but no missing asset references are activated on the current page.
Legacy asset directory names and Git history remain unchanged by design.

## Case Study Architecture — follow-up validation
This section appends to the Foundation results above; the earlier checks are preserved.

- Starting HEAD: `1e58e9a5134eb17223fcbc30bba5c94811184d2b`, branch `main`.
- Starting status: 17 modified tracked files and 3 untracked Foundation files.
- Existing Foundation changes retained; no commit/push/reset/checkout/clean/rename/deploy.
- Main sections: Cover, About, Experience, Digital Planning, Digital Case,
  Content Operation, Operation Case, AI Creative, AI Case, Process, Toolkit, Contact.
- Renamed IDs: project-music → project-operation;
  project-music-process → project-operation-detail. Heading references and tests updated.
- js/main.js is unchanged in this follow-up; navigation derives its targets and labels from HTML.
- Music markup is preserved in side-project-music.md, not connected to main navigation or assets.
- Project 01 brand, audience, concept and outputs remain unassigned.
- Project 02 contains confirmed work categories and unfilled Context / Action / Review slots;
  no internal material, invented company artwork or performance metrics.
- Project 03 retains human decisions, with Direction added before Prompt.

### Re-run results
- Chromium: 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×720: PASS.
- Exact section order, 12 navigation labels, targets, active states, unique IDs and ARIA references: PASS.
- Horizontal overflow, content outside section bounds, desktop navigation overlap: none.
- Mobile: every section's final content can be scrolled above the fixed bottom navigation: PASS.
- Keyboard skip link and operation link activation, normal-motion deep link, reduced motion,
  JavaScript-disabled body visibility: PASS.
- Browser console errors, runtime errors and failed requests: none.
- HTMLParser nesting/duplicate attributes/IDs/local references: PASS.
- CSS balanced braces and browser CSS.supports declaration checks: PASS.
- node --check js/main.js, node --check validate-foundation.cjs, git diff --check: PASS.
- Main HTML/CSS/JS search for project-music, music-workflow and release-slot: no matches.
- Desktop/mobile project screenshots inspected. The original validation limitations still apply.

### Follow-up file scope
Updated: index.html, css/editorial.css, css/responsive.css, validate-foundation.cjs,
docs/README.md, docs/project-plan.md, docs/brand-research.md, docs/validation.md,
design/ASSET-MAP.md.
Added: docs/side-project-music.md. Deleted: none.
The Git diff against HEAD also includes the earlier uncommitted Foundation work;
it must not be interpreted as this follow-up's changes alone.

## Saved Song Side Project — follow-up validation
Earlier Foundation and Architecture results above are preserved.

- Starting HEAD: `1e58e9a5134eb17223fcbc30bba5c94811184d2b`; branch: main.
- Starting status: 17 modified tracked files, 4 untracked files. Existing changes retained.
- Added #saved-song between #project-ai-detail and #process as secondary content.
- Original 12 main section markup blocks compared with the pre-edit working tree: identical.
- Main JS and Foundation CSS unchanged. New styling is scoped in css/side-project.css.
- Main navigation still has 12 entries, IDs, labels and numbers unchanged.
- Side Project is not a numbered portfolio-section. Navigation retains 09 during this case,
  then moves to 10 at Process; the secondary case's footer link also leads to Process.
- User-provided project facts only; no artwork, audio, tools, metrics or results invented.

### Initial asset status (superseded by actual-media validation below)
Repository inventory contains no actual cover artwork or MP3.
No image/audio src was added, no fake player was created, and no media autoplays or loops.
The two media slots show file-pending text. CSS for eventual large artwork and native audio is scoped
to the side project, but actual image ratio, audio decoding/playback and audio accessible labeling
remain untested until files are supplied. Alt text must be written after inspecting the real artwork.

### Results
- Chromium 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×720: PASS.
- Existing navigation regression, exact 12 IDs/labels, active states and ARIA references: PASS.
- Side Project placement, seven process steps, no numbered side link: PASS.
- Main and side content horizontal overflow, clipping and desktop navigation overlap: none.
- Mobile footer reachable above bottom navigation; keyboard link to Process: PASS.
- Skip link, normal-motion deep links, reduced motion, JavaScript-disabled content: PASS.
- Current local image/favicon/CSS/JS references: valid; runtime/console/failed requests: none.
- HTMLParser nesting, duplicate attributes and IDs, local paths: PASS.
- CSS balanced braces and browser CSS.supports declaration checks: PASS.
- node --check js/main.js and validate-foundation.cjs; git diff --check: PASS.
- Desktop/mobile Side Project hero screenshots inspected.
- Existing parser/browser/device limitations above still apply. No full assistive-technology audit.

### File scope
Updated: index.html, validate-foundation.cjs, docs/side-project-music.md,
docs/README.md, docs/project-plan.md, design/ASSET-MAP.md, docs/validation.md.
Added: css/side-project.css. Deleted: none.
No commit, push, reset, checkout, clean, rename or deployment performed.

### Actual media supplied during the task — final state
Before handoff, saved-song-cover.png and saved-song.mp3 appeared in the repository root.
They were inspected and copied without modifying or deleting the originals:
- assets/images/projects/saved-song/saved-song-cover.png — 1254×1254 PNG, 2,034,860 bytes.
- assets/audio/saved-song.mp3 — 4,374,891 bytes.
- SHA256 matches each original and copy.

The file-pending messages were replaced with the real cover and native HTML5 audio.
Alt describes the visible desk, laptop, instruments, warm light and night city.
Image uses explicit dimensions, lazy loading and contain sizing; no title overlay.
Audio uses controls, preload=metadata and an accessible heading reference.
No autoplay, no loop, no custom playback JavaScript.

Final regression at all six viewports: PASS, including actual image load and preserved ratio,
finite positive audio duration, no media errors, paused-on-load state, player/text overflow,
12 unchanged navigation entries, keyboard links and JS-disabled content.
At 390px, native audio was focused and operated with Space: playback time advanced,
then Space paused successfully. Test muted audio to avoid audible output during QA.
HTML/CSS/JS checks and console/network error checks pass with actual media connected.
The original full screen-reader / cross-browser limitations still apply.
Added files also include the two media copies above; the two user-provided root originals remain.

## OFFBEAT — Project Brief + Content Strategy
Earlier results remain as historical records. At this task's start HEAD was
`1e58e9a5134eb17223fcbc30bba5c94811184d2b`, branch main, with 17 modified tracked files
and the existing untracked Foundation / music files. These changes were preserved.

### Implemented
- Only Project 01 and its Detail markup changed; every other section was compared
  against the pre-edit working tree and is identical, including the Saved Song case.
- OFFBEAT identity: Personal Concept Project / 2026 / Content Planning, Content Direction, Visual Planning.
- Six planning stages, five content formats, three proposed channels, five output plans, four calendar weeks.
- Problem and audience explicitly identified as planning assumptions; examples are not interview quotes.
- Calendar is a proposed plan, not publishing history. No statistics, artists, tracks, accounts or design images invented.
- New css/offbeat.css is scoped to Project 01. Foundation CSS, JS, side-project.css and media were not modified.

### Validation
- Existing validate-foundation.cjs extended with OFFBEAT identity, exact stage/format/week checks and five output slots.
- Chromium at 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×720: PASS.
- Long planning/output content has no horizontal overflow, section clipping or desktop navigation overlap.
- Mobile sections can be scrolled to their final content above the fixed navigation.
- Main 12 labels, IDs, order, active states and ARIA references: PASS.
- Saved Song image loads at the original ratio; MP3 metadata loads and keyboard play/pause still works.
- No autoplay/loop, missing references, duplicate IDs, failed requests or console/runtime errors.
- Keyboard skip link/navigation, reduced motion and JavaScript-disabled content: PASS.
- HTMLParser nesting/attributes/local references, browser CSS.supports, node --check and git diff --check: PASS.
- Desktop hero, mobile content formats and mobile calendar screenshots inspected.
- Full HTML conformance, screen-reader and cross-browser audit limitations from prior checks remain.

### Scope and next steps
Updated: index.html, validate-foundation.cjs, docs/project-plan.md, docs/brand-research.md,
design/ASSET-MAP.md, docs/validation.md. Added: css/offbeat.css. Deleted: none.
Next: review the planning assumptions and produce Master KV, feed, carousel and storyboard assets separately.
No commit, push, reset, clean, checkout, rename or deploy performed.

## Copy Diet / Editorial Copy Refinement
- Baseline HEAD: 1e58e9a5134eb17223fcbc30bba5c94811184d2b; branch main.
- Pre-existing 17 modified tracked files and untracked Foundation/media files preserved.
- Body-copy audit: 6,674 → 4,392 characters, 34.2% reduction.
- Counting method: body text only, remove HTML tags/comments and non-rendered native audio fallback;
  decode amp/quote entities and normalize all whitespace to one space. Includes headings, labels,
  metadata, calendar, header and skip-link text; excludes image lettering, attributes and generated nav.
- Without whitespace: 5,347 → 3,574 characters (33.2%). Same method before and after.
- Requested 40–50% is not claimed: required headings, facts, metadata, calendar and workflow labels retained.
- About reduced to two sentences; Experience to role/date and keyword summaries.
- OFFBEAT retains six stages, five formats, five output slots and four calendar weeks.
  Repeated concept disclaimers removed; one personal-concept explanation retained in Hero.
- Output status consolidated; operation case uses CASE IN PREPARATION;
  AI case uses CASE IN PROGRESS. Empty asset hooks are retained without repeated placeholders.
- Saved Song process reduced from seven to five stages; role still discloses AI-assisted Production.
- Contact, artwork figure and native audio markup compared with pre-edit content: unchanged.
- No CSS, font, palette, motion, media, main JS or navigation changes required.
- Chromium 1920/1440/1024/768/390/320: PASS; no horizontal overflow, clipping or failed requests.
- Existing 12 navigation items, IDs, references, keyboard, reduced motion and JS-disabled checks: PASS.
- Saved Song image ratio, MP3 metadata and keyboard play/pause: PASS.
- HTML nesting/local-reference checks, JS syntax and browser CSS declaration checks: PASS.
- Console/runtime errors: none. Desktop/mobile copy screenshots inspected.
- Updated index.html, validate-foundation.cjs and this cumulative log. No files created/deleted.
- No commit, push, reset, clean, checkout, rename or deploy performed.
## OFFBEAT — Visual Asset Web Integration (2026-09-15)
- START HEAD: 1e58e9a5134eb17223fcbc30bba5c94811184d2b; branch main.
- Starting state: 17 modified tracked files plus existing untracked Foundation/docs/media files; preserved.
- Updated index.html, css/offbeat.css, validate-foundation.cjs, design/ASSET-MAP.md,
  docs/offbeat-release-system.md and this log. No files created/deleted in this task.
- Brand KV, Release KV, Social 01–09, Cover (12 PNGs total) and MP3 connected at exact requested paths.
- Section 04: OFFBEAT / Brand KV / five-step Content System.
- Section 05: RELEASE 001 / Release KV / Social Campaign / Final Content / short metadata.
- Separate Side Project and curation/planned-output UI removed; #saved-song retained inside section 05.
- Original media files retained without rename, duplicate copy, conversion or compression.
- Social 09 is 1145×1374; square contain frame preserves the portrait original without cropping.
- All other ten main section markup blocks compared with pre-edit content: identical, including Project 02/03 and Contact.
- Chromium 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×720: PASS.
- No horizontal overflow, image/text/audio clipping or navigation overlap detected.
- Social order 01–09, 3 desktop columns / 1 mobile column, contain fit and image loads: PASS.
- 12 navigation entries, labels 04 OFFBEAT / 05 RELEASE 001, active state and ARIA: PASS.
- Native audio metadata and muted keyboard playback/pause: PASS; no autoplay/loop.
- Alt text, skip link, keyboard focus/navigation, reduced motion, deep links and JS-disabled content: PASS.
- Browser requests and console/runtime errors: none. Duplicate IDs and broken local references: none.
- Explicit image dimensions, lazy loading and async decoding; audio preload=metadata. Media bytes unchanged.
- Desktop social and mobile cover/audio screenshots visually inspected.
- Full screen-reader/cross-browser audits and quantified performance benchmarks were not run.
- Lyric Carousel and Short-form Teaser remain unproduced; no completion claim or large placeholder.
- No commit, push, reset, checkout, clean, repository rename or deploy performed.
