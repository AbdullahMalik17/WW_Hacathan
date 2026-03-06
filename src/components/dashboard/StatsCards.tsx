"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, Phone, AlertCircle, ShieldCheck, Activity } from "lucide-react";
import DashboardError from "./shared/DashboardError";

interface StatsData {
  totalCalls: number;
  totalCrimes: number;
  topCrimeType: string;
  safetyScore: number;
  trendDirection: string;
}

const StatsCards: React.FC = () => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full bg-[var(--bg-secondary)] border border-[var(--border)]" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return <DashboardError message="Failed to load safety metrics" onRetry={fetchStats} />;
  }

  const cards = [
    {
      title: "Total 911 Calls",
      value: data?.totalCalls.toLocaleString(),
      icon: Phone,
      trend: "up",
      label: "Total dataset volume",
      color: "var(--accent-primary)"
    },
    {
      title: "Crime Incidents",
      value: data?.totalCrimes.toLocaleString(),
      icon: AlertCircle,
      trend: "stable",
      label: "Reported incidents",
      color: "var(--accent-warning)"
    },
    {
      title: "Top Crime Type",
      value: data?.topCrimeType,
      icon: Activity,
      trend: "none",
      label: "Most frequent offense",
      color: "var(--accent-danger)"
    },
    {
      title: "Safety Score",
      value: data?.safetyScore,
      icon: ShieldCheck,
      trend: data?.trendDirection === "improving" ? "up" : data?.trendDirection === "worsening" ? "down" : "stable",
      label: "AI-computed rating",
      color: "var(--accent-primary)"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, idx) => (
        <Card 
          key={idx} 
          className="bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--accent-primary)] transition-all duration-300 group animate-panel"
          style={{ animationDelay: `${idx * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-jetbrains tracking-tight" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {card.trend === "up" && <TrendingUp className="h-3 w-3 text-[var(--accent-danger)]" />}
              {card.trend === "down" && <TrendingDown className="h-3 w-3 text-[var(--accent-primary)]" />}
              {card.trend === "stable" && <Minus className="h-3 w-3 text-[var(--text-secondary)]" />}
              <span className="text-[10px] text-[var(--text-secondary)] uppercase">
                {card.label}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
