# Design Direction
## Identity
KIM DOHA / CONTENT PLANNER
Planning · Visual · AI Creative

## Visual system
Editorial · Creative Studio · Contemporary · Minimal · Typography-led
White / off-white 기반, near-black 글자, 단일 burnt-orange accent (#ad391f).
큰 타이포그래피, 얇은 구분선, 비대칭 여백으로 정보의 순서를 만듭니다.
프로젝트별 색상은 실제 작업물이 추가될 때 결과물 안에서 사용합니다.
임의의 그래픽, gradient, glow, glassmorphism, 회색 더미 이미지와 가짜 player를 사용하지 않습니다.

## Foundation
기존 section-inner / section-heading / composition / reveal / section-nav를 재사용합니다.
100svh 최소 높이를 유지하되 콘텐츠가 많으면 섹션이 늘어납니다.
기존 강제 높이와 overflow clipping 보정층을 제거해 확대와 긴 콘텐츠를 허용합니다.
1024px에서 여백과 열 수를 줄이고, 720px 이하에서 단일 열 위주로 전환합니다.
모바일 번호 탐색은 하단에 배치하고 콘텐츠 하단 여백을 확보합니다.

## Accessibility
한국어 문서 언어, 단일 h1, h2 섹션 제목과 h3 하위 제목.
skip link, focus-visible, aria-current, 실제 anchor 탐색, reduced motion을 제공합니다.
JavaScript가 없어도 본문을 표시합니다.
reveal은 처음 보일 때 적용되며 이전에 읽은 콘텐츠를 다시 숨기지 않습니다.
준비 중인 연락처는 비활성 링크 대신 텍스트로 표시합니다.

## OFFBEAT — 최신 프로젝트 방향
- Brand: Original Music Release & Content Brand / Personal Concept Project.
- System: MUSIC → IDENTITY → VISUAL → CONTENT → RELEASE.
- OFFBEAT: Neutral · Editorial · Independent Music · Contemporary · Typography-led.
- RELEASE 001 — 저장한 노래: Late Night · Workspace · Memory · Warm Light · City · Intimate.
- 브랜드와 Release의 Identity를 분리하고 Warm Night 색상을 전체 브랜드에 고정하지 않습니다.
- 최종 목표 Visual 70–75% / Copy 25–30%. 현재 완성도나 실제 결과물 비율은 아닙니다.
- 다음 제작물: Brand KV, Release KV, Social 3×3, Lyric Content, 15–20초 Teaser.
- 기존 Cover/Audio는 재사용합니다. [Asset Plan](offbeat-release-system.md)을 기준으로 제작합니다.
- 이번에는 문서만 수정하며 웹 CSS/색상/레이아웃을 변경하지 않습니다.
