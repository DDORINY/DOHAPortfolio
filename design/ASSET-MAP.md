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

## 다른 영역 — 유지
- Project 02: operation-context / operation-action / operation-review / operation-material.
- Project 03: iteration-01 / revision / final.
- Contact: 이메일과 Back to top 유지.
- 기존 design 폴더, .gitkeep, exports와 비활성 CSS 파일 보존.
- css/side-project.css는 파일을 보존하고 HTML stylesheet 연결만 제거했습니다.

## Previous Direction — 이전 Asset Planning
기존 Project 01의 5개 output 슬롯과 4주 캘린더는 음악 큐레이션 기획에 기반했습니다.
해당 웹 UI는 실제 Release 결과물로 교체했습니다. 과거 validation 기록은 보존합니다.
