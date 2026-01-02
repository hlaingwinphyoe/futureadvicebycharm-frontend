import { useState, useEffect } from "react";
import { Download, Bell, Wifi, Trash2, RefreshCw, X } from "lucide-react";
import {
  backgroundSync,
  pushNotifications,
  cacheManager,
} from "../utils/backgroundSync";
import { useToast } from "../hooks/use-toast";

const PWASettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);
  const [notificationPermission, setNotificationPermission] =
    useState("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    updateCacheSize();
    checkNotificationStatus();
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsOpen(true);
    };

    window.addEventListener("openPWASettings", handleOpenSettings);

    return () => {
      window.removeEventListener("openPWASettings", handleOpenSettings);
    };
  }, []);

  const updateCacheSize = async () => {
    const size = await cacheManager.getCacheSize();
    setCacheSize(size);
  };

  const checkNotificationStatus = async () => {
    setNotificationPermission(pushNotifications.getPermissionStatus());

    if (pushNotifications.isPushSupported()) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    }
  };

  const handleClearCache = async () => {
    try {
      await cacheManager.clearAllCaches();
      await updateCacheSize();
      toast({
        title: "Cache Cleared",
        description: "All cached data has been cleared successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to clear cache. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequestNotifications = async () => {
    try {
      const granted = await pushNotifications.requestPermission();
      if (granted) {
        toast({
          title: "Notifications Enabled",
          description:
            "You will now receive notifications from Future Advice by Charm.",
        });
      } else {
        toast({
          title: "Notifications Denied",
          description: "You can enable notifications in your browser settings.",
        });
      }
      checkNotificationStatus();
    } catch {
      toast({
        title: "Error",
        description: "Failed to request notification permission.",
        variant: "destructive",
      });
    }
  };

  const handleSubscribeToPush = async () => {
    try {
      const subscription = await pushNotifications.subscribeToPush();
      if (subscription) {
        setIsSubscribed(true);
        toast({
          title: "Subscribed",
          description: "You are now subscribed to push notifications.",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "Failed to subscribe to push notifications.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to subscribe to notifications.",
        variant: "destructive",
      });
    }
  };

  const handleUnsubscribeFromPush = async () => {
    try {
      const success = await pushNotifications.unsubscribeFromPush();
      if (success) {
        setIsSubscribed(false);
        toast({
          title: "Unsubscribed",
          description: "You are no longer subscribed to push notifications.",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to unsubscribe from notifications.",
        variant: "destructive",
      });
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">PWA Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Cache Management */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Wifi className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium">Cache Management</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Cache size: {formatBytes(cacheSize)}
                </p>
                <button
                  onClick={handleClearCache}
                  className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cache</span>
                </button>
              </div>

              {/* Push Notifications */}
              {pushNotifications.isPushSupported() && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="w-5 h-5 text-primary-600" />
                    <h3 className="font-medium">Push Notifications</h3>
                  </div>

                  {notificationPermission === "default" && (
                    <button
                      onClick={handleRequestNotifications}
                      className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded text-sm mb-2"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Enable Notifications</span>
                    </button>
                  )}

                  {notificationPermission === "granted" && (
                    <div className="space-y-2">
                      {!isSubscribed ? (
                        <button
                          onClick={handleSubscribeToPush}
                          className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-3 py-2 rounded text-sm"
                        >
                          <Bell className="w-4 h-4" />
                          <span>Subscribe to Notifications</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleUnsubscribeFromPush}
                          className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 text-orange-700 dark:text-orange-300 px-3 py-2 rounded text-sm"
                        >
                          <Bell className="w-4 h-4" />
                          <span>Unsubscribe from Notifications</span>
                        </button>
                      )}
                    </div>
                  )}

                  {notificationPermission === "denied" && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Notifications are blocked. Please enable them in your
                      browser settings.
                    </p>
                  )}
                </div>
              )}

              {/* Background Sync */}
              {backgroundSync.isBackgroundSyncSupported() && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <RefreshCw className="w-5 h-5 text-primary-600" />
                    <h3 className="font-medium">Background Sync</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Background sync is enabled. Your app can sync data when
                    you&apos;re back online.
                  </p>
                </div>
              )}

              {/* App Installation */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Download className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium">Install App</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Install Future Advice by Charm on your device for quick access and
                  offline functionality.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Look for the install button in your browser&apos;s address bar
                  or menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWASettings;
