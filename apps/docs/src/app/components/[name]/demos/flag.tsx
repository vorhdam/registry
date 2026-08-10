// START
import { Flag } from "@/components/ui/flag";

export default function FlagDemo() {
  return (
    <div className="mx-auto flex flex-row gap-4">
      <Flag code="HU" className="size-16" />
      <Flag code="GB" className="size-16" />
      <Flag code="DE" className="size-16" />
      <Flag code="NO" className="size-16" />
    </div>
  );
}
// END

export const keywords = [
  "shadcn",
  "base ui",
  "react",
  "component",
  "flag",
  "svg",
  "icon",
];
