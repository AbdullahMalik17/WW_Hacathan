"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardError from "./shared/DashboardError";

interface TrendPoint {
  month: string;
  calls911: number;
  crimeIncidents: number;
}

const TrendChart: React.FC = () => {
  const [data, setData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/trends");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch trends:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (loading) {
    return <Skeleton className="h-[300px] w-full bg-[var(--bg-secondary)] border border-[var(--border)]" />;
  }

  if (error) {
    return (
      <Card className="bg-[var(--bg-secondary)] border-[var(--border)] h-full flex items-center justify-center min-h-[300px]">
        <DashboardError message="Failed to load trend analytics" onRetry={fetchTrends} />
      </Card>
    );
  }

  return (
    <Card className="bg-[var(--bg-secondary)] border-[var(--border)] h-full min-h-[300px] animate-panel animate-panel-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
          Incident Trends (12 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[240px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-warning)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--accent-warning)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="var(--text-secondary)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(str) => {
                const [year, month] = str.split("-");
                const date = new Date(parseInt(year), parseInt(month) - 1);
                return date.toLocaleString('default', { month: 'short' });
              }}
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--bg-secondary)", 
                borderColor: "var(--border)",
                fontSize: "12px",
                borderRadius: "8px",
                color: "var(--text-primary)"
              }}
              itemStyle={{ padding: "2px 0" }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-[10px] text-[var(--text-secondary)] uppercase">{value === 'calls911' ? '911 Calls' : 'Crimes'}</span>}
            />
            <Area
              type="monotone"
              dataKey="calls911"
              stroke="var(--accent-primary)"
              fillOpacity={1}
              fill="url(#colorCalls)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="crimeIncidents"
              stroke="var(--accent-warning)"
              fillOpacity={1}
              fill="url(#colorCrimes)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
