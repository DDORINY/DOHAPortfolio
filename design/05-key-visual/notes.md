# Section 05 — Master Key Visual Guide

- Canvas: `1920 × 1080 px` / `16:9`
- Concept: `Care in Focus`
- Main Copy: `진료에 더 가까이. 기록은 더 자연스럽게.`
- Visual Direction: `Warm Clinical + Human Technology`
- Core Motif: `Voice → Note → Care`

## Color

- Deep Navy: `#102A43`
- Deep Navy Background: `#081C2D`
- Warm Ivory: `#F5F1E8`
- Signal Green: `#25B78A` — signal, connection, activation, focus에 제한
- Soft Sky: `#BFE8F3` — 보조 색상

## Expected Layout

- Visual 70 / Text 30
- Large campaign title과 하나의 강한 focal point를 우선한다.
- 넓은 여백, 명확한 grid와 정렬, 얇은 line을 사용한다.
- `Voice → Note → Care`는 직접적인 아이콘 나열 대신 waveform, flow, structured information, focus의 추상 흐름으로 표현한다.
- 중요한 텍스트와 focal point는 Canvas 가장자리에서 최소 `96 px` 안쪽의 safe area에 둔다.

## Working Structure

```text
design/05-key-visual/
├─ source/   PSD, AI, SVG 등 편집 원본
├─ preview/  검토용 JPG/PNG
└─ notes.md
```

## Export

- Desktop: `assets/images/key-visual/master-kv.webp`
- Mobile: `assets/images/key-visual/master-kv-mobile.webp`
- Desktop 크기: `1920 × 1080 px`, WebP, sRGB
- Mobile 권장 크기: `1080 × 1920 px`, WebP, sRGB
- Desktop은 화면에서 `object-fit: contain`으로 표시되므로 원본이 잘리지 않는다.
- Mobile 파일이 있으면 우선 표시하고, 없으면 Desktop 파일을 `contain`으로 대체한다.
- WebP 품질은 텍스트와 얇은 선이 무너지지 않는 범위에서 약 `80–90`을 시작점으로 조정한다.

## File Naming

- 최종 Desktop: `master-kv.webp`
- 최종 Mobile: `master-kv-mobile.webp`
- 작업 원본: `care-in-focus-master-kv_v01.psd` 또는 확장자에 맞는 동일 형식
- 검토본: `care-in-focus-master-kv_v01-preview.jpg`
- 버전 번호는 `v01`, `v02`처럼 두 자리로 관리하고 웹용 최종 Export에는 버전 번호를 제거한다.
