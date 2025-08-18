import { useState } from "react";
import { tagColours } from "@components/ui/data/TagColours.jsx";

export default function Accordion({ projects = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //console.log(tagColours);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {projects.map((project, index) => (
        <div key={project.title} className="border border-pink-200/40 rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-900/0 hover:bg-pink-800/20 transition"
          >
            <div>
              <h2 className="font-semibold text-lg">{project.title}</h2>
              <p className="text-sm text-gray-600">{project.tagline}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {project.tags?.map((tag) => {
                  // safe access with fallback
                  const colourClass = tagColours?.[tag] || "bg-gray-700/20 text-gray-300 border border-gray-500";
                  return (
                    <span key={tag} className={`${colourClass} px-2 py-0.5 rounded-full`}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
            <span className="text-3xl ml-4 text-gray-500">{openIndex === index ? "−" : "+"}</span>
          </button>

          <div className={`${openIndex === index ? 'max-h-screen opacity-100 p-4' : 'max-h-0 opacity-0 p-0'} overflow-hidden bg-gray-900/0 border-t border-pink-300/40 transition-all duration-300 ease-in-out space-y-3`}> 
            <div className="space-y-3">
              {openIndex === index && (
                <>
                  <p><strong>Overview:</strong> {project.overview}</p>
                  <p><strong>Approach:</strong> {project.approach}</p>
                  <p><strong>Outcome:</strong> {project.outcome}</p>

                  {/* Optional code block */}
                  {project.code && (
                    <pre className="bg-gray-900 p-3 rounded text-green-400 overflow-x-auto">
                      <code>{project.code}</code>
                    </pre>
                  )}

                  {/* Optional image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="rounded mt-2 mx-auto"
                    />
                  )}

                  {/* Optional links */}
                  {project.links?.length > 0 && (
                    <div className="flex gap-4 flex-wrap">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
