// START
import { Phone } from "@/components/ui/phone";

export default function PhoneDemo() {
  return (
    <div className="py-4 max-w-xs w-full mx-auto">
      <Phone
        placeholder="Enter your phone number"
        searchPlaceholder="Search for your country"
        emptyPlaceholder="Couldn't find your country"
      />
    </div>
  );
}
// END

export const keywords = [
  "shadcn",
  "base ui",
  "react",
  "component",
  "phone",
  "input",
  "countries",
];
