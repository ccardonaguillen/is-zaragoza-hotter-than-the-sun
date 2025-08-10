
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import type { CityWeather } from '../types';
import { ZARAGOZA_ID } from '../constants';
import LocationMarkerIcon from './icons/LocationMarkerIcon';

interface HeatMapProps {
  weatherData: CityWeather[];
}

const HeatMap: React.FC<HeatMapProps> = ({ weatherData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [svgAspectRatio, setSvgAspectRatio] = useState(1.354); // Default fallback
  
  // Load SVG to get its dimensions
  useEffect(() => {
    const svgPath = `${import.meta.env.BASE_URL}mercator-projection-world-map.svg`;
    d3.xml(svgPath).then(data => {
      const importedSvg = d3.select(data.documentElement);
      const viewBox = importedSvg.attr("viewBox");
      
      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
        const aspectRatio = vbWidth / vbHeight;
        setSvgAspectRatio(aspectRatio);
      }
    }).catch(error => {
      console.warn("Could not load SVG for dimensions, using default aspect ratio:", error);
    });
  }, []);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || !entries.length) return;
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: width / svgAspectRatio });
    });
    
    if(svgRef.current?.parentElement) {
      resizeObserver.observe(svgRef.current.parentElement);
    }
    
    return () => resizeObserver.disconnect();
  }, [svgAspectRatio]);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || weatherData.length === 0) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Load and display the world map SVG
    const svgPath = `../assets/mercator-projection-world-map.svg`;
    d3.xml(svgPath).then(data => {
      const importedSvgNode = data.documentElement;
      const importedSvg = d3.select(importedSvgNode);
      
      // Get the viewBox of the imported SVG
      const viewBox = importedSvg.attr("viewBox");
      const [vbX, vbY, vbWidth, vbHeight] = viewBox ? viewBox.split(' ').map(Number) : [0, 0, 1652.4702, 1220.6385];
      
      // Create a group for the world map and scale it to fit our container
      const mapGroup = svg.append("g")
        .attr("class", "world-map");
      
      // Calculate scale to fit the map to our container
      const scale = Math.min(width / vbWidth, height / vbHeight);
      const translateX = (width - vbWidth * scale) / 2;
      const translateY = (height - vbHeight * scale) / 2;
      
      mapGroup
        .attr("transform", `translate(${translateX}, ${translateY}) scale(${scale})`)
        .style("opacity", 0.3);
      
      // Import all the paths from the world map SVG
      importedSvg.selectAll("path").each(function() {
        const pathData = d3.select(this);
        mapGroup.append("path")
          .attr("d", pathData.attr("d"))
          .attr("fill", "#6b7280") // Gray color for land masses
          .attr("stroke", "#374151") // Darker stroke
          .attr("stroke-width", 0.5);
      });
      
      // Import all groups with paths
      importedSvg.selectAll("g").each(function() {
        const groupData = d3.select(this);
        if (groupData.selectAll("path").size() > 0) {
          const newGroup = mapGroup.append("g");
          groupData.selectAll("path").each(function() {
            const pathData = d3.select(this);
            newGroup.append("path")
              .attr("d", pathData.attr("d"))
              .attr("fill", "#6b7280")
              .attr("stroke", "#374151")
              .attr("stroke-width", 0.5);
          });
        }
      });
      
      // Now add the temperature data visualization on top
      // Create a projection that matches the SVG map coordinate system
      const projection = d3.geoMercator()
        .scale(vbWidth / (2 * Math.PI)) // Scale based on SVG width
        .translate([vbWidth / 2, vbHeight / 1.69]) // Adjust vertical center to fix latitude alignment
        .precision(0.1);

      // Transform projection coordinates to match our scaled/translated map group
      const transformedProjection = (coords: [number, number]) => {
        const projected = projection(coords);
        if (!projected) return null;
        // Apply the same transformation as the map group
        return [
          projected[0] * scale + translateX,
          projected[1] * scale + translateY
        ] as [number, number];
      };

      const tempExtent = d3.extent(weatherData, d => d.temperature) as [number, number];
      const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain(tempExtent);
      const radiusScale = d3.scaleSqrt().domain(tempExtent).range([4, 15]);

      // Tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "rgba(0,0,0,0.7)")
        .style("color", "#fff")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("font-size", "14px");

      // Draw circles for cities
      svg.selectAll("circle")
        .data(weatherData.filter(d => d.id !== ZARAGOZA_ID))
        .enter()
        .append("circle")
        .attr("cx", d => {
          const coords = transformedProjection([d.lon, d.lat]);
          return coords ? coords[0] : 0;
        })
        .attr("cy", d => {
          const coords = transformedProjection([d.lon, d.lat]);
          return coords ? coords[1] : 0;
        })
        .attr("r", d => radiusScale(d.temperature))
        .attr("fill", d => colorScale(d.temperature))
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("opacity", 0.8)
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").html(`<strong>${d.city}</strong><br/>${d.temperature}°C`);
        })
        .on("mousemove", (event) => {
          tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      // Draw Zaragoza's special marker
      const zaragozaData = weatherData.find(d => d.id === ZARAGOZA_ID);
      if (zaragozaData) {
        const zCoords = transformedProjection([zaragozaData.lon, zaragozaData.lat]);
        if (zCoords) {
          const zaragozaGroup = svg.append("g")
            .attr("transform", `translate(${zCoords[0]}, ${zCoords[1]})`);
          
          zaragozaGroup.append("circle")
            .attr("r", 20)
            .attr("fill", "rgba(239, 68, 68, 0.3)")
            .style("pointer-events", "none")
            .append("animate")
            .attr("attributeName", "r")
            .attr("from", "10")
            .attr("to", "25")
            .attr("dur", "1.5s")
            .attr("repeatCount", "indefinite")
            .attr("begin", "0s");
          
          zaragozaGroup.append("circle")
            .attr("r", 5)
            .attr("fill", "rgb(239, 68, 68)")
            .attr("stroke", "white")
            .attr("stroke-width", 2);

          zaragozaGroup
            .on("mouseover", (event, d) => {
              tooltip.style("visibility", "visible").html(`<strong>Zaragoza</strong><br/>${zaragozaData.temperature}°C`);
            })
            .on("mousemove", (event) => {
              tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", () => {
              tooltip.style("visibility", "hidden");
            });
        }
      }
      
      return () => {
          tooltip.remove();
      };
    });

  }, [weatherData, dimensions]);

  return (
    <div className="w-full bg-blue-100 dark:bg-slate-700 rounded-lg overflow-hidden" style={{ aspectRatio: svgAspectRatio.toString() }}>
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  );
};

export default HeatMap;
