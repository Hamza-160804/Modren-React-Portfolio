"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Calendar,
  Code,
  Palette,
  Smartphone,
  Database,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import weatherImg from "../assets/weather-app.png"
import portfolioimg from "../assets/portfolio.png"
import quizimg from "../assets/quiz-app-img.png"

const projects = [
  {
    id: 1,
    title: "Quiz Application",
    description: "Interactive quiz application with dynamic question loading and score tracking.",
    longDescription:
      "A comprehensive quiz application built with modern web technologies. Features include dynamic question loading, real-time score tracking, timer functionality, and responsive design. The application uses Context API for state management and provides an engaging user experience with smooth animations and intuitive navigation.",
    tech: ["HTML", "CSS", "JavaScript", "Context API"],
    image: `${quizimg}`,
    github: "https://github.com/Hamza-160804/Multiple-choice.github.io",
    live: "https://hamza-160804.github.io/Multiple-choice.github.io/",
    category: "Web Application",
    duration: "2 weeks",
    features: [
      "Dynamic question loading from JSON data",
      "Real-time score calculation and display",
      "Responsive design for all device sizes",
      "Smooth animations and transitions",
      "Progress tracking throughout the quiz",
      "Results summary with performance analytics",
      "Restart functionality for multiple attempts",
    ],
    challenges: [
      "Implementing efficient state management without external libraries",
      "Creating smooth animations while maintaining performance",
      "Ensuring cross-browser compatibility",
      "Optimizing for mobile devices",
    ],
    technologies: [
      { name: "HTML5", icon: <Globe className="h-5 w-5" />, description: "Semantic markup structure" },
      { name: "CSS3", icon: <Palette className="h-5 w-5" />, description: "Advanced styling and animations" },
      { name: "JavaScript", icon: <Zap className="h-5 w-5" />, description: "Interactive functionality" },
      { name: "Context API", icon: <Database className="h-5 w-5" />, description: "State management" },
    ],
  },
  {
    id: 2,
    title: "Personal Portfolio",
    description: "A personal portfolio project built with HTML and CSS focusing on modern UI/UX design.",
    longDescription:
      "A sleek and modern personal portfolio website showcasing my skills, projects, and experience. Built with pure HTML5 and CSS3, this project demonstrates advanced CSS techniques including flexbox, grid, animations, and responsive design principles. The portfolio features a clean, minimalist design with smooth scrolling and interactive elements.",
    tech: ["HTML5", "CSS3", "Responsive Design", "Animations"],
    image: `${portfolioimg}`,
    github: "https://github.com/Hamza-160804/Portfolio.github.io",
    live: "https://hamza-160804.github.io/Portfolio.github.io/",
    category: "Portfolio Website",
    duration: "3 weeks",
    features: [
      "Fully responsive design across all devices",
      "Smooth CSS animations and transitions",
      "Interactive navigation with scroll effects",
      "Modern grid and flexbox layouts",
      "Optimized images and performance",
      "Cross-browser compatibility",
      "Accessible design with semantic HTML",
    ],
    challenges: [
      "Creating complex layouts without CSS frameworks",
      "Implementing smooth animations with pure CSS",
      "Ensuring pixel-perfect responsive design",
      "Optimizing performance without build tools",
    ],
    technologies: [
      { name: "HTML5", icon: <Globe className="h-5 w-5" />, description: "Semantic structure and accessibility" },
      { name: "CSS3", icon: <Palette className="h-5 w-5" />, description: "Advanced styling and animations" },
      { name: "Responsive Design", icon: <Smartphone className="h-5 w-5" />, description: "Mobile-first approach" },
    ],
  },
  {
    id: 3,
    title: "Weather Application",
    description: "A weather application built using React and OpenWeatherMap API with real-time data.",
    longDescription:
      "A comprehensive weather application that provides real-time weather information for cities worldwide. Built with React and integrated with the OpenWeatherMap API, this application features current weather conditions, 5-day forecasts, location-based weather detection, and a beautiful, intuitive user interface with dark mode support.",
    tech: ["React", "OpenWeatherMap API", "Dark Mode", "Responsive Design"],
    image: `${weatherImg}`,
    github: "https://github.com/Hamza-160804/weather-app",
    live: "https://hamza-160804.github.io/weather-app/",
    category: "React Application",
    duration: "4 weeks",
    features: [
      "Real-time weather data from OpenWeatherMap API",
      "Current weather conditions ",
      "Location-based weather detection using geolocation",
      "Search functionality for global cities",
      "Responsive design for all screen sizes",
      "Weather icons and visual indicators",
      "Error handling for invalid locations and API failures",
    ],
    challenges: [
      "Handling asynchronous API calls and error states",
      "Implementing geolocation with user permissions",
      "Creating an intuitive search experience",
      "Managing complex state with multiple data sources",
    ],
    technologies: [
      { name: "React", icon: <Code className="h-5 w-5" />, description: "Component-based architecture" },
      { name: "OpenWeatherMap API", icon: <Database className="h-5 w-5" />, description: "Weather data source" },
      { name: "JavaScript ES6+", icon: <Zap className="h-5 w-5" />, description: "Modern JavaScript features" },
      { name: "CSS3", icon: <Palette className="h-5 w-5" />, description: "Styling and animations" },
    ],
  },
]

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [isDark] = useState(true)
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef();
   
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const animatedElementsRef = useRef(new Set());

