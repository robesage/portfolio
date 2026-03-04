# Next.js Portfolio (Masonry Grid)

Next.js + Tailwind CSS + Framer Motion으로 만든 포트폴리오 메인/상세 화면입니다.

## 핵심 기능

- Masonry 느낌의 불규칙 Grid 배치 (`col-span-2`, `row-span-2` 포함)
- 이미지 카드 클릭 시
  - 라이트박스 확장 보기
  - 프로젝트 상세 페이지 이동
- 동영상 카드 `<video autoPlay muted loop playsInline>` 적용
  - Hover 시 음소거 해제 + 재생 속도 변경
- 상세 페이지에서 Framer Motion 전환 애니메이션
- 메인 화면에서 이미지/영상 드래그앤드롭 업로드(브라우저 임시 미리보기)

## 실행

```bash
npm install
npm run dev
```

브라우저: `http://localhost:3000`

## 내 사진/영상으로 교체하는 방법

1. `public/media` 폴더에 내 파일 업로드
2. `data/projects.ts`에서 각 카드의 `src`를 내 경로로 변경
   - 이미지 예시: `/media/my-photo.jpg`
   - 영상 예시: `/media/my-loop.mp4`
3. 프로젝트/설명/배치 비율은 `data/projects.ts`에서 수정
   - `span: 'col-2'` (가로 확장)
   - `span: 'row-2'` (세로 확장)

## 채팅창 업로드가 안 될 때

- 채팅 인터페이스 파일 업로드는 앱 코드로 제어할 수 없습니다.
- 대신 메인 화면 업로더에 파일을 드래그하면 즉시 카드로 미리보기 됩니다. (허용 예: png/jpg/jpeg/gif/webp, mp4/webm/mov)
- 이 업로드는 브라우저 임시 표시이므로, 새로고침하면 사라집니다.
- 영구 반영하려면 `public/media`에 파일을 두고 `data/projects.ts`의 `src`를 수정하세요.

## 주요 파일

- `app/page.tsx`: 메인 화면
- `components/masonry-grid.tsx`: Masonry Grid + 카드 상호작용 + 드래그앤드롭 업로드
- `components/lightbox.tsx`: 라이트박스
- `app/projects/[slug]/page.tsx`: 상세 페이지 라우팅
- `components/project-detail.tsx`: 상세 화면 UI/애니메이션
- `data/projects.ts`: 프로젝트/미디어 데이터
