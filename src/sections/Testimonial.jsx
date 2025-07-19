import { motion } from "framer-motion";

const skillLogoMap = {
  HTML: "html5.svg",
  CSS: "css3.svg",
  JavaScript: "javascript.svg",
  React: "react.svg",
  "Tailwind CSS": "tailwindcss.svg",
  Git: "git.svg",
  "VS Code": "visualstudiocode.svg",
  C: "C_Programming_Language.svg.png",
  Python: "Python-logo-notext.svg.png",
  JAVA: "Java_programming_language_logo.svg.png",
  SQL: "Sql_data_base_with_logo.svg.png",
  MongoDB: "mongodb-icon-1.svg",
  Docker: "docker-xqo7wujxqilykvirnqyj59.webp",
  Figma: "Figma-logo.svg.png",
  Canva: "Canva_Logo.svg.png",
};

const skillsData = [
  {
    icon: "💻",
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    color: "from-indigo to-storm",
  },
  {
    icon: "⚙️",
    title: "Backend",
    skills: ["C", "Python", "JAVA", "SQL", "MongoDB"],
    color: "from-indigo to-storm",
  },
  {
    icon: "🛠️",
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "VS Code"],
    color: "from-indigo to-storm",
  },
  {
    icon: "🎨",
    title: "Design & UX",
    skills: ["Figma", "Canva"],
    color: "from-indigo to-storm",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const skillVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading mb-8 text-center">Technical Skills</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((cat) => (
          <motion.div
            key={cat.title}
            variants={cardVariants}
            className={`relative rounded-2xl p-6 shadow-xl bg-gradient-to-br ${cat.color} bg-opacity-80 backdrop-blur-lg border border-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
            whileHover={{ y: -8, scale: 1.04 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="text-2xl font-bold text-white drop-shadow">{cat.title}</h3>
            </div>
            <ul className="space-y-2 mt-4">
              {cat.skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={skillVariants}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-lg text-white font-medium shadow hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.18)" }}
                >
                  {skillLogoMap[skill] && (
                    <img
                      src={`assets/logos/${skillLogoMap[skill]}`}
                      alt={`${skill} logo`}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
