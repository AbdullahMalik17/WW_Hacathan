// SafeMGM — Shared TypeScript Type Definitions
// All types used across the application. Import via @/types

export interface EmergencyCall {
  callType: string;
  dateTime: string; // ISO 8601 string
  lat: number;
  lng: number;
  priority: string;
  disposition: string;
  responseUnit?: string;
}

export interface CrimeIncident {
  offenseType: string;
  date: string; // ISO 8601 string
  lat: number;
  lng: number;
  neighborhood: string;
  status: string;
  caseId?: string;
}

export interface NewsArticle {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date: string;
}

export interface MapPoint {
  lat: number;
  lng: number;
  type: string;
  severity: "low" | "medium" | "high";
  label: string;
}

export interface TrendDataPoint {
  month: string; // Format: "YYYY-MM" or display label e.g. "Jan 2024"
  calls911: number;
  crimeIncidents: number;
}

export interface SafetyAnalysis {
  safetyScore: number; // 1–100
  topIncidentTypes: string[];
  trendDirection: "improving" | "worsening" | "stable";
  recentIncidentCount: number;
  summary: string;
  recommendations: string[];
}

export interface DashboardFilters {
  neighborhood: string | null;
  dateRange: { start: string; end: string } | null;
  incidentType: string | null;
}

// GeoJSON Feature type for crime mapping
export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    incidentType: string;
    date: string;
    description: string;
    [key: string]: unknown;
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
