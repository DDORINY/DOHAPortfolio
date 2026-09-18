# NOIR FORM — Fashion Commerce

Fashion Commerce / F/W 2026 · Campaign: STRUCTURE IN MOTION.
여성 Structured Long Coat를 중심으로 상품 상세페이지와 캠페인 콘텐츠를 설계한 프로젝트입니다.

## 기존 시스템과 연결

정적 HTML/CSS/Vanilla JS 구조와 공통 여백 토큰을 유지합니다. MORU의 두 섹션 다음에
09 `project-fashion` / NOIR FORM과 10 `project-fashion-detail` / Fashion Commerce를 추가했습니다.
이후 AI Creative는 Project 04이며 전체 섹션은 15개입니다.
내비게이션은 기존 JS가 순서대로 생성하고, 모바일 열 수는 실제 섹션 수를 따릅니다.

전용 `css/noir-form.css`는 `.noir-form` 안에서만 적용합니다. Deep Black #171717,
Charcoal #292927, Ivory #efeee9와 큰 패션 타이포그래피를 사용합니다.
MORU의 상품 마스터·히어로·동일 크기 캠페인 배치와 달리, 모델 중심 split layout,
오프셋이 있는 비대칭 상품/디테일 그리드, 넓은 캠페인 결과물과 세로 최종 비주얼을 조합합니다.

## 콘텐츠 설계

09 / Product & Identity: 소개 → Hero → Product / Silhouette → Detail / Fabric.
10 / From Product to Commerce: Long-form Product Detail → Campaign Applications → Closing Visual.

- 화보로 캠페인의 인상을 전달한 후 제품 단독 컷과 정면·측면·후면을 비교합니다.
- 라펠·버튼·포켓·소매와 소재 보드는 크기를 달리해 정보의 중요도를 표현합니다.
- 별도 Fit/Styling 보드를 생략하고 착용·스타일링·컬러 정보는 최종 상세페이지에 모읍니다.
- 최종 상세페이지는 **PRIMARY OUTCOME**, 캠페인 응용은 **CAMPAIGN OUTCOME**으로 명시합니다.
- 상세페이지 설명은 위에 배치하고 전체 결과물을 최대 1240px 폭으로 표시합니다.
- 캠페인 응용은 최대 1120px, closing 모델은 280px 폭으로 결과물의 우선순위를 구분합니다.
- 실제 판매 실적, 전환율, 소재 함량, 상품 가격이나 인증 정보는 추가하지 않았습니다.

## 실제 사용 이미지

공통 경로: `assets/images/projects/NOIR_FORM_images/NOIR_FORM_images/`
중첩 폴더명과 원본 파일명을 그대로 사용합니다.

| 파일 | 원본 크기 | 용도 |
| --- | --- | --- |
| 01-hero.png | 1122×1402 | Key Visual / 모델 화보 |
| 02-product.png | 1122×1402 | 제품 단독 컷 |
| 03-silhouette.png | 1122×1402 | 정면·측면·후면 비교 |
| 04-detail.png | 1122×1402 | 라펠·버튼·포켓·소매 |
| 05-fabric.png | 1122×1402 | 소재와 표면 디테일 |
| 16-commerce-page-final.png | 820×1919 | 최종 롱폼 상품 상세페이지 |
| 17-campaign-applications.png | 1536×1024 | 최종 캠페인 응용 |
| 10-campaign-model.png | 1024×1536 | 마무리 캠페인 모델 비주얼 |

17개 중 8개를 사용했습니다. 06·07·08·09·11·12와 상세페이지 13·14·15 버전은
최종 결과물과 중복되는 구성이라 화면에서 제외했습니다. 원본은 모두 보존합니다.
모든 이미지에 실제 width/height, alt, lazy loading, async decoding을 지정하며
`width:100%; height:auto; object-fit:contain`으로 전체 비율을 유지합니다.

## 반응형과 검증

