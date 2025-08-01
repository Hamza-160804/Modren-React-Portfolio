import { Card, CardContent } from "./ui/Card";
import { useEffect } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { motion } from 'framer-motion';
import AOS from "aos";
import "aos/dist/aos.css";



export default function EducationAndCertificationSection({ isDark }) {
  useEffect(() => {
  AOS.init({
    duration: 800,  // animation duration in ms
    once: true,     // whether animation should happen only once
    easing: "ease-in-out",
    offset: 50,     // offset (px) from the original trigger point
  });
}, []);

  return (
    <motion.section
      id="education"
      className="py-20 lg:py-32 "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp">
            Education
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            My Educational journey
          </p>
        </div>
        {/* Education */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8"data-aos = "zoom-in-up" >
            <GraduationCap className={`h-6 w-6 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
            <h3 className={`text-3xl font-bold ${isDark ? "text-purple-400" : "text-blue-600"}`} >Education</h3>
          </div>
          <Card
            className={`group hover:scale-105 transition-all duration-500 ${
              isDark
                ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                : "bg-white border-gray-200 hover:border-blue-300"
            } ` } data-aos = "flip-up"
          >
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Bachelor's of Computer Science</h4>
                  <p className={`text-lg ${isDark ? "text-purple-300" : "text-blue-600"} font-medium`}>
                    NFC Institute of Engineering and Technology
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Calendar className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>2021 - 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Certifications */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8"data-aos = "zoom-in-up">
            <Award className={`h-6 w-6 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
            <h3 className={`text-3xl font-bold ${isDark ? "text-purple-400" : "text-blue-600"}`} >Certifications</h3>
          </div>
          <Card
          data-aos = "flip-up"
            className={`group hover:scale-105 transition-all duration-500 ${
              isDark
                ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                : "bg-white border-gray-200 hover:border-blue-300"
            }`}
          >
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-2">Certificate of Remote Internship as a Frontend Developer</h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Completed comprehensive frontend development internship program covering modern web technologies and
                best practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
} 