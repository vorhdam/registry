"use client";

import { useFlag } from "@/hooks/useFlag";
import { type FlagCode } from "@/lib/flags";

export type FlagProps = React.SVGProps<SVGSVGElement> & {
  code: FlagCode;
};

export function Flag({ code, ...props }: FlagProps) {
  const FlagSvg = useFlag(code);
  return <FlagSvg {...props} />;
}
