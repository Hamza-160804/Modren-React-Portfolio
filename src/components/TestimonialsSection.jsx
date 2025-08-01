import React from "react";
import { testimonials } from "../utils/data";
import Gulamimg from "../assets/Gulam.png";
import { motion } from 'framer-motion';

const imageMap = { Gulamimg };

export default function TestimonialsSection() {
  return (
    <motion.section
      className="py-20 lg:py-32 "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp">
            Testimonials
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            What people say about me
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12" data-aos="flip-left">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center mb-4">
                <img
                  src={imageMap[testimonial.image] || testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-purple-400">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <div className="text-gray-300 mb-4">{testimonial.content}</div>
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-gray-600">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 