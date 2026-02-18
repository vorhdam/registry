import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import * as React from "react";

function Password({ className, ...props }: React.ComponentProps<"input">) {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={visible ? "text" : "password"}
        {...props}
        className={className}
      />
      <InputGroupAddon align={"inline-end"}>
        <Button
          variant={"link"}
          type="button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <Eye /> : <EyeClosed />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { Password };
