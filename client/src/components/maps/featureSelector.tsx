import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";

interface FeatureSelectorProps {
  featureOptions: string[];
  onSelectChange: (selectedOption: string) => void;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  featureOptions,
  onSelectChange,
}) => (
  <div className="inline-block">
    <Select onValueChange={onSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Feature" />
      </SelectTrigger>
      <SelectContent>
        {featureOptions.map((id) => (
          <SelectItem value={id} key={id}>
            Feature {id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FeatureSelector;
