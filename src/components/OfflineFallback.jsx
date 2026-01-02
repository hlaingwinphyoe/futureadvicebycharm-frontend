import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

const OfflineFallback = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 text-center">
        <WifiOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">You're Offline</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please check your internet connection and try again. Some features may
          not be available while offline.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Wifi className="w-4 h-4" />
          <span>Waiting for connection...</span>
        </div>
      </div>
    </div>
  );
};

export default OfflineFallback;
