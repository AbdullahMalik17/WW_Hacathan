import { NextResponse } from "next/server";
import {
  load911Calls,
  loadCrimeStats,
  loadCrimeMapping,
  filterByNeighborhood,
  filterByDateRange,
  filterByIncidentType,
} from "@/lib/montgomery-data";
import type { EmergencyCall, CrimeIncident, MapPoint } from "@/types";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const dataset = searchParams.get("dataset") ?? "911";
    const neighborhood = searchParams.get("neighborhood");
    const limitParam = searchParams.get("limit");
    const dateStart = searchParams.get("dateStart");
    const dateEnd = searchParams.get("dateEnd");
    const incidentType = searchParams.get("incidentType");
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 10000) : 1000;

    if (!["911", "crime", "mapping"].includes(dataset)) {
      return NextResponse.json(
        { error: `Invalid dataset: "${dataset}". Must be one of: 911, crime, mapping` },
        { status: 400 }
      );
    }

    if (dataset === "mapping") {
      const points: MapPoint[] = loadCrimeMapping();
      return NextResponse.json(points.slice(0, limit));
    }

    if (dataset === "911") {
      let calls: EmergencyCall[] = load911Calls();

      if (dateStart && dateEnd) {
        calls = filterByDateRange(calls, dateStart, dateEnd);
      }
      if (incidentType) {
        calls = filterByIncidentType(calls, incidentType);
      }

      return NextResponse.json(calls.slice(0, limit));
    }

    // dataset === "crime"
    let crimes: CrimeIncident[] = loadCrimeStats();

    if (neighborhood) {
      crimes = filterByNeighborhood(crimes, neighborhood);
    }
    if (dateStart && dateEnd) {
      crimes = filterByDateRange(crimes, dateStart, dateEnd);
    }
    if (incidentType) {
      crimes = filterByIncidentType(crimes, incidentType);
    }

    return NextResponse.json(crimes.slice(0, limit));
  } catch (err) {
    console.error("[/api/data] Error:", err);
    return NextResponse.json(
      { error: "Internal server error while loading Montgomery data" },
      { status: 500 }
    );
  }
}
