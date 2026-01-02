// Background sync utility for offline functionality
class BackgroundSyncManager {
  constructor() {
    this.isSupported =
      "serviceWorker" in navigator &&
      "sync" in window.ServiceWorkerRegistration.prototype;
  }

  // Register a background sync
  async registerSync(tag, data = {}) {
    if (!this.isSupported) {
      console.warn("Background sync not supported");
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Store data for the sync
      if (Object.keys(data).length > 0) {
        localStorage.setItem(`sync_${tag}`, JSON.stringify(data));
      }

      await registration.sync.register(tag);
      console.log(`Background sync registered: ${tag}`);
      return true;
    } catch (error) {
      console.error("Error registering background sync:", error);
      return false;
    }
  }

  // Check if background sync is supported
  isBackgroundSyncSupported() {
    return this.isSupported;
  }

  // Get stored sync data
  getSyncData(tag) {
    try {
      const data = localStorage.getItem(`sync_${tag}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting sync data:", error);
      return null;
    }
  }

  // Clear stored sync data
  clearSyncData(tag) {
    try {
      localStorage.removeItem(`sync_${tag}`);
    } catch (error) {
      console.error("Error clearing sync data:", error);
    }
  }
}

// Push notification utility
class PushNotificationManager {
  constructor() {
    this.isSupported = "serviceWorker" in navigator && "PushManager" in window;
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      console.warn("Push notifications not supported");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  // Subscribe to push notifications
  async subscribeToPush() {
    if (!this.isSupported) {
      console.warn("Push notifications not supported");
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.VITE_VAPID_PUBLIC_KEY || ""
        ),
      });

      console.log("Push notification subscription:", subscription);
      return subscription;
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      return null;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribeFromPush() {
    if (!this.isSupported) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        console.log("Unsubscribed from push notifications");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      return false;
    }
  }

  // Convert VAPID key from base64 to Uint8Array
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Check if notifications are supported
  isPushSupported() {
    return this.isSupported;
  }

  // Check current permission status
  getPermissionStatus() {
    return Notification.permission;
  }
}

// Cache management utility
class CacheManager {
  constructor() {
    this.isSupported = "caches" in window;
  }

  // Clear all caches
  async clearAllCaches() {
    if (!this.isSupported) {
      console.warn("Cache API not supported");
      return false;
    }

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      console.log("All caches cleared");
      return true;
    } catch (error) {
      console.error("Error clearing caches:", error);
      return false;
    }
  }

  // Get cache size
  async getCacheSize() {
    if (!this.isSupported) {
      return 0;
    }

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();

        for (const request of keys) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    } catch (error) {
      console.error("Error calculating cache size:", error);
      return 0;
    }
  }

  // Check if cache is supported
  isCacheSupported() {
    return this.isSupported;
  }
}

// Export instances
export const backgroundSync = new BackgroundSyncManager();
export const pushNotifications = new PushNotificationManager();
export const cacheManager = new CacheManager();
