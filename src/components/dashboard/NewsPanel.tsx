"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe } from "lucide-react";
import { NewsArticle } from "@/types";
import DashboardError from "./shared/DashboardError";
import DashboardEmpty from "./shared/DashboardEmpty";

interface NewsPanelProps {
  searchQuery: string;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ searchQuery }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = React.useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <Card className="bg-[var(--bg-secondary)] border-[var(--border)] h-full flex flex-col animate-panel animate-panel-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-[var(--accent-primary)]" />
          <CardTitle className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Live News feed
          </CardTitle>
        </div>
        <Badge variant="outline" className="bg-[var(--bg-tertiary)] border-[var(--border)] text-[var(--text-secondary)] text-[10px] py-0">
          Powered by Bright Data
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto px-4 space-y-4">
        {loading ? (
          [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/50 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-[var(--bg-tertiary)]" />
              <Skeleton className="h-3 w-full bg-[var(--bg-tertiary)]" />
              <Skeleton className="h-3 w-1/2 bg-[var(--bg-tertiary)]" />
            </div>
          ))
        ) : error ? (
          <DashboardError message="News stream temporarily unavailable" onRetry={fetchNews} />
        ) : articles.length > 0 ? (
          articles.map((article, idx) => (
            <div 
              key={idx} 
              className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors group"
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] line-clamp-2 transition-colors leading-tight"
                >
                  {article.title}
                </a>
                <ExternalLink className="h-3 w-3 text-[var(--text-secondary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] uppercase font-medium mb-2">
                <span className="text-[var(--accent-primary)]">{article.source}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                {article.snippet}
              </p>
            </div>
          ))
        ) : (
          <DashboardEmpty message="No recent safety reports found for this area." />
        )}
      </CardContent>
      
      <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)]/30">
        <p className="text-[10px] text-center text-[var(--text-secondary)] uppercase tracking-tighter">
          Real-time news via Bright Data SERP API
        </p>
      </div>
    </Card>
  );
};

export default NewsPanel;