1024px에서 간격과 제목 크기를 조정하고, 720px 이하에서는 split layout을 한 열로 바꿉니다.
모바일에도 제품컷 68%, 소재 보드 78%로 크기 대비를 유지하며 상세페이지와 캠페인 응용은
화면 폭 전체를 사용합니다. 모바일의 상세페이지 확대 버튼은 같은 이미지를 820px 이상으로
확대하며 이미지 영역 안에서 좌우로 스크롤할 수 있습니다. 별도 이미지 복제는 없습니다.
전체 보기로 되돌리거나 원본 링크를 새 탭에서 열 수 있으며 JS가 없어도 전체 결과물은 표시됩니다.
390px 이하에서는 이미지 바로 위에 “확대해서 상세 디자인을 살펴보세요.” 안내를 표시합니다.
Desktop에서는 안내가 표시되지 않으며 레이아웃과 원본 이미지는 그대로 유지합니다.
캠페인 응용은 기존의 원본 크게 보기 링크를 사용합니다.

`validate-foundation.cjs`에 섹션 15개, 순서/번호/내비게이션, 이미지 8개의 정확한 파일명,
대소문자를 포함한 경로, 실제 치수/비율, 반응형 열 수와 크기 대비 검증을 추가했습니다.
기존 OFFBEAT 음원/이미지, MORU, AI Creative 및 키보드·딥링크·JS 비활성 검사를 유지합니다.
수정 전/후 전체 페이지와 09·10 스크린샷 및 실제 측정값:
`review-artifacts/noir-form/density-before/` / `density-final/`.

검증 결과: 1920·1440·1024·768·390·320px 모두 PASS. 이미지 경로/비율 오류,
가로 넘침, 내비게이션 겹침, 브라우저 오류가 없었습니다. 기존 13개 섹션의 본문과
모든 원본 에셋 92개를 보존했습니다. 자세한 결과는 [검증 기록](validation.md)을 참고합니다.

## 시각적 밀도 수정 — 전체 렌더 측정

측정은 Chromium, reduced motion, 모든 원본 이미지 로딩 완료 후의 기본 표시 상태입니다.
모바일 상세페이지 확대 전이며 `getBoundingClientRect().height`로 실제 섹션 높이를 기록했습니다.

| 화면 | 09 수정 전 → 후 | 10 수정 전 → 후 |
| --- | --- | --- |
| Desktop 1440×900 | 5157.78 → 4293.94px | 4642.19 → 5430.14px |
| Mobile 390×844 | 4665.69 → 3920.84px | 3477.58 → 3004.63px |

Desktop의 10은 상세페이지를 가장 큰 결과물로 확대하면서 높이가 증가했습니다.
09·10 합계는 Desktop 9799.97 → 9724.08px, Mobile 8143.27 → 6925.47px입니다.
다른 13개 섹션의 실제 높이는 수정 전후 동일합니다.

최종 상세페이지 폭은 Desktop 744.20 → 1238.00px, Mobile 345.22 → 388.02px입니다.
캠페인 응용은 Desktop 1120px / Mobile 390.02px, closing 모델은 280px / 207.13px입니다.
09는 이미지 5개, 10은 최종 결과물 2개와 closing 1개로 총 8개이며 MORU의 9개보다 적습니다.
17번 파일 내부의 제공된 캠페인 구성을 그대로 보여주며 추가 콜라주나 잘라낸 반복 이미지는 만들지 않았습니다.

전체 페이지 렌더: `density-final/1440-full-page.png` / `390-full-page.png`.
실제 치수 기록: `density-before/measurements.json` / `density-final/measurements.json`.

이번 밀도 수정 파일: `index.html`, `css/noir-form.css`, `js/main.js`,
`validate-foundation.cjs`, `scripts/render-noir-review.cjs`, 이 문서,
`docs/project-plan.md`, `docs/validation.md`, `design/ASSET-MAP.md` 및 검토 산출물.

## 최초 통합 파일 기록

- 추가: `css/noir-form.css`, `docs/noir-form-case.md`, `scripts/render-noir-review.cjs`.
- 수정: `index.html`, `css/responsive.css`, `js/main.js`, `validate-foundation.cjs`,
  `docs/README.md`, `docs/project-plan.md`, `docs/validation.md`, `design/ASSET-MAP.md`.
- 검토 산출물: `review-artifacts/noir-contact-sheet.jpg`, `noir-before.json`,
  `noir-inspect.py`, `noir-preservation.py`, `noir-density-overview.py`, `noir-density-report.py`,
  `noir-form/` 안의 데스크톱/모바일 전체 렌더·부분 캡처·치수 기록.
- commit/push는 하지 않았습니다.
