# WOORIEN Marketing Content Designer Portfolio Plan

> Personal Project / Concept Proposal / Unofficial

> 2026-09-11 업데이트: 브랜드 조사 결과와 최종 콘셉트·Hero Work·14개 Section IA는 [brand-research.md](./brand-research.md)와 [design-direction.md](./design-direction.md)를 따른다. 아래 초기 가설보다 두 문서의 확정 방향이 우선한다.

## 1. Project Overview

우리엔의 브랜드와 서비스를 조사해 입사 후 수행 가능한 업무를 하나의 통합 Marketing Campaign으로 제안한다. 홈페이지 리디자인이 아니라 Master Key Visual을 디지털·인쇄·공간·웹으로 확장하는 디자인 포트폴리오다.

- 포지셔닝: Marketing × Design × UI/UX × Generative AI × Web Implementation
- 비중: Design 70 / Frontend 30
- 제출: Live Web Portfolio + PDF Portfolio
- 제외: 실제 성과처럼 보이는 수치·후기·고객사, 미확인 제품 기능, 백엔드/CMS

`Decision`: 모든 제출물에 비공식 콘셉트 표기를 유지하고 Frontend 설명은 디자인 구현 판단에 한정한다.

## 2. Job Description Analysis & Portfolio Strategy

| JD | 증거 결과물 | 평가 포인트 |
| --- | --- | --- |
| 브랜드 홍보 콘텐츠 | 카드뉴스, 뉴스레터, 배너 | 정보 위계, 모바일 가독성 |
| 세미나/컨퍼런스 | KV, 포스터, X배너, 리플렛, 부스 | 거리·규격별 확장성 |
| 전사 카탈로그 | 표지·목차·대표 내지 | 편집 및 인쇄 이해 |
| Brand VI 관리 | 컬러·타입·그리드·모티프·컴포넌트 | 일관성과 운영성 |
| 매체별 UI/UX | Desktop/Tablet/Mobile 재구성 | 단순 축소가 아닌 우선순위 변경 |
| 생성형 AI | 생성-선별-리터칭-응용 Case Study | 인간의 판단과 품질 통제 |

스토리: Research → Problem → Campaign Concept → Key Visual → Media Expansion → Web Experience → AI Workflow → Design System → Result.

핵심 산출물은 Master KV, Kakao VET 카드뉴스, Seminar 패키지, Landing Page 4종으로 정하고 나머지는 시스템 확장의 증거로 제작한다.

## 3. Brand Research Plan

공식 웹사이트·제품 페이지·보도자료 → 바텍네트웍스 공식 자료 → 공식 채널/행사 → 신뢰 가능한 업계 자료 순으로 조사한다. 각 사실에 URL, 제목, 게시일/확인일, 디자인 시사점, `Confirmed / Needs Verification / Inference` 상태를 기록한다.

`Research Task`:

- 우리엔과 바텍네트웍스의 관계, 공식 소개·미션·슬로건
- 공식 로고, 컬러, 서체, 국영문 표기와 사용 지침
- 현재 제품/서비스 구성, 타깃, 실제 기능과 CTA
- `AI CHART`의 공식 명칭 여부, 기능 범위 및 표현 제한
- Kakao VET 콘텐츠 규격·톤과 세미나/컨퍼런스 운영 맥락
- 제품 UI·공식 이미지의 포트폴리오 사용 가능 범위
- 경쟁/유사 서비스의 메시지 및 시각 관습

캠페인 가설: `WOORIEN AI CHART Campaign`, 타깃은 동물병원 원장·수의사·관계자, 카피 후보는 “진료에 집중하세요. 기록은 AI가 도와드립니다.”다. 모두 `TBD`이며 공식 사실 검증 후 확정한다.

## 4. Information Architecture & Screen Specification

권장 16개 Full Screen Section:

1. Cover: KV, 제목, 역할, Unofficial 표기
2. Snapshot: 목표, 기간, 역할, 결과물
3. Brand Research: 사실, 사용자, 기회
4. Campaign Concept: 문제, 타깃, Big Idea, 카피
5. Master Key Visual: 대표 결과물
6. Visual System: 컬러, 타입, 그리드, 모티프
7. Kakao VET Card News: 시리즈 개요
8. Card News Detail: 페이지 흐름과 모바일 규격
9. Newsletter: Desktop/Mobile 모듈
10. Seminar/Conference: KV와 행사 적용
11. Offline: X배너, 리플렛, 부스
12. Catalog: 표지, 그리드, 대표 내지
13. Web Experience: 랜딩 흐름과 CTA
14. Responsive/Interaction: 디바이스별 변화
15. AI Workflow/Design System: 과정과 운영성
16. Result/Contact: 전체 결과, 회고, URL/QR, 연락처

각 화면은 `Objective / Primary Visual / Evidence / Copy Limit / Interaction / Responsive Change / Accessibility`를 명세한다. 결과물 이미지를 우선하고 설명은 문제-결정-결과 구조로 제한한다. 제작 과정에서 14~18개 범위로 병합·분리할 수 있다.

## 5. Design System Plan

- Foundations: Brand/Neutral/Semantic color, Display/Heading/Body/Caption type, Desktop 12·Tablet 8·Mobile 4열 grid, spacing, motion token
- Visual criteria: 의료 전문성을 일반적 테크 이미지로만 표현하지 않으며 기록·진료 흐름에서 고유 모티프를 개발한다.
- Components: section shell, headline, indicator, CTA, image/mockup frame, carousel/tab, process step, caption/source, unofficial badge
- States: 필요한 컴포넌트에 Default/Hover/Focus/Active/Disabled와 reduced-motion 변형을 정의한다.

