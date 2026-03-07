"use client";

import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setTimeout(() => setVisible(false), 3000);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setVisible(true);
    };

    setIsOffline(!navigator.onLine);
    setVisible(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-[9999] transform transition-transform duration-500 ${isOffline ? "translate-y-0" : "-translate-y-full"}`}>
      <div className={`${isOffline ? "bg-[var(--accent-danger)]" : "bg-emerald-500"} text-[var(--bg-primary)] px-4 py-2 flex items-center justify-center gap-3 shadow-2xl`}>
        {isOffline ? (
          <>
            <WifiOff className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">
              You are currently offline. SafeMGM is running in limited mode.
            </span>
          </>
        ) : (
          <span className="text-xs font-bold uppercase tracking-widest">
            Back online. Re-establishing secure connection...
          </span>
        )}
      </div>
    </div>
  );
};

export default OfflineBanner;
