"use client";

import { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Mail,
  Menu,
  ArrowDown,
  X,
  Code,
  Palette,
  Smartphone,
  Download,
  Code2,
  Atom,
  TerminalSquare,
  Database,
  Paintbrush,
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactModal from "./ui/Contact";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import HamzaImg from "../assets/Hamza.jpg";
import Gulamimg from "../assets/Gulam.png";
import FiverrIcon from "./ui/fiverr";
import { projects, skills, testimonials } from "../utils/data";
import quizimg from "../assets/quiz-app-img.png";
import portfolioimg from "../assets/portfolio.png";
import weatherImg from "../assets/weather-app.png";
import { Loader } from "../components/ui/Loader";
import Hamza_CV from "../assets/Hamza_CV_Frontend Developer.pdf";
import AOS from "aos";
import "aos/dist/aos.css";
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ServicesSection = lazy(() => import("./ServicesSection"));
const ExperienceSection = lazy(() => import("./ExperienceSection"));
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));
const EducationAndCertificationSection = lazy(() => import("./EducationAndCertificationSection"));

// FontAwesome icons
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
function Portfolio() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [isContactOpen, setIsContactOpen] = useState(false);
  const observerRef = useRef();
  const navigate = useNavigate();

  const handleContactClose = () => setIsContactOpen(false);
  const [isDark] = useState(true);  // Always set to dark theme

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,  // animation duration in ms
      once: true,     // whether animation should happen only once
      easing: "ease-in-out",
      offset: 50,     // offset (px) from the original trigger point
    });
  }, []);

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
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
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
// Placeholder for contact modal open handler
const handleContactOpen = () => {
  setIsContactOpen(true);
};


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };


  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description:
        "Full-stack web applications with modern technologies and best practices.",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that provide exceptional user experiences.",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "App Development",
      description:
        "Cross-platform mobile applications for iOS and Android devices.",
    },
  ];

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

  const imageMap = {
    quizimg,
    portfolioimg,
    weatherImg,
    Gulamimg,
  };
  const iconMap = {
    Code2: (color) => <Code2 size={24} color={color} />,
    Atom: (color) => <Atom size={24} color={color} />,
    TerminalSquare: (color) => <TerminalSquare size={24} color={color} />,
    Database: (color) => <Database size={24} color={color} />,
    Paintbrush: (color) => <Paintbrush size={24} color={color} />,
  };

  return (
    <div
      className="min-h-screen transition-all duration-500 bg-black text-white"
    >
      {/* Contact Modal */}
     <ContactModal
  isContactOpen={isContactOpen}
  handleContactClose={handleContactClose}
  isDark={isDark}
/>


      {/* Animated Background Elements */}
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

      {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
            isDark
          ? "bg-black/80 border-purple-500/20"
          : "bg-white/80 border-blue-200/50"
          } border-b ${isContactOpen ? 'hidden' : ''}`}
          style={{ transform: `translateY(${scrollY > 100 ? "-80px" : "0px"})` }}
        >
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex justify-between items-center py-4">
          <div
            className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${
              isDark
            ? "from-purple-400 to-blue-400"
            : "from-blue-500 to-purple-500"
            } bg-clip-text text-transparent animate-pulse cursor-pointer`}
            onClick={() => scrollToSection("home")}
          >
            Hamza
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {[
              { name: "Home", id: "home" },
              { name: "About", id: "about" },
              { name: "Education", id: "education" },
              { name: "Experience", id: "experience" },
              { name: "Projects", id: "projects" },
              { name: "Services", id: "services" },
            ].map((item, index) => (
              <button
            key={item.name}
            onClick={() => scrollToSection(item.id)}
            className="hover:text-purple-400 transition-all duration-300 transform hover:scale-110 relative group"
            style={{ animationDelay: `${index * 100}ms` }}
              >
            {item.name}
            <span
              className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${
                isDark
              ? "from-purple-400 to-blue-400"
              : "from-blue-500 to-purple-500"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
              </button>
            ))}

            <Button
              onClick={handleContactOpen}
              className={`bg-gradient-to-r ${
            isDark
              ? "from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              } text-white border-0 transform hover:scale-105 transition-all duration-300`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={handleContactOpen}
              size="sm"
              className={`bg-gradient-to-r ${
            isDark
              ? "from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              } text-white border-0 mr-2`}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
            >
              {isMenuOpen ? (
            <X className="h-5 w-5" />
              ) : (
            <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
            </div>

            {/* Mobile Menu */}
            <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
            >
          <div className="flex flex-col space-y-4">
            {[
              { name: "Home", id: "home" },
              { name: "About", id: "about" },
              { name: "Experience", id: "experience" },
              { name: "Projects", id: "projects" },
              { name: "Services", id: "services" },
              { name: "Education", id: "education" },
            ].map((item, index) => (
              <button
            key={item.name}
            onClick={() => scrollToSection(item.id)}
            className="text-left hover:text-purple-400 transition-colors transform hover:translate-x-2"
            style={{
              animation: isMenuOpen
                ? `slideInLeft 0.3s ease-out ${index * 100}ms both`
                : "none",
            }}
              >
            {item.name}
              </button>
            ))}
          </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 w-full">
          <div className="text-center">
            <div
              className={`inline-block p-1 rounded-full bg-gradient-to-r ${
                isDark
                  ? "from-purple-500 to-blue-500"
                  : "from-blue-400 to-purple-400"
              } mb-8 `}
              data-animate
              id="hero-avatar"
            >
              <div
                className={`w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden ${
                  isDark ? "bg-black" : "bg-white"
                } flex items-center justify-center transition-all duration-500`}
              >
                <div className="w-28 h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 animate-pulse">
                  <img
                    src={HamzaImg}
                    alt="Hamza-img"
                    loading="lazy"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <h1
              className="text-5xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 animate-fadeInUp"
              style={{ animationDelay: "200ms" }}
            >
              <span
                className={`bg-gradient-to-r ${
                  isDark
                    ? "from-white to-purple-200"
                    : "from-gray-900 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Rao Muhammad Hamza
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-8 ${
                isDark ? "text-purple-200" : "text-blue-600"
              } animate-fadeInUp`}
              style={{ animationDelay: "400ms" }}
            >
              Frontend Developer
            </p>

            <p
              className={`text-lg lg:text-xl max-w-4xl mx-auto mb-12 ${
                isDark ? "text-gray-300" : "text-gray-600"
              } animate-fadeInUp`}
              style={{ animationDelay: "600ms" }}
            >
              Passionate about creating efficient, user-friendly web solutions
              that drive business success and enhance user experience.
              Specializing in React, JavaScript, and modern web technologies.
            </p>

            <div
              className="flex items-center justify-center gap-4 mb-8 animate-fadeInUp wrapper"
              style={{ animationDelay: "700ms" }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="  icon"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/rao-hamza-920a04246/",
                    "_blank"
                  )
                }
              >
                <i className=" fa-linkedin"><FontAwesomeIcon icon={faLinkedin} /></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="  icon"
                onClick={() =>
                  window.open("https://github.com/Hamza-160804/", "_blank")
                }
              >
                <i className="fa-github" ><FontAwesomeIcon icon={faGithub} /></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="  icon"
                onClick={() =>
                  window.open("https://www.fiverr.com/raohamza1608", "_blank")
                }
              >
                <i className=" fa-fiverr" ><FiverrIcon /></i> 
              </Button>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center animate-fadeInUp"
              style={{ animationDelay: "800ms" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className={`bg-gradient-to-r ${
                  isDark
                    ? "from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                } text-white border-0 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className={`${
                  isDark
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = Hamza_CV;
                  link.download = "Hamza_CV_Frontend Developer.pdf";
                  link.click();
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </Button>
            </div>

            <div className="mt-16 animate-bounce">
              <ArrowDown
                className={`h-6 w-6 mx-auto cursor-pointer ${
                  isDark ? "text-purple-400" : "text-blue-500"
                }`}
                onClick={() => scrollToSection("about")}
              />
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-gray-900/50 ">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div
            className="text-center mb-16 lg:mb-24"
            data-animate
            id="about-header"
          >
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r ${
                isDark
                  ? "from-purple-400 to-blue-400"
                  : "from-blue-500 to-purple-500"
              } bg-clip-text text-transparent ${
                isVisible["about-header"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              About Me
            </h2>
            <p
              className={`text-lg lg:text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } ${
                isVisible["about-header"] ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              Passionate about creating exceptional digital experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              data-animate
              id="about-content"
              className={
                isVisible["about-content"] ? "animate-slideInLeft" : "opacity-0"
              }
            >
              <p
                className={`text-lg lg:text-xl mb-6 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I'm a passionate Frontend Developer currently pursuing my
                Bachelor's in Computer Science at NFC Institute of Engineering
                and Technology. With hands-on experience from my internship at
                Developer's Hub Corp., I specialize in creating responsive,
                user-friendly web applications.
              </p>
              <p
                className={`text-lg lg:text-xl mb-8 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                My goal is to leverage my skills in web development,
                problem-solving, and teamwork to contribute to innovative
                projects while continuously learning and growing in a dynamic
                environment.
              </p>

              <div className="flex space-x-4 lg:space-x-6 wrapper" data-animate id="social-links">
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon"
                  onClick={() =>
                    window.open("https://github.com/Hamza-160804/", "_blank")
                  }
                >
                  <i className=" fa-github" ><FontAwesomeIcon icon={faGithub}/></i>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rao-hamza-920a04246/",
                      "_blank"
                    )
                  }
                >
                   <i className=" fa-linkedin " ><FontAwesomeIcon  icon={faLinkedin}/></i>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon"
                  onClick={() =>
                    window.open("https://www.fiverr.com/raohamza1608", "_blank")
                  }
                >
                  <i className=" fa-fiverr" ><FiverrIcon  /></i>
                </Button>
              </div>
            </div>

            <div
              className="space-y-6 lg:space-y-8"
              data-aos = "fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-animate
              id="skills-section"
            >
              {skills.map((skill, index) => (
                <div

                  key={index}
                  className="skill-section"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg lg:text-xl flex items-center gap-2">
                      <span className="text-2xl">{iconMap[skill.icon]?.(skill.color)}</span>
                      {skill.name}
                    </span>
                    <span
                      className={`${
                        isDark ? "text-purple-400" : "text-blue-500"
                      } text-lg lg:text-xl`}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-3 lg:h-4 rounded-full ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-3 lg:h-4 rounded-full bg-gradient-to-r ${
                        isDark
                          ? "from-purple-500 to-blue-500"
                          : "from-blue-400 to-purple-400"
                      } transition-all duration-2000 ease-out ${
                        isVisible["skills-section"] ? "" : "w-0"
                      }`}
                      style={{
                        width: isVisible["skills-section"]
                          ? `${skill.level}%`
                          : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education And Certification Section */}
      <Suspense fallback={<Loader />}>
        <EducationAndCertificationSection isDark={isDark} />
      </Suspense>

      {/* Experience Section */}
      <Suspense fallback={<Loader />}>
        <ExperienceSection
          experience={experience}
          isDark={isDark}
          isVisible={isVisible}
          iconMap={iconMap}
        />
      </Suspense>

      {/* Projects Section */}
        <Suspense fallback={<Loader />}>
          <ProjectsSection
            projects={projects}
            imageMap={imageMap}
            isDark={isDark}
            isVisible={isVisible}
            onProjectClick={handleProjectClick}
          />
        </Suspense>

        {/* Services Section */}
      <Suspense fallback={<Loader />}>
        <ServicesSection
          services={services}
          isDark={isDark}
          isVisible={isVisible}
        />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<Loader />}>
        <TestimonialsSection
          testimonials={testimonials}
          imageMap={imageMap}
          isDark={isDark}
          isVisible={isVisible}
        />
      </Suspense>

      {/* Contact Section */}
      <section
        data-aos = "zoom-in"
        id="contact"
        className="py-20 lg:py-32 bg-gray-900/50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div data-animate id="contact-section">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r ${
                isDark
                  ? "from-purple-400 to-blue-400"
                  : "from-blue-500 to-purple-500"
              } bg-clip-text text-transparent ${
                isVisible["contact-section"] ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              Let's Work Together
            </h2>
            <p
              className={`text-lg lg:text-xl mb-12 lg:mb-16 max-w-4xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              } ${
                isVisible["contact-section"] ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life and create
              something amazing together.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center ${
                isVisible["contact-section"] ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: "400ms" }}
            >
              <Button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/rao-hamza-920a04246/",
                    "_blank"
                  )
                }
                size="lg"
                variant="outline"
                className={`${
                  isDark
                    ? "border-purple-400 text-purple-400 hover:bg-purple-400/10"
                    : "border-blue-500 text-blue-500 hover:bg-blue-500/10"
                } transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5 mr-2"  />
                Connect on LinkedIn
              </Button>
              <Button
                onClick={() =>
                  window.open("https://www.fiverr.com/raohamza1608", "_blank")
                }
                size="lg"
                variant="primary"
                className={`bg-gradient-to-r ${
                  isDark
                    ? "from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                } text-white border-0 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
              >
                <FiverrIcon className="h-5 w-5 mr-2" />
                Hire Me on Fiverr
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 lg:py-12 "
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg`}
          >
            © 2025 Hamza. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
