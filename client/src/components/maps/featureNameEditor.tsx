import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FeatureNameEditorProps {
    featureName: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  }
  
  const FeatureNameEditor: React.FC<FeatureNameEditorProps> = ({ featureName, onNameChange, onSubmit }) => (
    <div className="flex items-center gap-x-4">
      <Input
        className="border border-gray-300 rounded p-2"
        value={featureName}
        onChange={onNameChange}
        placeholder="Enter feature name"
      />
      <Button onClick={onSubmit} className=" block bg-blue-500 text-white px-4 py-2 rounded">
        Update
      </Button>
    </div>
  );
  
  export default FeatureNameEditor;
  