import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Bell,
  Wifi,
  Trash2,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import {
  backgroundSync,
  pushNotifications,
  cacheManager,
} from "../../utils/backgroundSync";
import { useToast } from "../../hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AccountSidebar from "./Sidebar";

const SettingsPage = () => {
  const [cacheSize, setCacheSize] = useState(0);
  const [notificationPermission, setNotificationPermission] =
    useState("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    updateCacheSize();
    checkNotificationStatus();
    checkInstallPrompt();
  }, []);

  const checkInstallPrompt = () => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  };

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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast({
        title: "Installation Started",
        description: "The app is being installed...",
      });
    } else {
      toast({
        title: "Installation Cancelled",
        description: "You can install the app later from your browser menu.",
      });
    }

    setDeferredPrompt(null);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container mx-auto mt-24 mb-20 px-6 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <AccountSidebar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* App Installation */}
            {deferredPrompt && (
              <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary-200">
                    <Download className="w-5 h-5" />
                    <span>Install App</span>
                  </CardTitle>
                  <CardDescription className="text-primary-400/80">
                    Install Future Advice by Charm on your device for quick access and
                    offline functionality.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleInstallClick}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Cache Management */}
            <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary-200">
                  <Wifi className="w-5 h-5" />
                  <span>Cache Management</span>
                </CardTitle>
                <CardDescription className="text-primary-400/80">
                  Manage cached data for offline access and performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-primary-300">Cache Size:</span>
                  <span className="text-primary-200 font-medium">
                    {formatBytes(cacheSize)}
                  </span>
                </div>
                <Button onClick={handleClearCache} variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            {pushNotifications.isPushSupported() && (
              <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary-200">
                    <Bell className="w-5 h-5" />
                    <span>Push Notifications</span>
                  </CardTitle>
                  <CardDescription className="text-primary-400/80">
                    Manage notification preferences and subscriptions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notificationPermission === "default" && (
                    <Button
                      onClick={handleRequestNotifications}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Enable Notifications
                    </Button>
                  )}

                  {notificationPermission === "granted" && (
                    <div className="space-y-3">
                      {!isSubscribed ? (
                        <Button
                          onClick={handleSubscribeToPush}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Subscribe to Notifications
                        </Button>
                      ) : (
                        <Button
                          onClick={handleUnsubscribeFromPush}
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Unsubscribe from Notifications
                        </Button>
                      )}
                    </div>
                  )}

                  {notificationPermission === "denied" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">
                        Notifications are blocked. Please enable them in your
                        browser settings.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Background Sync */}
            {backgroundSync.isBackgroundSyncSupported() && (
              <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary-200">
                    <RefreshCw className="w-5 h-5" />
                    <span>Background Sync</span>
                  </CardTitle>
                  <CardDescription className="text-primary-400/80">
                    Your app can sync data when you&apos;re back online.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Background sync is enabled</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* App Information */}
            <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary-200">
                  <Smartphone className="w-5 h-5" />
                  <span>App Information</span>
                </CardTitle>
                <CardDescription className="text-primary-400/80">
                  Details about your app installation and features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary-300">App Version:</span>
                  <span className="text-primary-200">1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-300">Service Worker:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-300">Offline Support:</span>
                  <span className="text-green-400">Available</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
