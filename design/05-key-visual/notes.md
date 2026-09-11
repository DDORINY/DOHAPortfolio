# Section 05 — Master Key Visual Design Brief

## Core Direction

- Canvas: `1920 × 1080 px` / `16:9`
- Concept: `Care in Focus`
- Main Copy: `진료에 더 가까이. 기록은 더 자연스럽게.`
- Visual Direction: `Editorial / Calm / Natural / Intelligent / Refined`
- Core Motif: `Voice → Note → Care`
- Goal: 의료·동물병원·AI를 차갑지 않은 Editorial Visual로 연결한다.

피해야 할 표현:

- Neon Green 또는 Blue Tech Color
- SaaS Dashboard처럼 보이는 UI 구성
- Rounded Card의 반복
- Futuristic, Cyberpunk, 과도한 glow
- 마이크·문서·하트 같은 직접적인 아이콘 나열

## Composition

- Large Visual과 넓은 Negative Space를 중심으로 `Visual 70 / Text 30`을 기준으로 한다.
- Large Typography, 얇은 Rule, 비대칭 정렬로 Magazine Spread의 인상을 만든다.
- `Voice → Note → Care`는 waveform, 흐름, 정돈된 정보, focus의 변화로 추상화한다.
- Main Copy와 핵심 Visual이 경쟁하지 않도록 하나만 Primary Focal Point로 설정한다.
- Vertical Typography는 Section 번호나 짧은 영문 Label처럼 보조 정보에만 사용한다.
- 이미지나 그래픽 Crop은 가능하지만 메시지와 핵심 피사체가 잘리지 않아야 한다.

## Color Usage

| 역할 | 색상 | 권장 비율 | 사용 기준 |
| --- | --- | ---: | --- |
| Base | Warm Ivory `#F3EFE5`, Off White `#FAF8F2` | 60–70% | 배경과 Negative Space |
| Primary | Ink `#25251F`, Deep Ink `#181914` | 18–24% | 제목, 본문, 핵심 면, 대비 |
| Accent | Muted Olive `#6F7651` | 7–12% | Focus, 연결, 강조, 얇은 Signal |
| Support | Sage `#BBC3AC`, Sand `#D8CDBB`, Warm Gray `#8B887E` | 3–8% | 보조 면, 캡션, 깊이와 온도 |

- Olive는 화면 전체를 채우기보다 핵심 연결점과 강조에 사용한다.
- Dark Composition은 Navy 대신 Ink 또는 Deep Ink를 사용한다.
- AI와 Technology는 색상 효과가 아니라 Grid, 정보 위계, 선의 흐름과 Motion으로 표현한다.
- 작은 텍스트는 Sage나 Sand 위에 직접 배치하지 말고 Ink 대비를 확보한다.

## Grid & Safe Area

- Artboard: `1920 × 1080 px`
- Outer Safe Area: 상·하·좌·우 `120 px`
- Grid: `12 columns`
- Gutter: `32 px`
- 사용 가능 폭: `1680 px`
- Column 폭: 약 `110.7 px`
- Baseline 권장 단위: `8 px`

제목, Main Copy, 로고성 표기와 핵심 Focal Point는 Safe Area 안에 둔다. 배경 이미지와 장식적인 선만 Artboard 끝까지 확장할 수 있다. 웹에서는 이미지 전체를 `object-fit: contain`으로 표시하므로 Desktop Composition 자체가 잘리지 않는다.

## Typography Hierarchy

| 단계 | 역할 | 권장 크기 |
| --- | --- | ---: |
| Display | `CARE IN FOCUS` | `144–220 px` |
| Main Copy | 국문 캠페인 문구 | `42–64 px` |
| Supporting | `Voice → Note → Care`, 역할 설명 | `20–28 px` |
| Metadata | Section, Media, Personal Project 표기 | `14–18 px` |

- Display는 1–3줄 이내로 구성하고 단단한 정렬 축을 만든다.
- Main Copy는 한글 가독성을 우선하고 과도한 자간을 피한다.
- Metadata는 얇은 Rule 또는 여백으로 분리하며 Display와 경쟁하지 않는다.
- 사용 서체는 현재 Portfolio fallback과 조화를 확인하되, 라이선스가 확보된 서체만 최종 사용한다.

## Working Structure

```text
design/05-key-visual/
├─ source/   PSD, AI, SVG 등 편집 원본
├─ preview/  검토용 PNG/JPG
└─ notes.md
```

## Export

### Desktop

- 경로: `assets/images/key-visual/master-kv.webp`
- 크기: `1920 × 1080 px`
- 형식: WebP / sRGB
- 표시: `aspect-ratio: 16/9`, `object-fit: contain`, 중앙 정렬

### Mobile

- 경로: `assets/images/key-visual/master-kv-mobile.webp`
- 권장 크기: `1080 × 1920 px`
- 형식: WebP / sRGB
- Desktop의 단순 Crop이 아니라 세로 화면에 맞게 Typography와 Focal Point를 재배치한다.
- Mobile 파일이 없으면 Desktop 파일이 `contain`으로 표시된다.

### Quality & Naming

- WebP 품질은 `80–90`을 시작점으로 하며 얇은 선과 작은 글자가 무너지지 않는지 확인한다.
- 최종 Desktop: `master-kv.webp`
- 최종 Mobile: `master-kv-mobile.webp`
- 작업 원본: `care-in-focus-master-kv_v01.psd` 또는 동일한 이름의 AI/SVG
- 검토본: `care-in-focus-master-kv_v01-preview.png`
- 작업 버전은 `v01`, `v02`처럼 두 자리로 관리하고 웹용 최종 Export에서는 버전 번호를 제거한다.

## Web Replacement Behavior

- 실제 Asset이 있으면 Section 05에서 이미지가 기존 Placeholder보다 먼저 표시된다.
- Mobile에서는 Mobile Asset → Desktop Asset → 기존 A/B/C Placeholder 순서로 fallback한다.
- Desktop에서는 Desktop Asset → 기존 A/B/C Placeholder 순서다.
- 이미지가 없을 때 `<img>`를 직접 노출하지 않으므로 broken image가 나타나지 않는다.
- 완성 Asset 표시 중에도 `View A/B/C studies`로 기존 비교 시안에 접근할 수 있다.
