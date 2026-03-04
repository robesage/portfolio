'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

type LightboxProps = {
  src: string | null;
  alt?: string;
  onClose: () => void;
};

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl"
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={src} alt={alt ?? '프로젝트 이미지'} fill className="object-contain" />
          </motion.div>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            닫기
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
