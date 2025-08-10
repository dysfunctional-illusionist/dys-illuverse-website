export default function SkillList() {

  const programs = [
    "👾 Piskel",
    "🖌️ Krita",
    "🎨 Clip Studio Paint",
    "🎵 LMMS",
    "🍑 FL Studio",
    "𝄞 Musescore"
  ];

    const technologies = [
    "🧊 Unity", 
    "🤖 Godot 3/4",
    "🐍 Python",
    "☕ Java",
    "©️ C#",
    "🌐 HTML",
    "🌊 CSS",
    "💫 Astro",
    "⚛️ React",
    "༄ TailwindCSS",
    "✨ tsparticles"
  ];



  return (
    <ul class="flex flex-wrap gap-3">

        {technologies.map((t, i) => (
        <li key={t || i} className="px-4 py-2 bg-purple-800/20 rounded-full border border-purple-500 text-purple-300">
            {t}
        </li>
        ))}

        {programs.map((p, i) => (
        <li key={p || i} className="px-4 py-2 bg-pink-800/20 rounded-full border border-pink-500 text-pink-300">
            {p}
        </li>
        ))}

    </ul>
  );
}
