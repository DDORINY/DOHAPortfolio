# KIM DOHA — Content Planning Portfolio
콘텐츠 기획 · 비주얼 제작 · AI Creative를 연결하는 개인 포트폴리오의 기반입니다.
현재 문서의 Project 01 정의는 OFFBEAT — Original Music Release & Content Brand입니다.
RELEASE 001은 저장한 노래입니다. 웹 화면은 이전 구조를 유지하며 문서만 먼저 변경했습니다.
RELEASE 001의 커버·MP3는 존재하며, 추가 Release Campaign 자산은 제작 계획입니다.
성과나 작업물을 임의로 생성하지 않습니다.

## 구조
- index.html: 12개 의미론적 섹션
- css/reset.css: 기존 reset 유지
- css/variables.css: 색상, 서체, 간격, 모션 토큰
- css/style.css: 기존 full-page 기반, header, navigation, reveal
- css/editorial.css: 새 콘텐츠 구성
- css/master-asset.css: 향후 실제 이미지 표시
- css/side-project.css: 저장한 노래 전용 스타일 (메인 테마와 분리)
- css/responsive.css: 1024px / 720px 반응형 및 reduced motion
- js/main.js: 섹션 번호 자동 생성, 현재 위치, reveal, 이미지 fallback
- css/key-visual.css, palette.css, cleanup.css: 역할 통합 후 비활성화

## 로컬 확인
저장소 루트에서 `python -m http.server 8000 --bind 127.0.0.1` 실행 후
http://127.0.0.1:8000 에서 확인합니다.

## 관련 문서
- [작업 계획](project-plan.md)
- [OFFBEAT Release System — 최신 기획](offbeat-release-system.md)
- [RELEASE 001 — 저장한 노래 및 기존 Side Project 기록](side-project-music.md)
- [누적 검증 기록](validation.md)
- [디자인 방향](design-direction.md)
- [콘텐츠 근거](brand-research.md)
- [에셋 연결 및 정리 후보](../design/ASSET-MAP.md)

GitHub Pages의 기존 main push / 수동 실행 workflow는 변경하지 않았습니다.
이번 작업은 로컬 파일 수정만 수행합니다.
기존 noindex, nofollow는 비공식 지원용 콘셉트 페이지라는 기존 맥락과
미완성 프로젝트 상태를 고려해 유지합니다. 원래 설정의 별도 결정 기록은 발견되지 않았습니다.
새 공개 URL, canonical, OG 이미지 URL은 공개 위치와 이미지 확정 후 지정합니다.
