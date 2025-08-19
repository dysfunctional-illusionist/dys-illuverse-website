import { useState } from "react";
import { tagColours } from "@components/ui/data/TagColours.jsx";
import { projects } from "@components/ui/data/CareerProjects.jsx";
import Carousel from "@components/ui/Carousel";

// accordion where projects are fed in from file: for manual data in see Accordion.jsx

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //console.log(tagColours);

  return (
    <div className="grid grid-cols-5 gap-1 mx-auto space-y-1">
      {projects.map((project, index) => (
      <>
        {/* 1/4 width carousel section */}
        <div className="col-span-2 p-4">
          <Carousel slides={project.slides} client:load />
        </div>

        {/* actual dropdown bit */}
        <div key={project.title} className="col-span-3 flex h-auto p-4 border border-pink-200/40 
          rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-900/0
            hover:bg-pink-800/20 transition"
          >
            <div>
              <h2 className="font-semibold text-lg">{project.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{project.tagline}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {project.tags?.map((tag) => {
                  // safe access with fallback
                  const colourClass = tagColours?.[tag] || "bg-gray-700/20 text-gray-300 border border-gray-500";
                  return (
                    <span key={tag} className={`${colourClass} px-3 py-1.5 rounded-full`}>
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

                  {/* Code block */}
                  {project.code && (
                    <pre className="bg-gray-900 p-3 rounded text-green-400 overflow-x-auto my-2">
                      <code>{project.code}</code>
                    </pre>
                  )}

                  {/* Image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded my-2 mx-auto"
                    />
                  )}

                  {/* Embed array */}
                  {project.embed?.map((item, i) => {
                    if (item.type === "mp4") {
                      return (
                        <video
                          key={i}
                          src={item.src} // direct link to MP4
                          controls
                          className="w-full max-w-xl rounded shadow-lg my-2 mx-auto"
                        />
                      );
                    }

                    if (item.type === "image") {
                      return (
                        <img
                          key={i}
                          src={item.src}
                          alt={item.label || `Embed ${i}`}
                          className="w-full max-w-xl rounded shadow-lg my-2 mx-auto"
                        />
                      );
                    }

                    return null;
                  })}


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
      </>
      ))}
    </div>
  );
}
