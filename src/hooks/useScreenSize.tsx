import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [devices, setDevices] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const updateDevices = () => {
    if (typeof window !== "undefined") {
      setDevices({
        isMobile: window.screen.width < 640,
        isTablet: window.screen.width < 992 && window.screen.width > 640,
        isDesktop: window.screen.width > 992,
      });
    }
  };

  useEffect(() => {
    updateDevices();

    window.addEventListener("orientationchange", updateDevices);
    window.addEventListener("resize", updateDevices);

    return () => {
      window.removeEventListener("orientationchange", updateDevices);
      window.removeEventListener("resize", updateDevices);
    };
  }, []);

  return devices;
};
