import { useEffect, useState } from "react";

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex justify-center items-center h-screen w-full transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative w-16 h-16">
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-blue-600 animate-ping opacity-75"></span>
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-blue-600 animate-ping opacity-50 delay-150"></span>
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-blue-600 animate-ping opacity-30 delay-300"></span>
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-blue-600 animate-ping opacity-10 delay-450"></span>
      </div>
    </div>
  );
}
