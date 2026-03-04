'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
          ← 메인으로 돌아가기
        </Link>
        <h1 className="mt-4 text-4xl font-semibold">{project.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{project.description}</p>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.media.map((item, idx) => (
            <div key={idx} className="relative h-[320px] overflow-hidden rounded-2xl bg-white shadow-soft">
              {item.type === 'image' ? (
                <Image src={item.src} alt={item.alt} fill className="object-cover" />
              ) : (
                <video className="h-full w-full object-cover" src={item.src} autoPlay muted loop playsInline controls />
              )}
            </div>
          ))}
        </section>
      </motion.div>
    </main>
  );
}
