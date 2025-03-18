import { useState, useEffect } from "react";

function useWindowSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize(); 

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return isSmallScreen;
}

export default useWindowSize;
