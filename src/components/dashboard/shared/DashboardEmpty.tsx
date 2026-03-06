"use client";

import React from "react";
import { Database } from "lucide-react";

interface DashboardEmptyProps {
  message?: string;
  className?: string;
}

const DashboardEmpty: React.FC<DashboardEmptyProps> = ({ 
  message = "No records found for the selected criteria", 
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center space-y-3 rounded-lg opacity-60 ${className}`}>
      <div className="bg-[var(--bg-tertiary)] p-3 rounded-full border border-[var(--border)]">
        <Database className="h-5 w-5 text-[var(--text-secondary)]" />
      </div>
      <p className="text-xs text-[var(--text-secondary)] max-w-[180px]">
        {message}
      </p>
    </div>
  );
};

export default DashboardEmpty;
