import { tagColours } from "@components/ui/data/TagColours.jsx";

export default function SkillList() {

  const skills = [
    "Attention to detail",
    "Debugging",
    "Problem-solving",
    "Written & Verbal Communication",
    "Curiosity & Continuous Learning",
    "Teamwork",
    "Solo work",
    "studying CompTIA Security+",
    "Basic Cryptography",
    "Bash (Windows, Linux)",
    "Risk Identification",
    "Cloud Basics",
    "Basic networking: TCP/IP, DNS, DHCP, VPNs"
  ];





  return (

    <ul className="flex flex-wrap gap-3">

      {skills.map((skill) => {
        // if skill is found in tagColours, use that style - otherwise default to grey
        const colourClass = tagColours?.[skill] || "bg-gray-700/20 text-gray-300 border border-gray-500";
        return (
          <li key="skill" className={`${colourClass} px-2 py-0.5 rounded-full`}>
            {skill}
          </li>
        );
      })}
    </ul>
  );
}
