import { motion } from 'framer-motion';

const experience = [
  {
    title: "Frontend Developer Intern",
    company: "Developer's Hub Corp.",
    period: "Sep 2024 - Nov 2024",
    description: [
      "Developed a quiz application with simple API integration using HTML, CSS, and JavaScript",
      "Created a weather application with straightforward API integration in the MERN stack",
      "Built a complete portfolio by the end of the internship program",
    ],
  },
  {
    title: "Team Member - Final Year Project",
    company: "NFC Institute of Engineering and Technology",
    period: "2024 - 2025",
    description: [
      "Assisted in UI/UX design and completed comprehensive documentation",
      "Collaborated with team on the entire project from UI/UX design to completion",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="py-20 lg:py-32 bg-gray-900/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp">
            Experience
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            My professional journey
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12" data-aos="flip-down">
          {experience.map((exp, index) => (
            <div key={exp.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">{exp.title}</h3>
              <div className="text-gray-300 mb-2">{exp.company}</div>
              <div className="text-xs text-gray-400 mb-4">{exp.period}</div>
              <ul className="list-disc list-inside text-gray-400">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 