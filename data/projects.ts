export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  span?: 'normal' | 'col-2' | 'row-2';
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  media: MediaItem[];
};

export const projects: Project[] = [
  {
    slug: 'urban-flow',
    title: 'Urban Flow Campaign',
    summary: '브랜드 무드보드와 프로모션 컷을 결합한 비주얼 아카이브',
    description:
      '도시의 리듬을 시각화한 캠페인 프로젝트입니다. 정지 이미지와 짧은 루프 영상을 섞어 브랜드 분위기를 전달하고, 상세 페이지에서 전체 컷과 제작 의도를 확인할 수 있습니다.',
    media: [
      { type: 'image', src: '/media/project1-1.svg', alt: '도시 야경 이미지', span: 'col-2' },
      { type: 'video', src: '/media/project1-loop.mp4', alt: '도시 광고 루프 영상' },
      { type: 'image', src: '/media/project1-2.svg', alt: '거리 스냅 이미지', span: 'row-2' },
      { type: 'image', src: '/media/project1-3.svg', alt: '브랜드 포스터 이미지' }
    ]
  },
  {
    slug: 'coastal-stories',
    title: 'Coastal Stories',
    summary: '바다와 여행 감성을 담은 사진/영상 기반 에디토리얼',
    description:
      '풍경 사진과 짧은 영상 스니펫으로 구성한 에디토리얼 프로젝트입니다. 감성적인 톤을 유지하면서도 정보 구조가 분명하도록 카드형 갤러리로 설계했습니다.',
    media: [
      { type: 'video', src: '/media/project2-loop.mp4', alt: '해변 루프 영상', span: 'col-2' },
      { type: 'image', src: '/media/project2-1.svg', alt: '해안 산책로 이미지' },
      { type: 'image', src: '/media/project2-2.svg', alt: '노을 바다 이미지', span: 'row-2' },
      { type: 'image', src: '/media/project2-3.svg', alt: '서핑 이미지' }
    ]
  }
];

export const allMedia = projects.flatMap((project) =>
  project.media.map((item, index) => ({ ...item, projectSlug: project.slug, projectTitle: project.title, index }))
);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
