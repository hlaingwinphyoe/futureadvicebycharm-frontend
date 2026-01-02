import useServiceWorker from "../hooks/useServiceWorker.jsx";

const ServiceWorkerRegistration = () => {
  // This will handle all service worker registration and updates
  useServiceWorker();

  return null; // This component doesn't render anything
};

export default ServiceWorkerRegistration;
