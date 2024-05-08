import { randomUID } from "@/lib/utils";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type OptionType = {
  label: string;
  value: string;
};

const RadioInputEach = ({ label, value }: OptionType) => {
  const uniqueId = randomUID();
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={uniqueId} />
      <Label htmlFor={uniqueId}>{label}</Label>
    </div>
  );
};

type RadioInputProps = {
  options: OptionType[];
  name: string;
  defaultValue?: string;
  disabled?: boolean;
};
const RadioInput = ({
  name,
  options,
  defaultValue,
  disabled,
}: RadioInputProps) => {
  return (
    <RadioGroup
      name={name}
      disabled={!!disabled}
      defaultValue={defaultValue ? defaultValue : options[0].value}
    >
      {options.map((option) => (
        <RadioInputEach
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </RadioGroup>
  );
};
export default RadioInput;
