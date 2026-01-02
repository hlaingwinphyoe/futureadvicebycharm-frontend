import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to the top of the page
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={toTop}
          className="animate-bounce h-10 w-10 xl:h-12 xl:w-12 rounded-full fixed right-6 bottom-16 border flex items-center justify-center cursor-pointer z-50 bg-primary-500"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