실제 토큰은 공식 브랜드 가이드 확인 전 `TBD`다. 공식 브랜드 요소와 Concept Campaign 요소를 명확히 구분한다.

## 6. Responsive & Interaction Specification

- 검증 폭: 1920, 1440, 1280, 1024, 768, 430, 390, 360
- Desktop: `100vw × 100svh` 기반 Presentation, CSS Scroll Snap 우선
- Tablet: 정보량에 따라 2열/단일열 전환
- Mobile: 자연 스크롤 우선, 결론→결과→근거 순으로 재배치하고 가로 디자인은 확대/분할 제공
- Navigation: Desktop은 `01–16` 앵커, Mobile은 현재/전체 또는 진행선
- 금지: wheel 강제 제어, Hover 전용 정보, 자동 진행 carousel

인터랙션 후보는 section reveal, 카드 carousel, before/after, tab, detail zoom, page indicator다. 모두 키보드·터치 fallback을 제공하며 `prefers-reduced-motion`에서 큰 이동과 자동 재생을 제거한다. Scroll Snap은 Desktop에서 `mandatory/proximity`, Mobile 적용 여부를 사용성 검증 후 결정한다.

## 7. Generative AI Workflow

Research → Concept → Prompt/Ideation → Generation → Selection → Retouching → Layout → Media Variation → Quality Control → Documentation.

- 사람이 문제, 카피, 선별 기준, 타이포, 레이아웃과 최종 품질을 결정한다.
- 후보 3~6개와 탈락 이유, 생성 원본/최종본 Before-After, 수동 수정 영역을 보존한다.
- 도구·모델·날짜·핵심 프롬프트·라이선스 조건을 기록한다.
- 실제 인물/고객으로 오인될 이미지, 미확인 UI·기능, 개인정보·권리 불명 자료는 사용하지 않는다.
- 효율 수치는 실제 작업 로그가 있을 때만 제시한다.

## 8. Asset Plan

구현 단계 권장 폴더: `assets/brand`, `images`, `graphics`, `mockups`, `process`, `fonts`. 파일명은 `category_subject_variant_size_version.ext`를 사용한다. 로고·제품 이미지·사진·폰트·목업마다 출처, 권리, AI 생성 여부, 사용 화면을 추적한다. 현재 단계에서는 에셋을 생성하지 않는다.

## 9. Implementation Plan

1. 공식 리서치와 사실표 확정
2. 콘셉트 2~3안 비교 후 1안 선택
3. Master KV와 디자인 시스템 확정
4. Hero 4종, 보조 매체, 반응형 화면 제작
5. 시맨틱 HTML, CSS token/layout, Vanilla JS 인터랙션 구현
6. PDF 재편집, 접근성·브라우저·인쇄 QA, 배포

구현 구조 제안: `index.html`, `css/{tokens,base,components,pages}.css`, `js/{navigation,carousel,main}.js`, `assets/`, `docs/`. JavaScript가 없어도 모든 핵심 콘텐츠가 문서 순서대로 노출되어야 한다. 첫 화면 외 이미지는 lazy loading, 반응형 이미지는 `srcset/sizes`를 검토한다.

## 10. QA / Acceptance Criteria

- 회사·제품 관련 문장은 공식 출처와 일치하며 가설과 구분된다.
- JD의 세 업무 영역이 각각 완성 결과물로 증명된다.
- 모든 매체가 하나의 시각 시스템을 공유하되 규격별 정보 위계가 다르다.
- 첫 3개 화면에서 지원 직무, 프로젝트 성격, 핵심 결과물이 이해된다.
- 키보드, 터치, 200% 확대, reduced-motion에서도 핵심 정보에 접근한다.
- heading, landmark, alt, focus, 상태 표현과 WCAG AA 대비를 점검한다.
- 지정한 8개 화면 폭과 최신 주요 브라우저에서 누락·잘림이 없다.
- 인쇄물은 도련, 안전영역, 해상도, 색상 모드를 확인한다.
- 외부 자료·폰트·목업·AI의 출처와 라이선스가 기록된다.
- PDF 단독으로 맥락·역할·결과·연락처를 이해하며 Live URL/QR이 작동한다.
- 가상 성과·후기·고객사·검증되지 않은 수치가 없다.

## 11. Decisions Required Before Implementation

- `TBD`: 최종 제품/캠페인명, 타깃 우선순위, 핵심 카피와 CTA
- `TBD`: 공식 브랜드 자산 사용 범위와 Concept Visual 방향
- `TBD`: 최종 섹션 수, Scroll Snap 강도와 모바일 적용 여부
- `TBD`: URL hash 정책, 배포 환경, PDF 용량·페이지 제한
- `TBD`: 생성형 AI 도구와 외부 에셋 라이선스

## 12. Definition of Done

문서 단계는 범위, 화면, 시스템, 반응형, 인터랙션, AI, 에셋, 구현 순서와 검증 조건이 연결되고 모든 미확정 사실이 `TBD/Research Task`로 표시되면 완료다. 전체 프로젝트는 브랜드 검증, Hero 4종과 응용 결과물, 접근 가능한 Live Web, 독립적인 PDF, 출처/라이선스/Unofficial 표기, QA 통과까지 완료되어야 한다.
