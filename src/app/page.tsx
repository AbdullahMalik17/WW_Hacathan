"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import TrendChart from "@/components/dashboard/TrendChart";
import ChatPanel from "@/components/dashboard/ChatPanel";
import NewsPanel from "@/components/dashboard/NewsPanel";
import OfflineBanner from "@/components/dashboard/shared/OfflineBanner";

// Dynamically import SafetyMap to avoid SSR issues with Leaflet
const SafetyMap = dynamic(() => import("@/components/dashboard/SafetyMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Dashboard() {
  const [activeQuery, setActiveQuery] = useState("Montgomery public safety");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-jakarta">
      <OfflineBanner />
      <Header />
      
      <main className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Column - Stats & Trends (2/12) */}
        <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6 h-full overflow-y-auto pr-1 animate-panel animate-stagger-1">
          <StatsCards />
          <div className="flex-1">
            <TrendChart />
          </div>
        </div>

        {/* Center Column - Map & AI Chat (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6 h-full overflow-y-auto px-1">
          <div className="flex-[4] animate-panel animate-stagger-2">
            <SafetyMap />
          </div>
          <div className="flex-[6] animate-panel animate-stagger-3">
            <ChatPanel onQueryChange={setActiveQuery} />
          </div>
        </div>

        {/* Right Column - News Feed (3/12) */}
        <div className="lg:col-span-3 h-full overflow-hidden animate-panel animate-stagger-4">
          <NewsPanel searchQuery={activeQuery} />
        </div>
      </main>
    </div>
  );
}
