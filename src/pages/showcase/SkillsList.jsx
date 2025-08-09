export default function SkillList() {

  const softSkills = [
    "Attention to detail",
    "Debugging",
    "Problem-solving",
    "Written & Verbal Communication",
    "Curiosity & Continuous Learning",
    "Teamwork",
    "Solo work"
  ];

  const skills = [
    "studying CompTIA Security+",
    "Basic Cryptography",
    "Bash (Windows, Linux)",
    "Risk Identification",
    "Cloud Basics",
    "Basic networking: TCP/IP, DNS, DHCP, VPNs"
  ];

  const securityTools = [

  ];



  return (

    <ul className="flex flex-wrap gap-3">

      {skills.map((skill) => (
        <li key="skill" className="px-4 py-2 bg-blue-800/20 rounded-full border border-blue-500 text-blue-300">
            {skill}
        </li>
      ))}

      {softSkills.map((sSkill) => (
        <li key="sSkill" className="px-4 py-2 bg-cyan-800/20 rounded-full border border-cyan-500 text-cyan-300">
            {sSkill}
        </li>
      ))}

      {securityTools.map((tool) => (
        <li key="tool" className="px-4 py-2 bg-indigo-700/20 rounded-full border border-indigo-500 text-indigo-300">
            {tool}
        </li>
      ))}
    </ul>
  );
}
