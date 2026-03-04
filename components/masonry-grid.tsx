'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo, useState, type ChangeEvent, type DragEvent } from 'react';
import { allMedia } from '@/data/projects';
import { Lightbox } from '@/components/lightbox';

type LocalMediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  fileName: string;
};

const spanMap = {
  normal: 'md:col-span-1 md:row-span-1',
  'col-2': 'md:col-span-2 md:row-span-1',
  'row-2': 'md:col-span-1 md:row-span-2'
};

export function MasonryGrid() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [localMedia, setLocalMedia] = useState<LocalMediaItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const mediaItems = useMemo(() => allMedia, []);

  const addLocalFiles = (files: FileList | null) => {
    if (!files) return;

    const uploaded: LocalMediaItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        return;
      }

      uploaded.push({
        type: file.type.startsWith('video/') ? 'video' : 'image',
        src: URL.createObjectURL(file),
        alt: file.name,
        fileName: file.name
      });
    });

    if (uploaded.length > 0) {
      setLocalMedia((prev) => [...uploaded, ...prev]);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    addLocalFiles(event.target.files);
    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    addLocalFiles(event.dataTransfer.files);
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Portfolio</p>
          <h1 className="text-3xl font-semibold md:text-5xl">Masonry Grid Visual Archive</h1>
          <p className="max-w-3xl text-slate-600">
            채팅창 업로드가 막힌 경우에도 여기에서 이미지/영상을 직접 드래그앤드롭해 즉시 미리 볼 수 있습니다.
          </p>
        </div>

        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition ${
            dragActive ? 'border-slate-900 bg-slate-100' : 'border-slate-300 bg-white'
          }`}
        >
          <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={onFileChange} />
          <p className="text-sm font-semibold text-slate-800">여기로 이미지/영상을 드래그하거나 클릭해서 업로드</p>
          <p className="mt-1 text-xs text-slate-500">허용 형식: 이미지(png, jpg, jpeg, gif, webp) / 영상(mp4, webm, mov)</p>
          <p className="mt-1 text-xs text-slate-500">업로드된 파일은 현재 브라우저에서만 임시로 표시됩니다.</p>
        </label>

        {localMedia.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-3 text-lg font-semibold">방금 올린 파일</h2>
            <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[200px]">
              {localMedia.map((item, idx) => (
                <article key={`${item.fileName}-${idx}`} className="relative overflow-hidden rounded-2xl bg-white shadow-soft">
                  {item.type === 'image' ? (
                    <>
                      <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
                      <button
                        onClick={() => {
                          setLightboxSrc(item.src);
                          setLightboxAlt(item.alt);
                        }}
                        className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900"
                      >
                        크게 보기
                      </button>
                    </>
                  ) : (
                    <video className="h-full w-full object-cover" src={item.src} autoPlay muted loop playsInline controls />
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[200px]">
          {mediaItems.map((item, idx) => {
            const spanClass = spanMap[item.span ?? 'normal'];
            return (
              <motion.article
                layout
                key={`${item.projectSlug}-${idx}`}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-soft ${spanClass}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.35 }}
              >
                {item.type === 'image' ? (
                  <>
                    <Image src={item.src} alt={item.alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-slate-900/0 transition group-hover:bg-slate-900/30" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 text-white opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setLightboxSrc(item.src);
                          setLightboxAlt(item.alt);
                        }}
                        className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900"
                      >
                        라이트박스
                      </button>
                      <Link href={`/projects/${item.projectSlug}`} className="text-xs font-semibold underline underline-offset-2">
                        상세 페이지
                      </Link>
                    </div>
                  </>
                ) : (
                  <VideoCard src={item.src} title={item.projectTitle} />
                )}
              </motion.article>
            );
          })}
        </div>
      </section>

      <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
    </>
  );
}

function VideoCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative h-full w-full">
      <video
        className="h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onMouseEnter={(event) => {
          event.currentTarget.muted = false;
          event.currentTarget.playbackRate = 1.2;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.playbackRate = 1;
        }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-xs font-semibold text-white">
        {title} · Hover 시 사운드/속도 변화
      </div>
    </div>
  );
}
