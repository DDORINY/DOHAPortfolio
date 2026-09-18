# OFFBEAT track workflow

새 곡을 Music Archive에 추가하는 순서입니다.

1. 커버 PNG를 `assets/images/projects/saved-song/`에 추가합니다.
2. MP3를 `assets/audio/`에 추가합니다.
3. `data/offbeat-tracks.json`에 곡 정보를 한 번 추가합니다. `id`와 `order`는 중복될 수 없으며, `featured`와 `order`가 기본 노출 순서를 결정합니다.
   장르·보컬·분위기가 확인되지 않은 곡은 `genre: []`, `vocal: ""`, `character: []`로 등록합니다. 해당 설명은 화면에서 생략하며, 확인 후 추가합니다.
4. 정적 HTML을 생성합니다.

   ```powershell
   node scripts/render-offbeat-tracks.cjs
   ```

5. 생성 결과와 전체 페이지를 검증합니다.

   ```powershell
   node scripts/render-offbeat-tracks.cjs --check
   node scripts/render-offbeat-tracks.cjs --self-test
   node validate-foundation.cjs
   ```

8곡까지는 모든 곡이 표시됩니다. 9곡부터는 `featured: true`인 곡을 `order` 순으로 우선 선택해 6곡을 기본 표시하며, 부족한 자리는 나머지 곡의 `order` 순으로 채웁니다. 그 밖의 곡은 JavaScript 없이 작동하는 **View All Tracks** 영역에 표시됩니다.
