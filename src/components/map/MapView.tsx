import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLayers } from "../layout/LayerContext";
import {
  regions, rivers, glaciers, hydropower, riskZones, reservoirs,
  populationCenters, agriculturalZones, protectedAreas,
} from "@/lib/mock-data";

const basemaps = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

const riskColor = { high: "#e85d5d", moderate: "#f3a847", low: "#54b97a" };

export function MapView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const layerGroupsRef = useRef<Record<string, L.LayerGroup>>({});
  const { layers, basemap } = useLayers();

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, {
      center: [38.86, 71.27],
      zoom: 7,
      zoomControl: false,
      attributionControl: true,
    });
    L.control.zoom({ position: "topright" }).addTo(map);
    tileRef.current = L.tileLayer(basemaps.light, { maxZoom: 18, attribution: "© OSM" }).addTo(map);
    mapRef.current = map;

    const groups: Record<string, L.LayerGroup> = {
      regions: L.layerGroup().addTo(map),
      rivers: L.layerGroup().addTo(map),
      glaciers: L.layerGroup().addTo(map),
      water: L.layerGroup().addTo(map),
      risk: L.layerGroup().addTo(map),
      hydro: L.layerGroup().addTo(map),
      reservoirs: L.layerGroup().addTo(map),
      population: L.layerGroup().addTo(map),
      agriculture: L.layerGroup().addTo(map),
      protected: L.layerGroup().addTo(map),
    };
    layerGroupsRef.current = groups;

    // Region polygons (always show; styled by water access)
    regions.forEach((r) => {
      const poly = L.polygon(r.polygon, {
        color: riskColor[r.risk],
        weight: 1.5,
        fillColor: riskColor[r.risk],
        fillOpacity: 0.18,
      })
        .bindPopup(
          `<div style="font-family:inherit;min-width:180px">
            <div style="font-weight:600;font-size:13px">${r.name}</div>
            <div style="font-size:11px;color:#6b7a90">Capital: ${r.capital}</div>
            <div style="margin-top:6px;font-size:12px">Water access: <b>${r.access}%</b></div>
            <div style="font-size:12px">Population: <b>${r.population}</b></div>
          </div>`
        )
        .on("mouseover", (e) => e.target.setStyle({ fillOpacity: 0.32 }))
        .on("mouseout", (e) => e.target.setStyle({ fillOpacity: 0.18 }));
      groups.regions.addLayer(poly);
    });

    rivers.forEach((rv) => {
      L.polyline(rv.path, { color: "#3a82c4", weight: 3, opacity: 0.85 })
        .bindTooltip(rv.name, { sticky: true })
        .addTo(groups.rivers);
    });

    glaciers.forEach((g) => {
      L.circleMarker(g.coords, {
        radius: 7 + Math.min(8, g.areaKm2 / 100),
        color: "#7fb8d8",
        fillColor: "#cfe6f3",
        fillOpacity: 0.85,
        weight: 2,
      })
        .bindPopup(`<b>${g.name}</b><br/>Area: ${g.areaKm2} km²`)
        .addTo(groups.glaciers);
    });

    hydropower.forEach((h) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#7c5cff,#5a8bff);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(92,76,255,0.35);color:white;font-size:14px;font-weight:700">⚡</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });
      L.marker(h.coords, { icon }).bindPopup(`<b>${h.name}</b><br/>${h.capacity}`).addTo(groups.hydro);
    });

    riskZones.forEach((rz) => {
      L.circle(rz.coords, {
        radius: 25000,
        color: "#e85d5d",
        fillColor: "#e85d5d",
        fillOpacity: 0.18,
        weight: 1.5,
        dashArray: "4 4",
      })
        .bindPopup(`<b>${rz.name}</b><br/>Type: ${rz.type}`)
        .addTo(groups.risk);
    });

    reservoirs.forEach((r) => {
      L.circleMarker(r.coords, {
        radius: 8, color: "#3a82c4", fillColor: "#7fb8d8", fillOpacity: 0.9, weight: 2,
      }).bindPopup(`<b>${r.name}</b>`).addTo(groups.reservoirs);
    });

    populationCenters.forEach((p) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="display:flex;flex-direction:column;align-items:center"><div style="width:10px;height:10px;border-radius:99px;background:#f3a847;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2)"></div><div style="margin-top:2px;background:white;padding:1px 6px;border-radius:6px;font-size:10px;font-weight:600;color:#3b4a63;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:nowrap">${p.name}</div></div>`,
        iconSize: [60, 30], iconAnchor: [30, 5],
      });
      L.marker(p.coords, { icon }).addTo(groups.population);
    });

    agriculturalZones.forEach((coords) => {
      L.polygon(coords, { color: "#54b97a", fillColor: "#a7e0bd", fillOpacity: 0.3, weight: 1, dashArray: "3 3" })
        .addTo(groups.agriculture);
    });

    protectedAreas.forEach((coords) => {
      L.polygon(coords, { color: "#3a7f5a", fillColor: "#9ec9b0", fillOpacity: 0.22, weight: 1.2 })
        .bindTooltip("Tajik National Park", { sticky: true })
        .addTo(groups.protected);
    });

    // Clean water access circle markers on capitals
    regions.forEach((r) => {
      L.circleMarker(
        [r.polygon[0][0] + 0.1, r.polygon[0][1] + 0.1],
        {
          radius: 6,
          color: "#4a8cd6",
          fillColor: "#cfe6f3",
          fillOpacity: 0.7,
          weight: 2,
        }
      )
        .bindTooltip(`Water access: ${r.access}%`, { sticky: true })
        .addTo(groups.water);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync basemap
  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    mapRef.current.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(basemaps[basemap], { maxZoom: 18, attribution: "© OSM" }).addTo(mapRef.current);
  }, [basemap]);

  // Sync layer visibility
  useEffect(() => {
    const map = mapRef.current;
    const groups = layerGroupsRef.current;
    if (!map) return;
    (Object.keys(layers) as (keyof typeof layers)[]).forEach((k) => {
      const g = groups[k];
      if (!g) return;
      if (layers[k]) {
        if (!map.hasLayer(g)) g.addTo(map);
      } else {
        if (map.hasLayer(g)) map.removeLayer(g);
      }
    });
  }, [layers]);

  return <div ref={ref} className="absolute inset-0" />;
}