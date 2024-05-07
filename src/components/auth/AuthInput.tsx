import { randomUID } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AuthInputParams extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  labelText: string;
}

const AuthInput = ({ labelText, isLoading, ...args }: AuthInputParams) => {
  const randomId = randomUID();
  return (
    <div className="grid gap-1">
      <Label className="pl-2" htmlFor={randomId}>
        {labelText}
      </Label>
      <Input
        id={randomId}
        autoCorrect="off"
        autoComplete="off"
        disabled={!!isLoading}
        {...args}
      />
    </div>
  );
};
export default AuthInput;
