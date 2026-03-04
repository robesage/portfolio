import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/project-detail';
import { getProjectBySlug } from '@/data/projects';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
