import { useEffect } from "react";

const LocalStorageManager = () => {
  useEffect(() => {
    // Function to clear localStorage
    const clearLocalStorage = () => {
      localStorage.removeItem("selectedDate");
      // Set last cleared timestamp
      localStorage.setItem("lastCleared", Date.now().toString());
      console.log("localStorage cleared at:", new Date().toLocaleString());
    };

    // Check if it's been 2 hours since last clear
    const checkAndClearStorage = () => {
      const lastCleared = localStorage.getItem("lastCleared");
      const currentTime = Date.now();

      // If never cleared or 2 hours have passed (2 hours = 7,200,000 milliseconds)
      if (!lastCleared || currentTime - parseInt(lastCleared) > 7200000) {
        clearLocalStorage();
      }
    };

    // Run immediately on component mount
    checkAndClearStorage();

    // Set up interval to check every minute
    const intervalId = setInterval(checkAndClearStorage, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default LocalStorageManager;