useEffect(() => {
  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Only trigger animation if element hasn't been animated before
        if (entry.isIntersecting && !animatedElementsRef.current.has(entry.target.id)) {
          // Add element to set of animated elements
          animatedElementsRef.current.add(entry.target.id);
          // Stop observing this element since it's been animated
          observerRef.current.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll("[data-animate]");
  elements.forEach((el) => observerRef.current.observe(el));

  return () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };
}, []);


  useEffect(() => {
    const foundProject = projects.find((p) => p.id === Number.parseInt(id))
    setProject(foundProject)

    if (!foundProject) {
      navigate("/404")
    }
  }, [id, navigate])
    useEffect(() => {
    // Always add dark class
    document.documentElement.classList.add("dark")
    }, [isDark])

  const handlePrevious = () => {
    const currentIndex = projects.findIndex((p) => p.id === Number.parseInt(id))
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
    navigate(`/projects/${projects[prevIndex].id}`)
  }

  const handleNext = () => {
    const currentIndex = projects.findIndex((p) => p.id === Number.parseInt(id))
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
    navigate(`/projects/${projects[nextIndex].id}`)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
    >
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? "bg-purple-500" : "bg-blue-400"
          }`}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? "bg-blue-500" : "bg-purple-400"
          }`}
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${isDark ? "bg-black/80 border-purple-500/20" : "bg-white/80 border-blue-200/50"} border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Button onClick={() => window.open(project.github, "_blank")} variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                Code
              </Button>
              {project.live && (
                <Button
                  onClick={() => window.open(project.live, "_blank")}
                  size="sm"
                  className={`bg-gradient-to-r ${isDark ? "from-purple-500 to-blue-500" : "from-blue-500 to-purple-500"} text-white`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
        {/* Hero Section */}
        <div className="mb-12"data-aos = "fade-up">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span key={index} className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm text-white">
                    {tech}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-lg text-white/90">{project.description}</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8" data-aos = "flip-up">
            <Card className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardContent className="p-6 text-center">
                <Calendar className={`h-8 w-8 mx-auto mb-2 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{project.duration}</p>
              </CardContent>
            </Card>

            <Card className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardContent className="p-6 text-center">
                <Code className={`h-8 w-8 mx-auto mb-2 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                <h3 className="font-semibold mb-1">Category</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{project.category}</p>
              </CardContent>
            </Card>

            <Card className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardContent className="p-6 text-center">
                <Zap className={`h-8 w-8 mx-auto mb-2 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                <h3 className="font-semibold mb-1">Technologies</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{project.tech.length} Used</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Description */}
          <div  >
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-purple-400" : "text-blue-600"}`}data-aos = "zoom-in-up">
              Project Overview
            </h2>
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}data-aos = "zoom-in-up">
              {project.longDescription}
            </p>

            {/* Technologies Used */}
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-purple-400" : "text-blue-600"}`}data-aos = "zoom-in-down">
              Technologies Used
            </h3>
            <div className="space-y-4">
              {project.technologies.map((tech, index) => (
                <Card
                data-aos = "zoom-out"
                  key={index}
                  className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${isDark ? "bg-purple-500/20 text-purple-400" : "bg-blue-100 text-blue-600"}`}
                      >
                        {tech.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{tech.name}</h4>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{tech.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features & Challenges */}
          <div>
            {/* Key Features */}
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-purple-400" : "text-blue-600"}`} data-aos = "zoom-in-right">Key Features</h3>
            <Card className={`mb-8 ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`} data-aos = "zoom-in-up">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${isDark ? "bg-purple-400" : "bg-blue-500"}`} />
                      <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Challenges */}
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-purple-400" : "text-blue-600"}`} data-aos = "zoom-out-up">
              Challenges Overcome
            </h3>
            <Card className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`} data-aos = "zoom-out-down">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${isDark ? "bg-amber-400" : "bg-amber-500"}`} />
                      <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handlePrevious} variant="outline" className="flex items-center gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-2" />
            Previous Project
          </Button>
          <Button onClick={handleNext} variant="outline" className="flex items-center gap-2 bg-transparent">
            Next Project
            <ChevronRight className="h-4 w-2" />
          </Button>
        </div>
      </main>
    </div>
  )
}

export default ProjectDetail
