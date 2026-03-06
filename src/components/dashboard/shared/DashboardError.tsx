"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ 
  message = "Data temporarily unavailable", 
  onRetry,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center space-y-4 border border-dashed border-[var(--accent-danger)]/30 rounded-lg bg-[var(--accent-danger)]/5 ${className}`}>
      <div className="bg-[var(--accent-danger)]/10 p-3 rounded-full">
        <AlertCircle className="h-6 w-6 text-[var(--accent-danger)]" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-[var(--text-primary)]">Connection Error</p>
        <p className="text-xs text-[var(--text-secondary)] max-w-[200px]">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="border-[var(--border)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-primary)] gap-2 h-8 text-[10px] uppercase font-bold"
        >
          <RefreshCw className="h-3 w-3" />
          Retry Request
        </Button>
      )}
    </div>
  );
};

export default DashboardError;
