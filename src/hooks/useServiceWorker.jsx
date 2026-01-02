import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
import { useToast } from "./use-toast";

const useServiceWorker = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setIsUpdateAvailable(true);
        toast({
          title: "Update Available",
          description:
            "A new version of the app is available. Click to update.",
          action: (
            <button
              onClick={() => {
                updateSW();
                setIsUpdateAvailable(false);
                toast({
                  title: "Updating...",
                  description: "The app is being updated.",
                });
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded text-sm"
            >
              Update Now
            </button>
          ),
        });
      },
      onOfflineReady() {
        setIsOfflineReady(true);
        toast({
          title: "Offline Ready",
          description: "The app is now ready to work offline.",
        });
      },
      onRegistered(swRegistration) {
        console.log("Service Worker registered:", swRegistration);
      },
      onRegisterError(error) {
        console.error("Service Worker registration error:", error);
        toast({
          title: "Service Worker Error",
          description: "Failed to register service worker.",
          variant: "destructive",
        });
      },
    });
  }, [toast]);

  return {
    isUpdateAvailable,
    isOfflineReady,
  };
};

export default useServiceWorker;
