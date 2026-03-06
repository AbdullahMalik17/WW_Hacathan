import "server-only";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type {
  EmergencyCall,
  CrimeIncident,
  MapPoint,
  TrendDataPoint,
  DashboardFilters,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
} from "@/types";

// ─── Data Loading ─────────────────────────────────────────────────────────────

function readDataFile(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), "src", "data", filename);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

export function load911Calls(): EmergencyCall[] {
  const raw = readDataFile("911-calls.csv");
  if (!raw) return [];

  const result = Papa.parse<Record<string, string>>(raw, {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
  });

  return result.data
    .map((row) => ({
      callType: row["callType"] ?? row["call_type"] ?? row["CallType"] ?? "",
      dateTime: row["dateTime"] ?? row["date_time"] ?? row["DateTime"] ?? "",
      lat: parseFloat(row["lat"] ?? row["latitude"] ?? "0"),
      lng: parseFloat(row["lng"] ?? row["longitude"] ?? "0"),
      priority: row["priority"] ?? row["Priority"] ?? "MEDIUM",
      disposition: row["disposition"] ?? row["Disposition"] ?? "",
      responseUnit: row["responseUnit"] ?? row["response_unit"] ?? undefined,
    }))
    .filter((c) => c.callType && !isNaN(c.lat) && !isNaN(c.lng) && c.lat !== 0);
}

export function loadCrimeStats(): CrimeIncident[] {
  const raw = readDataFile("crime-stats.csv");
  if (!raw) return [];

  const result = Papa.parse<Record<string, string>>(raw, {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
  });

  return result.data
    .map((row) => ({
      offenseType: row["offenseType"] ?? row["offense_type"] ?? row["OffenseType"] ?? "",
      date: row["date"] ?? row["Date"] ?? "",
      lat: parseFloat(row["lat"] ?? row["latitude"] ?? "0"),
      lng: parseFloat(row["lng"] ?? row["longitude"] ?? "0"),
      neighborhood: row["neighborhood"] ?? row["Neighborhood"] ?? "Unknown",
      status: row["status"] ?? row["Status"] ?? "OPEN",
      caseId: row["caseId"] ?? row["case_id"] ?? row["CaseId"] ?? undefined,
    }))
    .filter((c) => c.offenseType && !isNaN(c.lat) && c.lat !== 0);
}

export function loadCrimeMapping(): MapPoint[] {
  const raw = readDataFile("crime-mapping.geojson");
  if (!raw) return [];

  try {
    const geojson = JSON.parse(raw) as GeoJSONFeatureCollection;
    return geojson.features
      .filter((f): f is GeoJSONFeature => f.type === "Feature" && f.geometry.type === "Point")
      .map((f) => {
        const [lng, lat] = f.geometry.coordinates;
        const type = String(f.properties.incidentType ?? "UNKNOWN");
        return {
          lat,
          lng,
          type,
          severity: getSeverity(type),
          label: `${type} — ${String(f.properties.date ?? "")}`,
        };
      });
  } catch {
    return [];
  }
}

function getSeverity(type: string): "low" | "medium" | "high" {
  const high = ["ASSAULT", "ROBBERY", "BURGLARY"];
  const medium = ["THEFT", "DISTURBANCE"];
  if (high.includes(type)) return "high";
  if (medium.includes(type)) return "medium";
  return "low";
}

// ─── Filtering ────────────────────────────────────────────────────────────────

export function filterByNeighborhood<T extends EmergencyCall | CrimeIncident>(
  data: T[],
  neighborhood: string
): T[] {
  const q = neighborhood.toLowerCase().trim();
  return data.filter((item) => {
    if ("neighborhood" in item) {
      return (item as CrimeIncident).neighborhood.toLowerCase().includes(q);
    }
    return true;
  });
}

export function filterByDateRange<T extends EmergencyCall | CrimeIncident>(
  data: T[],
  start: string,
  end: string
): T[] {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return data.filter((item) => {
    const dateStr = "dateTime" in item ? item.dateTime : item.date;
    const t = new Date(dateStr).getTime();
    return t >= s && t <= e;
  });
}

export function filterByIncidentType<T extends EmergencyCall | CrimeIncident>(
  data: T[],
  type: string
): T[] {
  const q = type.toLowerCase().trim();
  return data.filter((item) => {
    const field = "callType" in item ? item.callType : item.offenseType;
    return field.toLowerCase().includes(q);
  });
}

