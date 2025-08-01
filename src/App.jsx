import { Suspense, useEffect, useState, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Loader } from "./components/ui/Loader";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Lazy load components for better code splitting
const ModernPortfolio = lazy(() => import("./components/portfolio"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const ProjectSection = lazy(() => import("./components/ProjectsSection"));
function App() {
  const location = useLocation();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  AOS.init({
    duration: 800,  // animation duration in ms
    once: true,     // whether animation should happen only once
    easing: "ease-in-out",
    offset: 50,     // offset (px) from the original trigger point
  });
}, []);

  useEffect(() => {
    // Simulate loading (e.g., fetch or image load)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsRouteChanging(true);
      const timer = setTimeout(() => {
        setIsRouteChanging(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isLoading]);

  useEffect(() => {
    document.body.style.overflow = isRouteChanging ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading, isRouteChanging]);

  // 🔥 Force dark theme background always
  if (isLoading || isRouteChanging) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ModernPortfolio />} />
          <Route path="/projects" element={<ProjectSection />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
