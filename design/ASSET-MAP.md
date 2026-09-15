# Asset Map — OFFBEAT Release System
최신 기획: [OFFBEAT Release System](../docs/offbeat-release-system.md).
기존 실제 파일을 원래 경로로 웹에 연결했습니다. rename / duplicate copy / 변환 / 재압축은 없습니다.

## 연결 완료
| Asset | 실제 경로 | 원본 크기 / 웹 위치 |
| --- | --- | --- |
| Brand KV | assets/images/projects/offbeat/brand/offbeat-brand-kv.png | 1672×941 / 04 OFFBEAT |
| Release KV | assets/images/projects/offbeat/release-001/saved-song-release-kv.png | 1672×941 / 05 RELEASE 001 |
| Cover | assets/images/projects/saved-song/saved-song-cover.png | 1254×1254 / 05 내부 #saved-song |
| Audio | assets/audio/saved-song.mp3 | native audio / #saved-song |

## Social Campaign — 연결 완료
공통 경로: `assets/images/projects/offbeat/release-001/social/`

| 순서 | 파일 | 원본 크기 |
| --- | --- | --- |
| 01 | 01-offbeat-brand.png | 1254×1254 |
| 02 | 02-release-001.png | 1254×1254 |
| 03 | 03-saved-song.png | 1254×1254 |
| 04 | 04-lyric.png | 1254×1254 |
| 05 | 05-cover-art.png | 1254×1254 |
| 06 | 06-late-night.png | 1254×1254 |
| 07 | 07-sound.png | 1254×1254 |
| 08 | 08-moment.png | 1254×1254 |
| 09 | 09-still-here.png | 1145×1374 |

Desktop은 3열, 720px 이하에서는 1열입니다. 모든 프레임은 1:1이며 object-fit: contain으로 원본 비율을 보존합니다.
09는 세로 원본이므로 프레임 좌우에 여백이 있습니다. crop이나 파일 수정은 하지 않았습니다.
KV와 Cover 역시 원본 비율로 표시합니다. 이미지 alt, width/height, lazy loading을 적용했습니다.
Audio는 접근 가능한 기존 label과 controls, preload=metadata를 유지하며 autoplay / loop는 없습니다.

## 미제작
- Lyric Carousel: 미제작. Social 04의 단일 Lyric 이미지는 연결 완료입니다.
- Short-form Teaser: 미제작. 실제 MP3 기반 1080×1920 / 15–20초 계획만 유지합니다.
- 웹에는 위 미제작 콘텐츠의 큰 placeholder를 남기지 않습니다.

## Project 02 — MORU / CALM BARRIER SERUM
[현재 Case 정의](../docs/content-operation-case.md). 사용자 제공 실제 Asset 9개를 연결했습니다.

| Asset | 실제 경로 | 원본 크기 | 상태 |
| --- | --- | --- | --- |
| master | assets/images/projects/moru/product/moru-calm-barrier-serum-master.png | 1484×1060 | EXISTS / WEB 연결 완료 |
| hero | assets/images/projects/moru/hero/moru-calm-barrier-serum-hero.png | 1672×941 | EXISTS / WEB 연결 완료 |
| detail | assets/images/projects/moru/detail/moru-calm-barrier-serum-detail.png | 822×1914 | EXISTS / WEB 연결 완료 |
| desktop | assets/images/projects/moru/campaign/moru-calm-barrier-serum-desktop.png | 1916×821 | EXISTS / WEB 연결 완료 |
| mobile | assets/images/projects/moru/campaign/moru-calm-barrier-serum-mobile.png | 1122×1402 | EXISTS / WEB 연결 완료 |
| social-01 | assets/images/projects/moru/campaign/moru-calm-barrier-serum-social-01.png | 1672×941 | EXISTS / WEB 연결 완료 |
| social-02 | assets/images/projects/moru/campaign/moru-calm-barrier-serum-social-02.png | 1254×1254 | EXISTS / WEB 연결 완료 |
| social-03 | assets/images/projects/moru/campaign/moru-calm-barrier-serum-social-03.png | 1254×1254 | EXISTS / WEB 연결 완료 |
| story | assets/images/projects/moru/campaign/moru-calm-barrier-serum-story.png | 941×1672 | EXISTS / WEB 연결 완료 |

06: Product Master / Hero. 07: Detail / Desktop / Mobile / Social 01–03 / Story.
파일명·경로 차이 없음. 예상 규격과 달라 실제 크기를 기록했습니다.
Social 01 가로형을 포함해 모든 원본 비율을 유지합니다. 신규 이미지 생성·변환·이동·복사 없음.

## Project 03 — Saved Song / AI Creative
공통 실제 경로: assets/images/projects/ai-creative/saved-song/

| Stage | File | Dimensions | Status |
| --- | --- | --- | --- |
| Initial | 01-initial.png | 1402×1122 | EXISTS / WEB |
| Revision | 02-revision.png | 1402×1122 | EXISTS / WEB |
| Final | 03-final.png | 1254×1254 | EXISTS / WEB |

09에서 Initial → Revision → Final 순서로 표시하고 Final을 가장 크게 배치합니다.
원본 파일·비율 보존. [AI Creative Case](../docs/ai-creative-case.md)에 판단 과정을 기록했습니다.
기존 OFFBEAT 커버와 Final은 시작 시 같은 내용이었으며 사용자 변경을 그대로 보존했습니다.

## 다른 영역 — 유지
- Contact: 이메일과 Back to top 유지.
- 기존 design 폴더, .gitkeep, exports와 비활성 CSS 파일 보존.
- css/side-project.css는 파일을 보존하고 HTML stylesheet 연결만 제거했습니다.

## Previous Direction — 이전 Asset Planning
기존 Project 01의 5개 output 슬롯과 4주 캘린더는 음악 큐레이션 기획에 기반했습니다.
해당 웹 UI는 실제 Release 결과물로 교체했습니다. 과거 validation 기록은 보존합니다.
