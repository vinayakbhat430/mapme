import { GeoJSONFeature } from "mapbox-gl";

interface FeatureTooltipProps {
  feature: GeoJSONFeature;
  area: number | null;
  position: { x: number; y: number };
  name:Record<string,string>;
}

const FeatureTooltip: React.FC<FeatureTooltipProps> = ({ feature, area, position,name }) => (
  <div
    style={{
      position: "absolute",
      top: position.y + 10,
      left: position.x + 10,
      backgroundColor: "white",
      padding: "8px",
      borderRadius: "4px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      pointerEvents: "none",
      zIndex: 1000,
    }}
  >
    <p><strong>ID:</strong> {feature.properties?.id}</p>
    {area && <p><strong>Area:</strong> {area} sq meters</p>}
    <div><strong>Name:</strong>{name[feature.properties?.id] ? name[feature.properties?.id]: <p className="text-red-500">Name not set for feature</p>}</div>
  </div>
);

export default FeatureTooltip;
