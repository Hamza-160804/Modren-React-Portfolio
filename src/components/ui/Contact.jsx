"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  X,
  User,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/Button";
import * as contactFallback from "../../utils/contact-fallback";

export default function ContactModal({
  isContactOpen,
  handleContactClose,
  isDark,
}) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contactFormRef = useRef(null);

  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [formErrors, setFormErrors] = useState({});
  const [isContactLoading, setIsContactLoading] = useState(false);

  // Center modal when opened
  useEffect(() => {
    if (isContactOpen) {
      const modal = modalRef.current;
      const width = modal?.offsetWidth || 0;
      const height = modal?.offsetHeight || 0;
      const centerX = (window.innerWidth - width) / 2;
      const centerY = (window.innerHeight - height) / 2;
      setModalPosition({ x: centerX, y: centerY });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isContactOpen, handleContactClose]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleContactClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleContactClose]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        handleContactClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleContactClose]);

  // Drag logic
  const startDrag = (clientX, clientY) => {
    if (!modalRef.current) return;
    setIsDragging(true);
    setDragOffset({
      x: clientX - modalPosition.x,
      y: clientY - modalPosition.y,
    });
  };

  const onMouseDown = (e) => {
    const header = e.target.closest(".modal-header");
    if (header) {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    }
  };

  const onTouchStart = (e) => {
    const header = e.target.closest(".modal-header");
    if (header && e.touches.length === 1) {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }
  };

  const handleDragMove = useCallback(
    (clientX, clientY) => {
      const modal = modalRef.current;
      if (!modal) return;

      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;
      const maxX = window.innerWidth - modal.offsetWidth;
      const maxY = window.innerHeight - modal.offsetHeight;

      setModalPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [dragOffset]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) handleDragMove(e.clientX, e.clientY);
    },
    [isDragging, handleDragMove]
  );

  const onTouchMove = useCallback(
    (e) => {
      if (isDragging && e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [isDragging, handleDragMove]
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", stopDrag);
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", stopDrag);
      };
    }
  }, [isDragging, onMouseMove, stopDrag, onTouchMove]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsContactLoading(true);
    setFormErrors({});

    const formData = new FormData(e.target);
    const { isValid, errors } = contactFallback.validateContactForm(formData);

    if (!isValid) {
      setFormErrors(errors);
      setIsContactLoading(false);
      return;
    }

    const params = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      emailjs.init("PcFzo5u8K7Higxmwf");
      await emailjs.send("service_o3qyx2a", "template_afhb2np", params);

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent!",
        icon: "success",
        background: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#ffffff" : "#1f2937",
        confirmButtonColor: isDark ? "#8b5cf6" : "#3b82f6",
      });

      contactFormRef.current.reset();
      handleContactClose();
    } catch (err) {
      console.error("Email error:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to send your message.",
        icon: "error",
        background: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#ffffff" : "#1f2937",
        confirmButtonColor: isDark ? "#8b5cf6" : "#3b82f6",
      });
    } finally {
      setIsContactLoading(false);
    }
  };

  //Auto-close modal after sending message
    useEffect(() => {
    if (!isContactOpen) return;
    const timer = setTimeout(() => {
      handleContactClose();
    }, 15000); // Auto-close after 15 seconds
    return () => clearTimeout(timer);
  }, [isContactOpen, handleContactClose]);


  if (!isContactOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-aos = "zoom-in"
    >
      <div
        ref={modalRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={window.innerWidth < 640 ? {} : {
          position: "fixed",
          left: `${modalPosition.x}px`,
          top: `${modalPosition.y}px`,
          cursor: isDragging ? "grabbing" : "default",
          userSelect: isDragging ? "none" : "auto",
          touchAction: "none",
        }}
        className={`w-full sm:max-w-lg mx-0 sm:mx-4 rounded-2xl shadow-2xl transition-transform duration-300 bg-gray-900 border border-gray-700 ${window.innerWidth < 640 ? 'h-full rounded-none' : ''}`}
      >
        {/* Modal Header */}
        <div
          className={`modal-header flex items-center justify-between p-6 border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          } cursor-grab active:cursor-grabbing`}
        >
          <h3
            className={`text-2xl font-bold bg-gradient-to-r ${
              isDark
                ? "from-purple-400 to-blue-400"
                : "from-blue-500 to-purple-500"
            } bg-clip-text text-transparent`}
          >
            Get In Touch
          </h3>
          <Button
            onClick={handleContactClose}
            variant="ghost"
            size="icon"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form
            ref={contactFormRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 focus:ring-purple-500/20"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500/20"
                  }`}
                  placeholder="Your Name"
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 focus:ring-purple-500/20"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500/20"
                  }`}
                  placeholder="you@example.com"
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 focus:ring-purple-500/20"
                    : "bg-gray-50 border-gray-300 focus:ring-blue-500/20"
                }`}
                placeholder="Project Discussion"
              />
              {formErrors.subject && (
                <p className="text-sm text-red-500">{formErrors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Message
              </label>
              <textarea
                name="message"
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none focus:ring-2 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 focus:ring-purple-500/20"
                    : "bg-gray-50 border-gray-300 focus:ring-blue-500/20"
                }`}
                placeholder="Tell me about your project..."
              />
              {formErrors.message && (
                <p className="text-sm text-red-500">{formErrors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isContactLoading}
              className={`w-full bg-gradient-to-r text-white py-3 transform hover:scale-105 transition ${
                isDark
                  ? "from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }`}
            >
              {isContactLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
