"use client";

import { useFlag } from "@/hooks/use-flag";
import { type FlagCode } from "@/lib/flag/flags";

export type FlagProps = React.SVGProps<SVGSVGElement> & {
  code: FlagCode;
};

export function Flag({ code, ...props }: FlagProps) {
  const FlagSvg = useFlag(code);
  return <FlagSvg {...props} />;
}
