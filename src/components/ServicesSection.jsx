import { Code, Palette, Smartphone } from "lucide-react";
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Web Development",
    description: "Full-stack web applications with modern technologies and best practices.",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "App Development",
    description: "Cross-platform mobile applications for iOS and Android devices.",
  },
];

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="py-20 lg:py-32 bg-gray-900/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp">
            Services
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            What I can do for you
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12" data-aos = "slide-up">
          {services.map((service, index) => (
            <div key={service.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 flex flex-col items-center animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
              <span className="text-2xl mb-4">{service.icon}</span>
              <span className="font-medium text-xl mb-2">{service.title}</span>
              <p className="text-gray-400 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 