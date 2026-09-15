# OFFBEAT RELEASE 001 — 저장한 노래 / SAVED SONG

## 현재 기획 정의
OFFBEAT = Brand / Content System, 저장한 노래 = 첫 번째 실제 Release / Content Case.
Original Music / Personal Music Content · 2026.
새 관계와 전체 Asset Plan: [OFFBEAT Release System](offbeat-release-system.md).
Role: Concept · Lyrics · Vocal Direction · Music Direction · AI-assisted Production · Revision · Artwork Direction · Content Planning.
음악: Korean Alternative R&B · Neo-soul · Female Solo Vocal · 약 92–95 BPM.
Concept: 끝내지 못했던 음악을 늦은 밤 다시 열어보는 순간.
Mood: Late Night · Intimate · Restrained · Introspective · Unfinished Memory.
현재 커버와 MP3를 RELEASE 001의 Final Content로 정의하며 판매·유통 성과는 주장하지 않습니다.

## 현재 웹 구현 — 통합은 다음 단계
현재 #saved-song이 AI Case와 Process 사이의 별도 secondary section으로 남아 있습니다.
메인 12개 번호와 navigation에는 포함하지 않으며 Project 04로 취급하지 않습니다.

## Previous Direction — 기존 Side Project 구현 기록
아래 내용은 독립 Side Project로 구현했던 기록입니다. 새 기획 정의는 상단을 기준으로 하며,
현재 HTML과 파일 경로는 이번 단계에서 변경하지 않습니다.

### 당시 프로젝트
- Personal Music Content / Personal Project / 2026
- Role: Concept · Lyrics · Vocal Direction · AI-assisted Production · Artwork
- 실제 제작 배경과 과정은 사용자 제공 설명에 근거합니다. 별도 도구명·기술·성과를 추가하지 않았습니다.
- Concept → Writing → Vocal Direction → Music Direction → AI-assisted Production → Revision → Artwork.
- Hero → Cover/Audio 슬롯과 metadata → 7단계 editorial timeline → From Sound to Visual → Final Content.
- #saved-song은 .portfolio-section을 사용하지 않습니다. 자동 번호 생성에 영향을 주지 않으며,
  스크롤 중 main navigation은 앞선 09 AI Case를 유지하고 10 Process에서 전환합니다.
- 이 영역은 reveal로 숨기지 않으므로 JavaScript 비활성 상태에서도 모두 읽을 수 있습니다.

## 연결된 실제 파일
작업 도중 사용자가 저장소 루트에 추가한 원본을 확인하고 아래 경로로 복사했습니다.
원본 saved-song-cover.png, saved-song.mp3는 그대로 보존했으며 SHA256이 복사본과 일치합니다.
- assets/images/projects/saved-song/saved-song-cover.png — 1254×1254, 원본 비율 유지.
- assets/audio/saved-song.mp3 — 실제 제공된 MP3.

커버는 figure/img로 표시하며 보이는 작업실·조명·노트북·악기·밤 도시 중심으로 alt를 작성했습니다.
width/height 1254, loading="lazy", decoding="async", width:100%, height:auto, object-fit:contain을 적용합니다.
데스크톱에서 큰 왼쪽 열을 차지하고, 모바일은 제목 → 이미지 → 음원 순서입니다.
이미지 위에 제목을 중복 overlay하지 않습니다.

플레이어는 audio controls preload="metadata" 및 aria-labelledby="saved-song-listen"을 사용합니다.
연결된 제목은 Listen to "저장한 노래"이며, source type은 audio/mpeg입니다.
autoplay/loop는 없고 커스텀 재생 JavaScript도 없습니다.
음원 파일 열기 링크는 오디오 미지원 브라우저용 fallback입니다.
브라우저 검증에는 실제 이미지 로딩·비율·음원 메타데이터 및 키보드 재생·일시정지를 포함합니다.

## 이전 Foundation 재사용 기록
아래 내용과 마크업은 이전 단계의 보존 기록입니다. 현재 화면에 그대로 삽입하지 않습니다.

## 재사용할 흐름
Reference → Direction → Writing → Generation → Revision → Visual → Publish

- 레퍼런스 분석, 장르/BPM/보컬 방향, 가사와 곡 구조, 생성 후보 비교, 수정, 커버, 발행의 기록
- 기존 음악 섹션의 소개문, ordered list, release slot
- 표시 시 class music-workflow 대신 공통 operation-flow를 사용할 수 있습니다.
- release-slot은 case-material 또는 실제 figure/audio로 전환합니다.
- 실제 음원·커버·발행 링크가 준비된 뒤 연결하고, 가짜 player는 추가하지 않습니다.
- 아래 옛 section id는 보존 기록입니다. 향후 side-music 등 새 id와 heading 참조를 함께 지정합니다.
- 이번 단계에서는 이 코드를 index.html에 삽입하지 않습니다.

## Foundation 원본 마크업 (비활성 보관)

```html
<section class="portfolio-section composition is-ivory" id="project-music" data-label="Project 02 — Music Content" aria-labelledby="project-music-title" tabindex="-1">
<div class="section-inner">
<p class="eyebrow">06 / Project 02 — Music Content</p>
<header class="section-heading reveal"><h2 id="project-music-title">FROM REFERENCE<br>TO RELEASE</h2><p>Music Content Planning &amp; Production</p></header><div class="project-intro reveal"><p>레퍼런스를 해석하고, 음악의 방향을 정하고,<br>사운드와 비주얼을 하나의 콘텐츠로 연결합니다.</p><p class="project-status">Case study in progress</p></div><a class="text-link" href="#project-music-process">Explore the process <span aria-hidden="true">↗</span></a>
</div>
</section>

<section class="portfolio-section composition " id="project-music-process" data-label="Project 02 — Process / Release" aria-labelledby="project-music-process-title" tabindex="-1">
<div class="section-inner">
<p class="eyebrow">07 / Project 02 — Process / Release</p>
<header class="section-heading reveal"><h2 id="project-music-process-title">A TRACK.<br>A COMPLETE PROCESS.</h2></header><ol class="music-workflow reveal"><li><span class="item-number">01</span><h3>REFERENCE</h3><p>레퍼런스 음악 분석</p></li><li><span class="item-number">02</span><h3>DIRECTION</h3><p>장르 / BPM / 분위기 / 보컬 캐릭터 설정</p></li><li><span class="item-number">03</span><h3>WRITING</h3><p>주제 / 가사 / 곡 구조 기획</p></li><li><span class="item-number">04</span><h3>GENERATION</h3><p>AI 기반 음악 생성</p></li><li><span class="item-number">05</span><h3>DIRECTION &amp; REVISION</h3><p>결과 비교 / 재생성 / 보컬 및 사운드 수정</p></li><li><span class="item-number">06</span><h3>VISUAL</h3><p>Cover Artwork 기획 및 제작</p></li><li><span class="item-number">07</span><h3>PUBLISH</h3><p>YouTube / Instagram / X 콘텐츠 배포</p></li></ol><div class="release-slot reveal" data-content-slot="music-release"><h3>RELEASE / CONTENT COMING</h3><p>음원 · Cover Artwork · 발행 링크 준비 중</p></div>
</div>
</section>
```
