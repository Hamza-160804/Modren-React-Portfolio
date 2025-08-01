import React, { useState } from "react";
import { projects } from "../utils/data";
import quizimg from "../assets/quiz-app-img.png";
import portfolioimg from "../assets/portfolio.png";
import weatherImg from "../assets/weather-app.png";
import { Card, CardContent } from "./ui/Card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ExternalLink, Eye, Github } from "lucide-react";

const imageMap = { quizimg, portfolioimg, weatherImg };

export default function ProjectsSection() {
  const [isDark] = useState(false);
  const navigate = useNavigate();
  return (
    <motion.section
      id="projects"
      className="py-20 lg:py-32 "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp">
            Projects
          </h2>
          <p
            className="text-lg lg:text-xl text-gray-300 animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            Some of my recent work
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Card
              data-aos="slide-up"
              key={project.id}
              className="group hover:scale-105 transition-all duration-500
                    bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
              style={{ animationDelay: `${index * 100}ms` }}
              data-animate
              id={`project-${index}`}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={imageMap[project.image] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`${
                          isDark
                            ? "border-purple-400 text-purple-400 hover:bg-purple-400/10"
                            : "border-blue-500 text-blue-500 hover:bg-blue-500/10"
                        } transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      {project.live !== "#" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`${
                            isDark
                              ? "border-purple-400 text-purple-400 hover:bg-purple-400/10"
                              : "border-blue-500 text-blue-500 hover:bg-blue-500/10"
                          } transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                          onClick={() => window.open(project.live, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm lg:text-base mb-4 text-gray-300">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="mb-4">
                    <ul className="text-xs space-y-1 text-gray-500 hover:text-gray-300">
                      {project.details
                        .slice(0, 2)
                        .map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-1"
                          >
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs lg:text-sm rounded-full transition-colors hover:scale-105 
                            bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 mb-4 gap-2 items-center w-full">
                    <Button
                      size="default"
                      variant="outline"
                      className={`${
                        isDark
                          ? "border-purple-400 text-purple-400 hover:bg-purple-400/10"
                          : "border-blue-500 text-blue-500 hover:bg-blue-500/10"
                      } transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
