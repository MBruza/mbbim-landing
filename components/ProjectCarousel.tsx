import React, { useState } from "react";

type Project = {
  id: string | number;
  title: string;
  description?: string;
  image: string;      // URL da imagem usada no card
  fullImage?: string; // opcional: URL da imagem em maior resolução
};

interface ProjectCarouselProps {
  projects: Project[];
  title?: string;
}

const VISIBLE_CARDS = 3;

export function ProjectCarousel({ projects, title }: ProjectCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const total = projects.length;
  const maxStartIndex = Math.max(0, total - VISIBLE_CARDS);

  if (total === 0) return null;

  const handleNext = () => {
    setStartIndex((prev) => {
      if (prev >= maxStartIndex) return 0; // volta pro início
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setStartIndex((prev) => {
      if (prev <= 0) return maxStartIndex; // vai pro último “slide”
      return prev - 1;
    });
  };

  const visibleProjects = projects.slice(
    startIndex,
    startIndex + VISIBLE_CARDS
  );

  return (
    <section className="w-full">
      {title && (
        <h2 className="mb-4 text-2xl font-semibold">
          {title}
        </h2>
      )}

      {/* Container principal com setas e cards */}
      <div className="flex items-center gap-4">
        {/* Seta esquerda */}
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-full border px-3 py-2 text-sm hover:bg-gray-100"
          aria-label="Projetos anteriores"
        >
          ◀
        </button>

        {/* Cards visíveis */}
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <button
                type="button"
                className="relative h-44 w-full overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </button>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {project.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Seta direita */}
        <button
          type="button"
          onClick={handleNext}
          className="rounded-full border px-3 py-2 text-sm hover:bg-gray-100"
          aria-label="Próximos projetos"
        >
          ▶
        </button>
      </div>

      {/* Popup da imagem em alta resolução */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-full max-w-5xl overflow-hidden rounded-xl bg-white p-4"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar na imagem
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white"
            >
              ✕
            </button>

            <img
              src={selectedProject.fullImage || selectedProject.image}
              alt={selectedProject.title}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />

            <p className="mt-3 text-center text-sm text-gray-700">
              {selectedProject.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