export function applyFilters(
  calls: EmergencyCall[],
  crimes: CrimeIncident[],
  filters: DashboardFilters
): { calls: EmergencyCall[]; crimes: CrimeIncident[] } {
  let filteredCalls = calls;
  let filteredCrimes = crimes;

  if (filters.neighborhood) {
    filteredCrimes = filterByNeighborhood(filteredCrimes, filters.neighborhood);
  }
  if (filters.dateRange) {
    filteredCalls = filterByDateRange(filteredCalls, filters.dateRange.start, filters.dateRange.end);
    filteredCrimes = filterByDateRange(filteredCrimes, filters.dateRange.start, filters.dateRange.end);
  }
  if (filters.incidentType) {
    filteredCalls = filterByIncidentType(filteredCalls, filters.incidentType);
    filteredCrimes = filterByIncidentType(filteredCrimes, filters.incidentType);
  }

  return { calls: filteredCalls, crimes: filteredCrimes };
}

// ─── Aggregations ─────────────────────────────────────────────────────────────

export function getTopCrimeTypes(
  data: CrimeIncident[],
  limit = 10
): { type: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const item of data) {
    counts[item.offenseType] = (counts[item.offenseType] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getHourlyDistribution(
  calls: EmergencyCall[]
): { hour: number; count: number }[] {
  const counts: number[] = Array(24).fill(0);
  for (const call of calls) {
    try {
      const h = new Date(call.dateTime).getUTCHours();
      if (h >= 0 && h < 24) counts[h]++;
    } catch {
      // skip malformed dates
    }
  }
  return counts.map((count, hour) => ({ hour, count }));
}

export function getMonthlyTrends(
  calls: EmergencyCall[],
  crimes: CrimeIncident[]
): TrendDataPoint[] {
  const callMap: Record<string, number> = {};
  const crimeMap: Record<string, number> = {};

  for (const call of calls) {
    const key = call.dateTime.slice(0, 7); // "YYYY-MM"
    callMap[key] = (callMap[key] ?? 0) + 1;
  }
  for (const crime of crimes) {
    const key = crime.date.slice(0, 7);
    crimeMap[key] = (crimeMap[key] ?? 0) + 1;
  }

  const allKeys = Array.from(new Set([...Object.keys(callMap), ...Object.keys(crimeMap)])).sort();
  const last12 = allKeys.slice(-12);

  return last12.map((month) => ({
    month,
    calls911: callMap[month] ?? 0,
    crimeIncidents: crimeMap[month] ?? 0,
  }));
}

export function buildAIContext(filters?: DashboardFilters): string {
  const calls = load911Calls();
  const crimes = loadCrimeStats();

  const { calls: fc, crimes: fcrimes } = filters
    ? applyFilters(calls, crimes, filters)
    : { calls, crimes };

  const topCrimes = getTopCrimeTypes(fcrimes, 5);
  const hourly = getHourlyDistribution(fc);
  const peakHour = hourly.sort((a, b) => b.count - a.count)[0];
  const trends = getMonthlyTrends(fc, fcrimes);

  const recent = fc.slice(-20);
  const recentCrimes = fcrimes.slice(-20);

  let context = `=== MONTGOMERY, ALABAMA — PUBLIC SAFETY DATA SUMMARY ===

OVERVIEW
- Total 911 calls in dataset: ${fc.length}
- Total crime incidents in dataset: ${fcrimes.length}
- Peak call hour: ${peakHour?.hour ?? "N/A"}:00 (${peakHour?.count ?? 0} calls)

TOP CRIME TYPES (by incident count)
${topCrimes.map((c, i) => `${i + 1}. ${c.type}: ${c.count} incidents`).join("\n")}

MONTHLY TRENDS (most recent)
${trends
  .slice(-6)
  .map((t) => `${t.month}: ${t.calls911} calls | ${t.crimeIncidents} crimes`)
  .join("\n")}

RECENT 911 CALLS (last 20)
${recent
  .map((c) => `[${c.dateTime.slice(0, 10)}] ${c.callType} — Priority: ${c.priority} — ${c.disposition}`)
  .join("\n")}

RECENT CRIME INCIDENTS (last 20)
${recentCrimes
  .map((c) => `[${c.date}] ${c.offenseType} in ${c.neighborhood} — Status: ${c.status}`)
  .join("\n")}

NEIGHBORHOODS WITH MOST ACTIVITY
${getTopNeighborhoods(fcrimes)
  .map((n) => `${n.neighborhood}: ${n.count} incidents`)
  .join("\n")}
`;

  // Enforce 50K character limit
  if (context.length > 50000) {
    context = context.slice(0, 49900) + "\n\n[Data truncated — showing representative sample]";
  }

  return context;
}

function getTopNeighborhoods(
  crimes: CrimeIncident[],
  limit = 5
): { neighborhood: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const c of crimes) {
    counts[c.neighborhood] = (counts[c.neighborhood] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([neighborhood, count]) => ({ neighborhood, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// ─── GeoJSON Conversion ───────────────────────────────────────────────────────

export function toGeoJSON(points: MapPoint[]): GeoJSONFeatureCollection {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [p.lng, p.lat] as [number, number],
      },
      properties: {
        incidentType: p.type,
        date: "",
        description: p.label,
        severity: p.severity,
      },
    })),
  };
}
